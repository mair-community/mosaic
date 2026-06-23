<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Update Notification -->
    <UpdateNotification
      v-if="showUpdateNotification"
      title="Update Available"
      :message="updateMessage"
      :show-actions="false"
      @dismiss="handleDismiss"
    />

    <!-- Hero Section -->
    <div class="relative bg-white py-20 overflow-hidden border-b border-gray-200">
      <div class="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px), linear-gradient(to bottom, #f1f1f1 1px, transparent 1px); background-size: 54px 54px; -webkit-mask-image: radial-gradient(ellipse 70% 65% at 22% 0%, #000 25%, transparent 72%); mask-image: radial-gradient(ellipse 70% 65% at 22% 0%, #000 25%, transparent 72%);"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl">
          <div class="inline-block mb-4">
            <div class="flex items-center space-x-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 border border-primary-100">
              <span class="w-2 h-2 rounded-full bg-primary-600"></span>
              <span class="text-sm font-semibold">MOSAIC Catalog</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Discover Projects
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
            Explore open-source projects, datasets, models, and tools from the Moroccan AI
            research community. Browse the work of researchers driving Morocco's excellence in AI.
          </p>
          
          <div class="flex flex-wrap gap-3 mt-8">
            <div class="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 text-gray-700">
              <span class="text-sm font-semibold">{{ projectStore.projects.length }} Projects</span>
            </div>
            <div class="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 text-gray-700">
              <span class="text-sm font-semibold">{{ projectStore.uniqueDomains.length }} Research Domains</span>
            </div>
            <div class="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 text-gray-700">
              <span class="text-sm font-semibold">{{ projectStore.uniquePlatforms.length }} Platforms</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Controls -->
      <div class="mb-8 space-y-4">
        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model.trim="searchQuery"
            type="text"
            placeholder="Search by project name, description, domain or keywords..."
            class="w-full px-4 py-3 pl-12 pr-12 text-lg h-14 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all duration-200 shadow-sm bg-white"
          />
          <svg class="absolute left-4 top-4 w-6 h-6 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-4 top-4 text-gray-400 hover:text-brand-orange transition-colors z-10"
            type="button"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Filter Toggle -->
        <div class="flex items-center justify-between">
          <button
            @click="showFilters = !showFilters"
            class="btn-secondary flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>{{ showFilters ? 'Hide Filters' : 'Show Filters' }}</span>
            <span v-if="activeFilterCount > 0" class="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
              {{ activeFilterCount }}
            </span>
          </button>

          <div class="flex items-center space-x-4">
            <button
              v-if="activeFilterCount > 0"
              @click="clearFilters"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
            <select v-model="sortBy" class="input-field w-auto">
              <option value="newest">Newest first</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="created">Recently created</option>
            </select>
          </div>
        </div>

        <!-- Filters Panel -->
        <transition name="expand">
          <div v-if="showFilters" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Domain Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                <select v-model="filters.domain" class="input-field">
                  <option value="">All Domains</option>
                  <option v-for="domain in projectStore.uniqueDomains" :key="domain" :value="domain">
                    {{ domain }}
                  </option>
                </select>
              </div>

              <!-- Type Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select v-model="filters.type" class="input-field">
                  <option value="">All Types</option>
                  <option v-for="type in projectStore.uniqueTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>

              <!-- Platform Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select v-model="filters.platform" class="input-field">
                  <option value="">All Platforms</option>
                  <option v-for="platform in projectStore.uniquePlatforms" :key="platform" :value="platform">
                    {{ platform }}
                  </option>
                </select>
              </div>



              <!-- Status Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select v-model="filters.status" class="input-field">
                  <option value="">All Statuses</option>
                  <option v-for="status in projectStore.uniqueStatuses" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
              </div>

              <!-- Language Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select v-model="filters.language" class="input-field">
                  <option value="">All Languages</option>
                  <option v-for="lang in projectStore.uniqueLanguages" :key="lang" :value="lang">
                    {{ lang }}
                  </option>
                </select>
              </div>

              <!-- License Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">License</label>
                <select v-model="filters.license" class="input-field">
                  <option value="">All Licenses</option>
                  <option v-for="license in projectStore.uniqueLicenses" :key="license" :value="license">
                    {{ license }}
                  </option>
                </select>
              </div>

              <!-- Tags Filter -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div class="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                  <button
                    v-for="tag in projectStore.allTags"
                    :key="tag"
                    @click="toggleTag(tag)"
                    class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                    :class="filters.tags.includes(tag) 
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-500' 
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'"
                  >
                    {{ tag }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Results Count -->
      <div class="mb-6 flex items-center justify-between">
        <div class="text-sm text-gray-600">
          Showing <span class="font-semibold text-gray-900">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> 
          to <span class="font-semibold text-gray-900">{{ Math.min(currentPage * itemsPerPage, filteredProjects.length) }}</span> 
          of <span class="font-semibold text-gray-900">{{ filteredProjects.length }}</span> projects
        </div>
        
        <!-- Items per page selector -->
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Show:</span>
          <select 
            v-model="itemsPerPage" 
            @change="resetPagination"
            class="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
          >
            <option :value="12">12</option>
            <option :value="18">18</option>
            <option :value="24">24</option>
            <option :value="48">48</option>
            <option :value="filteredProjects.length">All</option>
          </select>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ProjectCard
          v-for="project in paginatedProjects"
          :key="project.name"
          :project="project"
        />
      </div>
      
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2 mt-8">
        <!-- Previous Button -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <!-- Page Numbers -->
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="px-3 py-2 text-gray-500">...</span>
          <button
            v-else
            @click="goToPage(page)"
            :class="[
              'px-4 py-2 border rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
        </template>
        
        <!-- Next Button -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg class="mx-auto w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No projects match your filters yet</h3>
        <p class="text-gray-600 mb-6">Try removing some filters or submit your project to the catalog.</p>
        <router-link to="/submit" class="btn-primary inline-flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Submit Project</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import ProjectCard from '@/components/ProjectCard.vue'
import UpdateNotification from '@/components/UpdateNotification.vue'

const projectStore = useProjectStore()

const searchQuery = ref('')
const showFilters = ref(false)
const sortBy = ref('newest')
const showUpdateNotification = ref(false)
const updateMessage = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Handle dismiss - just hide notification
const handleDismiss = () => {
  showUpdateNotification.value = false
}

// Clear search
const clearSearch = () => {
  searchQuery.value = ''
}

// Debug: Check if data is loaded
onMounted(() => {
})

const filters = ref({
  domain: '',
  type: '',
  platform: '',
  unit: '',
  status: '',
  language: '',
  license: '',
  tags: []
})

const toggleTag = (tag) => {
  const index = filters.value.tags.indexOf(tag)
  if (index > -1) {
    filters.value.tags.splice(index, 1)
  } else {
    filters.value.tags.push(tag)
  }
}

const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.domain) count++
  if (filters.value.type) count++
  if (filters.value.platform) count++
  if (filters.value.unit) count++
  if (filters.value.status) count++
  if (filters.value.language) count++
  if (filters.value.license) count++
  count += filters.value.tags.length
  return count
})

