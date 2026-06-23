<template>
  <div class="card p-6 h-full flex flex-col fade-in">
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <a
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-2 group"
      >
        <span>{{ project.name }}</span>
        <svg class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      <PlatformIcon :platform="project.platform" />
    </div>

    <!-- Description -->
    <p class="text-gray-600 text-sm mb-4 flex-grow">
      {{ project.description }}
    </p>

    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span class="badge bg-orange-100 text-brand-orange font-semibold">
        {{ project.type }}
      </span>
      <span class="badge" :class="domainColor(project.domain)">
        {{ project.domain }}
      </span>
      <span v-if="project.language" class="badge bg-gray-100 text-brand-charcoal">
        {{ project.language }}
      </span>
      <span class="badge" :class="statusColor(project.status)">
        {{ project.status }}
      </span>
    </div>

    <!-- Tags -->
    <div v-if="project.tags && project.tags.length > 0" class="flex flex-wrap gap-1.5 mb-4">
      <span
        v-for="tag in project.tags.slice(0, 4)"
        :key="tag"
        class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
      >
        #{{ tag }}
      </span>
      <span v-if="project.tags.length > 4" class="px-2 py-0.5 text-gray-500 text-xs">
        +{{ project.tags.length - 4 }} more
      </span>
    </div>

    <!-- Footer -->
    <div class="pt-4 border-t border-gray-200 text-sm text-gray-600 space-y-1">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>{{ project.license || 'Not specified' }}</span>
      </div>
      <div v-if="project.doi" class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <a :href="`https://doi.org/${project.doi}`" target="_blank" rel="noopener noreferrer" 
           class="text-primary-600 hover:text-primary-700 truncate">
          DOI: {{ project.doi }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import PlatformIcon from './PlatformIcon.vue'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const statusColor = (status) => {
  const colors = {
    active: 'bg-brand-science-green text-white font-semibold',
    maintenance: 'bg-brand-business-light text-brand-charcoal font-semibold',
    archived: 'bg-gray-200 text-brand-charcoal',
    experimental: 'bg-brand-business-purple text-white font-semibold'
  }
  return colors[status] || 'bg-gray-100 text-brand-charcoal'
}

const domainColor = (domain) => {
  // Map domains to category accent colors
  const domainLower = domain?.toLowerCase() || ''
  
  if (domainLower.includes('ai') || domainLower.includes('data science') || 
      domainLower.includes('computational') || domainLower.includes('hpc')) {
    return 'badge-science' // Science & Technology - Blue
  }
  if (domainLower.includes('health') || domainLower.includes('bioinformatics') || 
      domainLower.includes('life sciences')) {
    return 'badge-health' // Health - Green
  }
  if (domainLower.includes('agriculture') || domainLower.includes('food') ||
      domainLower.includes('management') || domainLower.includes('business')) {
    return 'badge-business' // Business & Management - Yellow
  }
  if (domainLower.includes('humanities') || domainLower.includes('social') || 
      domainLower.includes('economics')) {
    return 'badge-humanities' // Humanities - Purple
  }
  
  // Default: Use primary orange for other domains
  return 'bg-brand-light-orange text-white font-semibold'
}

const formatUnit = (unit) => {
  if (Array.isArray(unit)) {
    return unit.join(', ')
  }
  return unit || 'Unknown'
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
