<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative bg-white py-20 overflow-hidden border-b border-gray-200">
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-72 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px), linear-gradient(to bottom, #f1f1f1 1px, transparent 1px); background-size: 54px 54px; -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 0%, #000 25%, transparent 72%); mask-image: radial-gradient(ellipse 70% 70% at 50% 0%, #000 25%, transparent 72%);"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <div class="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 mb-6 border border-primary-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-semibold">GitHub Stars Leaderboard</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Project Rankings</h1>
          <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The most starred open-source projects from the Moroccan AI research community. Rankings updated hourly from GitHub.
          </p>
          
          <div class="flex items-center justify-center space-x-6 mt-8">
            <div class="bg-gray-50 rounded-lg px-6 py-3 border border-gray-200">
              <div class="text-3xl font-bold text-primary-700">{{ githubRanked.length }}</div>
              <div class="text-sm text-gray-500">GitHub Projects</div>
            </div>
            <div class="bg-gray-50 rounded-lg px-6 py-3 border border-gray-200">
              <div class="text-3xl font-bold text-primary-700">{{ totalStars }}</div>
              <div class="text-sm text-gray-500">Total Stars</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- GitHub Stars Ranking -->
      <section>
        <!-- GitHub Rankings Grid -->
        <div v-if="githubRanked.length > 0" class="space-y-4">
          <div
            v-for="(project, index) in githubRanked"
            :key="project.name"
            class="group relative fade-in"
            :style="{ animationDelay: `${index * 0.03}s` }"
          >
            <!-- Premium glow for top 3 -->
            <div 
              v-if="index < 3"
              class="absolute -inset-0.5 rounded-2xl opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-50"
              :class="{
                'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500': index === 0,
                'bg-gradient-to-r from-gray-400 via-slate-400 to-gray-500': index === 1,
                'bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500': index === 2
              }"
            ></div>
            
            <!-- Main card -->
            <div 
              class="relative bg-white rounded-2xl transition-all duration-300 overflow-hidden"
              :class="{
                'border-2 border-yellow-300 shadow-lg group-hover:shadow-2xl': index === 0,
                'border-2 border-gray-300 shadow-lg group-hover:shadow-2xl': index === 1,
                'border-2 border-orange-300 shadow-lg group-hover:shadow-2xl': index === 2,
                'border border-gray-200 shadow-sm group-hover:shadow-lg group-hover:border-gray-300': index >= 3
              }"
            >
              <!-- Rank ribbon -->
              <div class="absolute top-0 left-0 z-10">
                <div 
                  class="relative pl-4 pr-6 py-2 font-bold text-lg rounded-br-2xl shadow-md"
                  :class="{
                    'bg-gradient-to-r from-yellow-500 to-amber-500 text-white': index === 0,
                    'bg-gradient-to-r from-gray-500 to-slate-500 text-white': index === 1,
                    'bg-gradient-to-r from-orange-500 to-amber-600 text-white': index === 2,
                    'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700': index >= 3
                  }"
                >
                  <span class="flex items-center space-x-1">
                    <span v-if="index === 0">🏆</span>
                    <span v-else-if="index === 1">🥈</span>
                    <span v-else-if="index === 2">🥉</span>
                    <span>#{{ index + 1 }}</span>
                  </span>
                </div>
              </div>

              <!-- Card content -->
              <div class="p-6 pt-14">
                <div class="flex items-start gap-6">
                  <!-- Platform Icon -->
                  <div class="flex-shrink-0 mt-1">
                    <div class="w-12 h-12 flex items-center justify-center">
                      <PlatformIcon :platform="project.platform" />
                    </div>
                  </div>

                  <!-- Project Details -->
                  <div class="flex-grow min-w-0">
                    <!-- Project Name -->
                    <a
                      :href="project.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center space-x-2 mb-3 group/link"
                    >
                      <h3 class="text-2xl font-bold text-gray-900 group-hover/link:text-primary-600 transition-colors">
                        {{ project.name }}
                      </h3>
                      <svg class="w-5 h-5 text-gray-400 group-hover/link:text-primary-600 transition-all transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    <!-- Description -->
                    <p class="text-gray-600 text-base leading-relaxed mb-4 line-clamp-2">
                      {{ project.description }}
                    </p>

                    <!-- Bottom Row: Domain + Stats -->
                    <div class="flex items-center justify-between flex-wrap gap-4">
                      <!-- Domain Badge -->
                      <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                          {{ project.domain }}
                        </span>
                      </div>

                      <!-- Stats -->
                      <div class="flex items-center gap-4">
                        <!-- Stars -->
                        <div class="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
                          <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <div class="flex flex-col">
                            <span class="text-xl font-bold text-gray-900 leading-none">{{ formatNumber(project.stars) }}</span>
                            <span class="text-xs text-gray-600">stars</span>
                          </div>
                        </div>

                        <!-- Forks -->
                        <div v-if="project.forks" class="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                          <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          <div class="flex flex-col">
                            <span class="text-xl font-bold text-gray-900 leading-none">{{ formatNumber(project.forks) }}</span>
                            <span class="text-xs text-gray-600">forks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <svg class="mx-auto w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Star Data Available</h3>
          <p class="text-gray-600">Star rankings will be updated hourly from GitHub.</p>
        </div>

        <!-- Info Banner -->
        <div class="mt-8 grid md:grid-cols-2 gap-4">
          <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">How Rankings Work</h3>
                <p class="text-sm text-gray-700">
                  Projects are ranked by their GitHub star count. Data is automatically updated every hour.
                </p>
              </div>
            </div>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Important Note</h3>
                <p class="text-sm text-gray-700">
                  Star count reflects popularity, not scientific impact. Many specialized research tools serve niche audiences and have fewer stars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import PlatformIcon from '@/components/PlatformIcon.vue'
import starsRankingData from '@/data/stars-ranking.json'

const projectStore = useProjectStore()
const loadingGithubData = ref(false)
const starsRanking = ref(starsRankingData || [])

const githubRanked = computed(() => {
  return starsRanking.value.slice(0, 20)
})

const totalStars = computed(() => {
  return starsRanking.value.reduce((sum, p) => sum + (p.stars || 0), 0).toLocaleString()
})

const lastUpdated = computed(() => {
  if (starsRanking.value.length > 0 && starsRanking.value[0].lastUpdated) {
    const date = new Date(starsRanking.value[0].lastUpdated)
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
    if (diffHours < 1) return 'Just now'
    if (diffHours === 1) return '1h ago'
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }
  return 'N/A'
})

const formatUnit = (unit) => {
  if (Array.isArray(unit)) {
    return unit.join(', ')
  }
  return unit || 'Unknown'
}

const formatNumber = (num) => {
  if (!num) return '0'
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

onMounted(() => {
  // Stars ranking data is loaded from local JSON file
  // Updated hourly by Netlify scheduled function
  loadingGithubData.value = false
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
