<template>
  <div v-if="show" class="fixed top-4 right-4 z-50 max-w-md">
    <div class="bg-white rounded-lg shadow-lg border-l-4 border-brand-orange p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <h3 class="text-sm font-medium text-gray-900">
            {{ title }}
          </h3>
          <div class="mt-2 text-sm text-gray-600">
            <p>{{ message }}</p>
          </div>
          <div v-if="showActions" class="mt-3 flex space-x-3">
            <button
              @click="$emit('refresh')"
              :disabled="isLoading"
              class="text-sm font-medium text-brand-orange hover:text-brand-light-orange disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <svg v-if="isLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Updating...' : 'Refresh Now' }}</span>
            </button>
            <button
              v-if="!isLoading"
              @click="dismiss"
              class="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button @click="dismiss" class="flex-shrink-0 ml-3">
          <svg class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Update Available'
  },
  message: {
    type: String,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['refresh', 'dismiss'])

const show = ref(true)

const dismiss = () => {
  show.value = false
}
</script>
