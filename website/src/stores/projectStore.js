import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import mosaicCatalog from '@catalog/mosaic.json'
import domainsTaxonomy from '@taxonomy/domains.json'
import typesTaxonomy from '@taxonomy/types.json'
import platformsTaxonomy from '@taxonomy/platform.json'
import statusesTaxonomy from '@taxonomy/status.json'
import { buildMaps, transformCatalog } from '@/services/mosaicTransform'
import { checkForUpdates, getRankingByStars } from '@/services/api'

// Build the catalog directly from catalog/mosaic.json (the source of truth in
// this repo). Editing that file updates the site on the next build.
const taxonomyMaps = buildMaps({
  domains: domainsTaxonomy,
  types: typesTaxonomy,
  platforms: platformsTaxonomy,
  statuses: statusesTaxonomy,
})

export const useProjectStore = defineStore('project', () => {
  const projects = ref(transformCatalog(mosaicCatalog, taxonomyMaps))
  const upvotes = ref({})
  const userVotes = ref(new Set())
  const githubStars = ref({})
  const lastUpdateCheck = ref(null)
  const updateAvailable = ref(false)

  // Load upvotes from localStorage
  const loadUpvotes = () => {
    const stored = localStorage.getItem('upvotes')
    if (stored) {
      upvotes.value = JSON.parse(stored)
    }
    const storedVotes = localStorage.getItem('userVotes')
    if (storedVotes) {
      userVotes.value = new Set(JSON.parse(storedVotes))
    }
  }

  // Save upvotes to localStorage
  const saveUpvotes = () => {
    localStorage.setItem('upvotes', JSON.stringify(upvotes.value))
    localStorage.setItem('userVotes', JSON.stringify([...userVotes.value]))
  }

  // Upvote a project
  const upvoteProject = (projectName) => {
    if (!userVotes.value.has(projectName)) {
      upvotes.value[projectName] = (upvotes.value[projectName] || 0) + 1
      userVotes.value.add(projectName)
      saveUpvotes()
      return true
    }
    return false
  }

  // Get upvote count for a project
  const getUpvotes = (projectName) => {
    return upvotes.value[projectName] || 0
  }

  // Check if user has voted for a project
  const hasVoted = (projectName) => {
    return userVotes.value.has(projectName)
  }

  // Get ranked projects by upvotes
  const rankedByUpvotes = computed(() => {
    return projects.value
      .map(p => ({
        ...p,
        upvoteCount: getUpvotes(p.name)
      }))
      .sort((a, b) => b.upvoteCount - a.upvoteCount)
  })

  // Get all unique values for filters
  const uniqueDomains = computed(() => [...new Set(projects.value.map(p => p.domain))].sort())
  const uniqueTypes = computed(() => [...new Set(projects.value.map(p => p.type))].sort())
  const uniquePlatforms = computed(() => [...new Set(projects.value.map(p => p.platform))].sort())
  const uniqueStatuses = computed(() => [...new Set(projects.value.map(p => p.status))].sort())
  const uniqueLanguages = computed(() => [...new Set(projects.value.map(p => p.language).filter(Boolean))].sort())
  const uniqueLicenses = computed(() => [...new Set(projects.value.map(p => p.license).filter(Boolean))].sort())
  const allTags = computed(() => {
    const tags = new Set()
    projects.value.forEach(p => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => tags.add(t))
      }
    })
    return [...tags].sort()
  })

  // Check for updates from GitHub
  const checkUpdates = async () => {
    try {
      const result = await checkForUpdates()
      if (result.success) {
        lastUpdateCheck.value = new Date().toISOString()
        
        // Compare with local data
        const localCount = projects.value.length
        const remoteCount = result.data.length
        const localSha = localStorage.getItem('software-json-sha')
        
        updateAvailable.value = localSha !== result.metadata.sha || localCount !== remoteCount
        
        return {
          updateAvailable: updateAvailable.value,
          remoteData: result.data,
          metadata: result.metadata,
        }
      }
    } catch (error) {
      console.error('Error checking updates:', error)
      return { error: error.message }
    }
  }

  // Update projects with remote data
  const updateProjects = async () => {
    try {
      const result = await checkForUpdates()
      if (result.success) {
        // Update the projects array with remote data
        projects.value = result.data
        
        // Store the SHA to track current version
        localStorage.setItem('software-json-sha', result.metadata.sha)
        
        // Reset update flag
        updateAvailable.value = false
        lastUpdateCheck.value = new Date().toISOString()
        
        return {
          success: true,
          projectCount: result.data.length,
        }
      }
      return { success: false, error: 'Failed to fetch updates' }
    } catch (error) {
      console.error('Error updating projects:', error)
      return { success: false, error: error.message }
    }
  }

  // Fetch GitHub star rankings
  const fetchStarRankings = async () => {
    try {
      const result = await getRankingByStars()
      if (result.success) {
        // Store star counts
        result.data.forEach(project => {
          if (project.stars !== undefined) {
            githubStars.value[project.name] = project.stars
          }
        })
        
        return result
      }
    } catch (error) {
      console.error('Error fetching star rankings:', error)
      return { error: error.message }
    }
  }

  // Get star count for a project
  const getStarCount = (projectName) => {
    return githubStars.value[projectName] || 0
  }

  // Get projects ranked by GitHub stars
  const rankedByStars = computed(() => {
    return projects.value
      .filter(p => p.platform === 'github')
      .map(p => ({
        ...p,
        stars: getStarCount(p.name)
      }))
      .sort((a, b) => b.stars - a.stars)
  })

  // Initialize
  loadUpvotes()

  return {
    projects,
    upvotes,
    githubStars,
    lastUpdateCheck,
    updateAvailable,
    upvoteProject,
    getUpvotes,
    hasVoted,
    rankedByUpvotes,
    uniqueDomains,
    uniqueTypes,
    uniquePlatforms,
    uniqueStatuses,
    uniqueLanguages,
    uniqueLicenses,
    allTags,
    checkUpdates,
    updateProjects,
    fetchStarRankings,
    getStarCount,
    rankedByStars
  }
})
