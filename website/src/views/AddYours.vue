<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative bg-white border-b border-gray-200 overflow-hidden py-16">
      <div class="absolute -top-16 -right-12 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Submit Your Project</h1>
        <p class="text-xl text-gray-600 max-w-3xl">
          Have you built an open-source library, dataset, model, or tool in AI?
          Add it to the MOSAIC catalog. Submissions are reviewed before publication.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Success Message -->
      <transition name="fade">
        <div v-if="submitted" class="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-start space-x-3">
            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="text-lg font-semibold text-green-900 mb-2">Submission Received!</h3>
              <p class="text-green-800 mb-4">
                Thank you for your submission! Your project will be reviewed by the MAIR community team.
                If approved, it will appear in the MOSAIC catalog and public JSON index.
              </p>
              <button @click="resetForm" class="btn-primary">
                Submit Another Project
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Form -->
      <div v-if="!submitted" class="card p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Project Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Project Name <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input-field"
              placeholder="e.g., sympde"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Short Description <span class="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="3"
              class="input-field"
              placeholder="1-2 line summary of your project"
            ></textarea>
          </div>

          <!-- Main URL -->
          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
              Main URL <span class="text-red-500">*</span>
            </label>
            <input
              id="url"
              v-model="form.url"
              type="url"
              required
              class="input-field"
              placeholder="e.g., https://github.com/username/project"
            />
          </div>

          <!-- Platform -->
          <div>
            <label for="platform" class="block text-sm font-medium text-gray-700 mb-2">
              Platform <span class="text-red-500">*</span>
            </label>
            <select id="platform" v-model="form.platform" required class="input-field">
              <option value="">Select a platform...</option>
              <option value="github">GitHub</option>
              <option value="gitlab">GitLab</option>
              <option value="bitbucket">Bitbucket</option>
              <option value="zenodo">Zenodo</option>
              <option value="pypi">PyPI</option>
              <option value="conda-forge">Conda-Forge</option>
              <option value="dockerhub">Docker Hub</option>
              <option value="huggingface">Hugging Face</option>
              <option value="website">Website</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Type -->
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
              Type <span class="text-red-500">*</span>
            </label>
            <select id="type" v-model="form.type" required class="input-field">
              <option value="">Select a type...</option>
              <option value="library">Library</option>
              <option value="tool">Tool</option>
              <option value="dataset">Dataset</option>
              <option value="model">Model</option>
              <option value="web-app">Web App</option>
              <option value="api">API</option>
              <option value="service">Service</option>
              <option value="workflow">Workflow</option>
              <option value="benchmark">Benchmark</option>
              <option value="documentation">Documentation</option>
            </select>
          </div>

          <!-- Domain -->
          <div>
            <label for="domain" class="block text-sm font-medium text-gray-700 mb-2">
              Domain <span class="text-red-500">*</span>
            </label>
            <select id="domain" v-model="form.domain" required class="input-field">
              <option value="">Select a domain...</option>
              <option v-for="domain in domains" :key="domain" :value="domain">
                {{ domain }}
              </option>
            </select>
          </div>

          <!-- Tags -->
          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              id="tags"
              v-model="form.tagsInput"
              type="text"
              class="input-field"
              placeholder="e.g., pde, finite-elements, symbolic-math (comma-separated)"
            />
            <p class="mt-1 text-sm text-gray-500">Separate tags with commas</p>
          </div>

          <!-- Owner -->
          <div>
            <label for="owner" class="block text-sm font-medium text-gray-700 mb-2">
              Owner / Maintainer <span class="text-red-500">*</span>
            </label>
            <input
              id="owner"
              v-model="form.owner"
              type="text"
              required
              class="input-field"
              placeholder="e.g., Your Name or Organization"
            />
          </div>

          <!-- Affiliation / Institution -->
          <div>
            <label for="unit" class="block text-sm font-medium text-gray-700 mb-2">
              Affiliation / Institution <span class="text-red-500">*</span>
            </label>
            <input
              id="unit"
              v-model="form.unit"
              type="text"
              required
              class="input-field"
              placeholder="e.g., University, Research Lab, or Company"
            />
            <p class="mt-1 text-sm text-gray-500">Separate multiple units with commas</p>
          </div>

          <!-- Language -->
          <div>
            <label for="language" class="block text-sm font-medium text-gray-700 mb-2">
              Main Language <span class="text-red-500">*</span>
            </label>
            <input
              id="language"
              v-model="form.language"
              type="text"
              required
              class="input-field"
              placeholder="e.g., Python, R, Rust, TypeScript"
            />
          </div>

          <!-- License -->
          <div>
            <label for="license" class="block text-sm font-medium text-gray-700 mb-2">
              License <span class="text-red-500">*</span>
            </label>
            <input
              id="license"
              v-model="form.license"
              type="text"
              required
              class="input-field"
              placeholder="e.g., MIT, Apache-2.0, GPL-3.0-only"
            />
          </div>

          <!-- DOI -->
          <div>
            <label for="doi" class="block text-sm font-medium text-gray-700 mb-2">
              DOI (optional)
            </label>
            <input
              id="doi"
              v-model="form.doi"
              type="text"
              class="input-field"
              placeholder="e.g., 10.5281/zenodo.1234567"
            />
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
              Status <span class="text-red-500">*</span>
            </label>
            <select id="status" v-model="form.status" required class="input-field">
              <option value="">Select status...</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="archived">Archived</option>
              <option value="experimental">Experimental</option>
            </select>
          </div>

          <!-- Creation Date -->
          <div>
            <label for="created_at" class="block text-sm font-medium text-gray-700 mb-2">
              Creation Date <span class="text-red-500">*</span>
            </label>
            <input
              id="created_at"
              v-model="form.created_at"
              type="date"
              required
              class="input-field"
            />
          </div>

          <!-- Contact Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Contact Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="you@example.com"
            />
            <p class="mt-1 text-sm text-gray-500">Not stored publicly, only for communication about your submission</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button type="submit" class="btn-primary w-full py-3 text-lg">
              Submit Project
            </button>
          </div>
        </form>
      </div>

      <!-- Alternative Path -->
      <div class="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-900 mb-2">Prefer GitHub?</h3>
        <p class="text-blue-800 mb-4">
          You can also contribute directly by editing <code class="px-2 py-1 bg-blue-100 rounded text-sm">catalog/mosaic.json</code> and opening a Pull Request.
        </p>
        <a
          href="https://github.com/mair-community/mosaic"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium"
        >
          <span>View GitHub Repository</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const submitted = ref(false)

