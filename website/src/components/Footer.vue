<template>
  <footer class="bg-brand-charcoal text-gray-300 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <img
              src="@/assets/images/logo.png"
              alt="MOSAIC by MAIR"
              class="h-7 w-auto object-contain bg-white rounded-lg p-1.5"
            />
            <div>
              <div class="text-lg font-bold text-white leading-none">MOSAIC</div>
              <div class="text-xs text-gray-400 mt-0.5">Moroccan Open Source AI Catalog</div>
            </div>
          </div>
          <p class="text-sm text-gray-400">
            A curated catalog of open-source AI research artifacts built by Moroccans, in Morocco,
            and for Morocco. Part of the
            <a href="https://mair.ma" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300">MAIR</a>
            ecosystem.
          </p>
        </div>

        <!-- Connect Section -->
        <div class="space-y-4">
          <h3 class="text-white font-semibold text-sm uppercase tracking-wider">Connect</h3>
          <ul class="space-y-2">
            <li>
              <a href="https://github.com/mair-community/mosaic" target="_blank" rel="noopener noreferrer"
                 class="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2">
                <span>MOSAIC on GitHub</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://discord.gg/ZtNuKJ7V2H" target="_blank" rel="noopener noreferrer"
                 class="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2">
                <span>Join our Discord</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://mair.ma" target="_blank" rel="noopener noreferrer"
                 class="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2">
                <span>mair.ma</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <!-- Navigation Section -->
        <div class="space-y-4">
          <h3 class="text-white font-semibold text-sm uppercase tracking-wider">Navigate</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-sm hover:text-primary-400 transition-colors duration-200">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/projects" class="text-sm hover:text-primary-400 transition-colors duration-200">
                Browse the Catalog
              </router-link>
            </li>
            <li>
              <router-link to="/ranking" class="text-sm hover:text-primary-400 transition-colors duration-200">
                Rankings
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-sm hover:text-primary-400 transition-colors duration-200">
                About
              </router-link>
            </li>
            <li>
              <router-link to="/contribute" class="text-sm hover:text-primary-400 transition-colors duration-200">
                Contribute
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-8 border-t border-gray-800 space-y-3">
        <p class="text-xs text-gray-500 text-center max-w-3xl mx-auto">
          Inclusion in MOSAIC does not imply endorsement. The goal is ecosystem visibility,
          discoverability, and reuse. Each linked project keeps its own license.
        </p>
        <p class="text-sm text-gray-400 text-center">
          MOSAIC, part of MAIR · © 2024–{{ currentYear }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
