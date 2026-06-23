<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative bg-white py-20 overflow-hidden border-b border-gray-200">
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px), linear-gradient(to bottom, #f1f1f1 1px, transparent 1px); background-size: 54px 54px; -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 0%, #000 25%, transparent 72%); mask-image: radial-gradient(ellipse 70% 70% at 50% 0%, #000 25%, transparent 72%);"></div>
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-72 rounded-full bg-primary-500/10 blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <img src="@/assets/images/logo.png" alt="MOSAIC by MAIR" class="h-10 w-auto object-contain mx-auto mb-6" />
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            About MOSAIC
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 leading-relaxed">
            The <span class="text-primary-700 font-semibold">Moroccan Open Source AI Catalog</span>,
            a curated home for open-source AI artifacts built by Moroccans, in Morocco, and for Morocco.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-12">
        <!-- What is MOSAIC? -->
        <section class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What is MOSAIC?</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            <strong>MOSAIC, the Moroccan Open Source AI Catalog</strong> is a curated,
            community-friendly catalog of open-source AI research artifacts connected to Morocco.
            It highlights libraries, datasets, models, tools, platforms, and other artifacts built by
            Moroccans, developed in Morocco, or designed for Moroccan problems and communities.
          </p>
          <p class="text-gray-600 leading-relaxed">
            MOSAIC is part of the
            <a href="https://mair.ma" target="_blank" rel="noopener noreferrer" class="text-primary-700 font-medium hover:text-primary-800">MAIR</a>
            ecosystem and aims to make Moroccan AI work easier to discover, reuse, and understand.
          </p>
        </section>

        <!-- Why it exists -->
        <section class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Why it exists</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            Moroccan AI work is often scattered across personal GitHub accounts, labs, startups,
            universities, Hugging Face pages, and research artifacts. MOSAIC helps:
          </p>
          <ul class="space-y-3">
            <li v-for="point in whyPoints" :key="point" class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-gray-600">{{ point }}</span>
            </li>
          </ul>
        </section>

        <!-- A structured catalog -->
        <section class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">A structured catalog</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            MOSAIC is not a product. It's a <strong>structured catalog</strong>. The source of truth is a
            single, validated <code class="px-1.5 py-0.5 bg-gray-100 rounded text-sm text-primary-700">catalog/mosaic.json</code>
            file, supported by a JSON schema and a shared taxonomy of types, domains, platforms, and status.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Every entry classifies a project so it's easy to discover and analyze, and powers a clean
            dataset for reporting on the Moroccan AI ecosystem.
          </p>
        </section>

        <!-- How to contribute -->
        <section class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">How to contribute</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            Anyone can add a project. The catalog grows through community contributions:
          </p>
          <div class="space-y-4">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Submit a project</h3>
                <p class="text-gray-600 text-sm">Use the submission form to propose a new entry for review.</p>
                <router-link to="/submit" class="text-primary-700 hover:text-primary-800 text-sm font-medium mt-2 inline-block">Submit a project →</router-link>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Open a pull request</h3>
                <p class="text-gray-600 text-sm">Edit <code class="px-1.5 py-0.5 bg-gray-100 rounded text-xs">catalog/mosaic.json</code> directly on GitHub.</p>
                <a href="https://github.com/mair-community/mosaic" target="_blank" rel="noopener noreferrer" class="text-primary-700 hover:text-primary-800 text-sm font-medium mt-2 inline-block">Open on GitHub →</a>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Join the community</h3>
                <p class="text-gray-600 text-sm">Discuss the catalog, propose new categories, and help with reviews on Discord.</p>
                <a href="https://discord.gg/ZtNuKJ7V2H" target="_blank" rel="noopener noreferrer" class="text-primary-700 hover:text-primary-800 text-sm font-medium mt-2 inline-block">Join Discord →</a>
              </div>
            </div>
          </div>
        </section>

        <!-- Governance note -->
        <section class="card p-8 bg-gray-50 border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-3">A note on inclusion</h2>
          <p class="text-gray-600 leading-relaxed">
            Inclusion in MOSAIC does not imply endorsement. The goal is ecosystem visibility,
            discoverability, and reuse. The catalog metadata is open, and each linked project keeps its own license.
          </p>
        </section>

        <!-- Stats -->
        <section class="relative overflow-hidden rounded-2xl shadow-xl">
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-br from-brand-orange via-brand-light-orange to-primary-500"></div>
            <div class="absolute inset-0 opacity-10">
              <div class="grid grid-cols-4 grid-rows-4 h-full w-full">
                <div v-for="i in 16" :key="i" class="border border-white"></div>
              </div>
            </div>
          </div>

          <div class="relative p-10">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-white">The catalog so far</h2>
              <p class="text-white/90 text-lg mt-2">Growing with the Moroccan AI community</p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="relative group">
                <div class="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300"></div>
                <div class="relative p-6 text-center">
                  <div class="text-4xl font-bold text-white mb-1">{{ projectStore.projects.length }}+</div>
                  <div class="text-white font-semibold">Projects</div>
                </div>
              </div>
              <div class="relative group">
                <div class="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300"></div>
                <div class="relative p-6 text-center">
                  <div class="text-4xl font-bold text-white mb-1">{{ projectStore.uniqueDomains.length }}</div>
                  <div class="text-white font-semibold">Domains</div>
                </div>
              </div>
              <div class="relative group">
                <div class="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300"></div>
                <div class="relative p-6 text-center">
                  <div class="text-4xl font-bold text-white mb-1">{{ projectStore.uniqueTypes.length }}</div>
                  <div class="text-white font-semibold">Artifact Types</div>
                </div>
              </div>
              <div class="relative group">
                <div class="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300"></div>
                <div class="relative p-6 text-center">
                  <div class="text-4xl font-bold text-white mb-1">100%</div>
                  <div class="text-white font-semibold">Open Source</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProjectStore } from '@/stores/projectStore'

const projectStore = useProjectStore()

const whyPoints = [
  'Showcase Moroccan open-source AI research.',
  'Make useful research projects easier to discover and reuse.',
  'Connect builders, researchers, students, and institutions.',
  'Highlight tools solving Moroccan and regional problems.',
  'Create a clean dataset for reporting and ecosystem analysis.',
]
</script>