const domains = [
  'Agriculture & Food Systems',
  'AI & Data Science',
  'Remote Sensing & Geospatial',
  'Health & Biomedical Sciences',
  'Bioinformatics & Life Sciences',
  'Materials Science & Energy',
  'Climate & Environment',
  'Transportation & Logistics',
  'HPC & Systems',
  'Computational Science, Modeling & Simulation',
  'Education & Teaching',
  'Other'
]

const form = ref({
  name: '',
  description: '',
  url: '',
  platform: '',
  type: '',
  domain: '',
  tagsInput: '',
  owner: '',
  unit: '',
  language: '',
  license: '',
  doi: '',
  status: '',
  created_at: '',
  email: ''
})

const handleSubmit = () => {
  // Process tags
  const tags = form.value.tagsInput
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)

  // Process units
  const units = form.value.unit
    .split(',')
    .map(u => u.trim())
    .filter(u => u.length > 0)

  // Create project object
  const project = {
    name: form.value.name,
    description: form.value.description,
    url: form.value.url,
    platform: form.value.platform,
    type: form.value.type,
    domain: form.value.domain,
    tags: tags,
    owner: form.value.owner,
    unit: units.length === 1 ? units[0] : units,
    language: form.value.language,
    license: form.value.license,
    doi: form.value.doi || null,
    status: form.value.status,
    created_at: form.value.created_at
  }

  // Log to console (in production, this would send to backend)
  console.log('Project Submission:', project)
  console.log('Contact Email:', form.value.email)

  // Show success message
  submitted.value = true

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    url: '',
    platform: '',
    type: '',
    domain: '',
    tagsInput: '',
    owner: '',
    unit: '',
    language: '',
    license: '',
    doi: '',
    status: '',
    created_at: '',
    email: ''
  }
  submitted.value = false
}
</script>
