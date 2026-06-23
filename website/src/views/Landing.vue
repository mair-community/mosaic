<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative bg-white py-24 overflow-hidden border-b border-gray-200">
      <!-- subtle grid texture + soft red glow -->
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px), linear-gradient(to bottom, #f1f1f1 1px, transparent 1px); background-size: 54px 54px; -webkit-mask-image: radial-gradient(ellipse 75% 65% at 25% 0%, #000 30%, transparent 72%); mask-image: radial-gradient(ellipse 75% 65% at 25% 0%, #000 30%, transparent 72%);"></div>
      <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div class="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-primary-700/5 blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl">
          <a href="https://mair.ma" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 mb-6 border border-primary-100 hover:bg-primary-100 transition-colors">
            <span class="w-2 h-2 rounded-full bg-primary-600"></span>
            <span class="text-sm font-semibold">Part of the MAIR ecosystem</span>
          </a>
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Open-source <span class="text-primary-700">AI</span>, built by Moroccans
          </h1>
          <p class="text-lg md:text-2xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            MOSAIC is a curated catalog of open-source AI research artifacts, including libraries,
            datasets, models, tools, and platforms, built by Moroccans, in Morocco, and for Morocco.
          </p>

          <div class="flex flex-wrap gap-4">
            <router-link to="/projects" class="px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg shadow-sm hover:bg-primary-800 transition-colors duration-200 inline-flex items-center space-x-2">
              <span>Browse the catalog</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <a href="https://github.com/mair-community/mosaic" target="_blank" rel="noopener noreferrer"
               class="px-6 py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              <span>Contribute on GitHub</span>
            </a>
          </div>

          <div class="flex flex-wrap gap-3 mt-10">
            <div class="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 text-gray-700">
              <span class="text-sm font-semibold">{{ projectStore.projects.length }}+ Projects</span>
            </div>
            <div class="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 text-gray-700">
              <span class="text-sm font-semibold">{{ projectStore.uniqueDomains.length }} Domains</span>
            </div>
            <div class="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 text-gray-700">
              <span class="text-sm font-semibold">{{ projectStore.uniqueTypes.length }} Artifact Types</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why MOSAIC -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-3xl mb-12">
        <p class="text-primary-700 font-semibold uppercase tracking-wider text-sm mb-3">Why MOSAIC</p>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-5">Moroccan AI work, in one place</h2>
        <p class="text-lg text-gray-600 leading-relaxed">
          Moroccan AI work is often scattered across personal GitHub accounts, labs, startups,
          universities, and Hugging Face pages. MOSAIC brings it together into a clean, curated catalog.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="point in whyPoints" :key="point.title"
             class="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow duration-200">
          <div class="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
            <span v-html="point.icon"></span>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">{{ point.title }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed">{{ point.description }}</p>
        </div>
      </div>
    </section>

    <!-- What's in the catalog -->
    <section class="bg-white border-y border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's in the catalog</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Every entry is a real, open-source artifact connected to Morocco, classified by type,
            domain, and platform for easy discovery.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div v-for="kind in catalogKinds" :key="kind.label"
               class="rounded-xl border border-gray-200 p-5 text-center hover:border-primary-300 hover:shadow-sm transition-all duration-200">
            <div class="w-11 h-11 mx-auto rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center mb-3">
              <span v-html="kind.icon"></span>
            </div>
            <div class="font-semibold text-gray-900 text-sm">{{ kind.label }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ kind.blurb }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured projects -->
    <section v-if="featured.length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">From the catalog</h2>
          <p class="text-lg text-gray-600">A few projects from the Moroccan open-source AI ecosystem.</p>
        </div>
        <router-link to="/projects" class="hidden sm:inline-flex items-center space-x-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors">
          <span>Browse all</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard v-for="project in featured" :key="project.name" :project="project" />
      </div>
    </section>

    <!-- MOSAIC FAQ -->
    <section class="bg-white border-t border-gray-200">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About the catalog</h2>
          <p class="text-lg text-gray-600">How MOSAIC works.</p>
        </div>
        <div class="space-y-4">
          <details v-for="(item, i) in faqs" :key="i" class="group rounded-xl border border-gray-200 bg-gray-50 p-5 open:[&_svg]:rotate-180">
            <summary class="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
              <span>{{ item.q }}</span>
              <svg class="w-5 h-5 text-primary-700 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="text-gray-600 leading-relaxed mt-4">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Contribute CTA -->
    <section class="relative overflow-hidden bg-brand-charcoal text-white">
      <div class="absolute inset-0 bg-gradient-to-br from-[#262a31] via-[#1a1d23] to-[#0f1115]"></div>
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-600/50 to-transparent"></div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Built something? Add it to MOSAIC</h2>
        <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Help make Moroccan open-source AI easier to discover and reuse. Submit your project or open a pull request on GitHub.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <router-link to="/submit" class="px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg shadow-sm hover:bg-primary-600 transition-colors duration-200">
            Submit a project
          </router-link>
          <a href="https://github.com/mair-community/mosaic" target="_blank" rel="noopener noreferrer"
             class="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/15 transition-colors duration-200">
            Contribute on GitHub
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import ProjectCard from '@/components/ProjectCard.vue'

const projectStore = useProjectStore()

const featured = computed(() => projectStore.projects.slice(0, 3))

const whyPoints = [
  {
    title: 'Showcase Moroccan AI',
    description: 'Surface open-source AI research and tools built by Moroccans, in Morocco, and for Morocco.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
  },
  {
    title: 'Discover & reuse',
    description: 'Make useful research projects easier to find, understand, and build on, instead of scattered across the web.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>',
  },
  {
    title: 'Connect the ecosystem',
    description: 'Link builders, researchers, students, and institutions working on AI across Morocco and the diaspora.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
  },
  {
    title: 'Solve local problems',
    description: 'Highlight tools tackling Moroccan and regional challenges, from Darija NLP to climate and genomics.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
  },
  {
    title: 'A clean dataset',
    description: 'Maintain structured, validated metadata that powers reporting and analysis of the AI ecosystem.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>',
  },
  {
    title: 'Open & community-driven',
    description: 'Anyone can contribute. Inclusion is about visibility and reuse. Every project keeps its own license.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>',
  },
]

const catalogKinds = [
  {
    label: 'Libraries & Frameworks',
    blurb: 'Reusable packages and SDKs',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
  },
  {
    label: 'Datasets',
    blurb: 'Corpora and benchmarks',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>',
  },
  {
    label: 'Models',
    blurb: 'Open weights & checkpoints',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>',
  },
  {
    label: 'Tools & Toolkits',
    blurb: 'Utilities and pipelines',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
  },
  {
    label: 'Services & Apps',
    blurb: 'Web apps and APIs',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>',
  },
]

const faqs = [
  {
    q: 'What is MOSAIC?',
    a: 'MOSAIC (Moroccan Open Source AI Catalog) is a curated, community-friendly catalog of open-source AI research artifacts connected to Morocco, including libraries, datasets, models, tools, and platforms. It is part of the MAIR ecosystem.',
  },
  {
    q: 'What qualifies for the catalog?',
    a: 'Open-source AI artifacts built by Moroccans, developed in Morocco, or designed for Moroccan problems and communities. Each entry must be open-source and link to a public artifact (GitHub, Hugging Face, Zenodo, and more).',
  },
  {
    q: 'How do I add my project?',
    a: 'Use the "Submit project" form, or open a pull request on GitHub editing catalog/mosaic.json. Every submission is reviewed before publication.',
  },
  {
    q: 'Does inclusion imply endorsement?',
    a: 'No. Inclusion in MOSAIC does not imply endorsement. The goal is ecosystem visibility, discoverability, and reuse. Each linked project keeps its own license.',
  },
]
</script>