const clearFilters = () => {
  filters.value = {
    domain: '',
    type: '',
    platform: '',
    unit: '',
    status: '',
    language: '',
    license: '',
    tags: []
  }
  searchQuery.value = ''
}

const filteredProjects = computed(() => {
  let results = [...projectStore.projects]

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    results = results.filter(p => 
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.domain && p.domain.toLowerCase().includes(query)) ||
      (p.type && p.type.toLowerCase().includes(query)) ||
      (p.platform && p.platform.toLowerCase().includes(query)) ||
      (p.language && p.language.toLowerCase().includes(query)) ||
      (Array.isArray(p.tags) && p.tags.some(t => t && t.toLowerCase().includes(query)))
    )
  }

  // Apply filters
  if (filters.value.domain) {
    results = results.filter(p => p.domain === filters.value.domain)
  }
  if (filters.value.type) {
    results = results.filter(p => p.type === filters.value.type)
  }
  if (filters.value.platform) {
    results = results.filter(p => p.platform === filters.value.platform)
  }
  if (filters.value.status) {
    results = results.filter(p => p.status === filters.value.status)
  }
  if (filters.value.language) {
    results = results.filter(p => p.language === filters.value.language)
  }
  if (filters.value.license) {
    results = results.filter(p => p.license === filters.value.license)
  }
  if (filters.value.tags.length > 0) {
    results = results.filter(p => 
      Array.isArray(p.tags) && filters.value.tags.some(tag => p.tags.includes(tag))
    )
  }

  // Apply sorting
  if (sortBy.value === 'alphabetical') {
    results.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'created') {
    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else {
    // newest first (by added order, reversed)
    results.reverse()
  }

  return results
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage.value))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProjects.value.slice(start, end)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Reset to page 1 when filters change
const resetPagination = () => {
  currentPage.value = 1
}

// Watch for filter changes and reset pagination
watch([searchQuery, filters], () => {
  resetPagination()
}, { deep: true })
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 600px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
