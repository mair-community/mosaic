<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative bg-white border-b border-gray-200 overflow-hidden py-16">
      <div class="absolute -top-16 -right-12 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">How to Contribute</h1>
        <p class="text-xl text-gray-600 max-w-3xl">
          Contributions are welcome from researchers, students, engineers, and partners.
          Learn how you can help grow the MAIR community and its open project network.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-12">
        <!-- Ways to Contribute -->
        <section class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Ways to Contribute</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-brand-orange text-white rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-brand-charcoal mb-1">Submit a new project</h3>
                <p class="text-gray-600 text-sm">Share your open-source work with the community</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-brand-science-green text-white rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-brand-charcoal mb-1">Update metadata</h3>
                <p class="text-gray-600 text-sm">Help keep project information accurate and current</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-brand-humanities-dark text-white rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-brand-charcoal mb-1">Propose new domains or tags</h3>
                <p class="text-gray-600 text-sm">Expand categorization options for better discovery</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-brand-business-purple text-white rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-brand-charcoal mb-1">Report issues</h3>
                <p class="text-gray-600 text-sm">Help identify bugs or inaccuracies in the catalog</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-brand-light-orange text-white rounded-lg flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-brand-charcoal mb-1">Expand catalog features</h3>
                <p class="text-gray-600 text-sm">Contribute code to improve the website or tools</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contribute through Website -->
        <section class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Contribute through the Website</h2>
          <p class="text-gray-600 mb-6">
            Use our web form to submit new projects or updates. The review team checks for:
          </p>
          <ul class="space-y-2 mb-6">
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Open-source license</span>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Relevance to Moroccan AI research</span>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Metadata consistency</span>
            </li>
          </ul>
          <router-link to="/submit" class="btn-primary">
            Submit a Project
          </router-link>
        </section>

        <!-- Contribute through GitHub -->
        <!-- White text on dark background -->
        <section class="card p-8 bg-brand-charcoal text-white">
          <h2 class="text-2xl font-bold mb-4">Contribute through GitHub</h2>
          <p class="text-gray-300 mb-6">
            For power users and developers, you can contribute directly via GitHub:
          </p>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-start space-x-3">
              <!-- Numbers on MAIR red -->
              <div class="flex-shrink-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                1
              </div>
              <div>
                <h4 class="font-semibold mb-1">Visit the repository</h4>
                <p class="text-gray-400 text-sm">
                  <a href="https://github.com/mair-community/mosaic"
                     target="_blank" rel="noopener noreferrer"
                     class="text-primary-400 hover:text-primary-300 underline">
                    github.com/mair-community/mosaic
                  </a>
                </p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                2
              </div>
              <div>
                <h4 class="font-semibold mb-1">Fork the repository</h4>
                <p class="text-gray-400 text-sm">Create your own copy of the project</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                3
              </div>
              <div>
                <h4 class="font-semibold mb-1">Create a new branch</h4>
                <p class="text-gray-400 text-sm">Use a descriptive name like <code class="px-2 py-0.5 bg-gray-800 rounded text-xs">add-project-name</code></p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                4
              </div>
              <div>
                <h4 class="font-semibold mb-1">Edit catalog/mosaic.json</h4>
                <p class="text-gray-400 text-sm">Add your project entry following the existing schema</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                5
              </div>
              <div>
                <h4 class="font-semibold mb-1">Commit your changes</h4>
                <p class="text-gray-400 text-sm">Use a clear commit message</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                6
              </div>
              <div>
                <h4 class="font-semibold mb-1">Open a Pull Request</h4>
                <p class="text-gray-400 text-sm">Describe your changes and submit for review</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-4">
            <code class="text-sm text-green-400">
              # Example commands<br>
              git clone https://github.com/YOUR-USERNAME/mosaic.git<br>
              cd mosaic<br>
              git checkout -b add-my-project<br>
              # Edit catalog/mosaic.json<br>
              git add catalog/mosaic.json<br>
              git commit -m "Add MyProject to catalog"<br>
              git push origin add-my-project
            </code>
          </div>
        </section>

        <!-- Proposing New Domains -->
        <section class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Proposing New Domains</h2>
          <p class="text-gray-600 mb-6">
            If existing domains don't fit your project, you can propose a new one:
          </p>
          <ol class="space-y-3 mb-6">
            <li class="flex items-start space-x-3">
              <span class="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span class="text-gray-600">Open a GitHub issue in the repository</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span class="text-gray-600">Include the proposed domain label and description</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span class="text-gray-600">Provide example projects that would use this domain</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span class="text-gray-600">The community will discuss and vote on the proposal</span>
            </li>
          </ol>
          <a
            href="https://github.com/mair-community/mosaic"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary inline-flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Open an Issue</span>
          </a>
        </section>

        <!-- Community Guidelines -->
        <section class="card p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
          <p class="text-gray-600 mb-4">
            We strive to maintain a welcoming and inclusive community. When contributing:
          </p>
          <ul class="space-y-2">
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Be constructive and respectful in all interactions</span>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Provide accurate and complete information</span>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Help keep the catalog accurate and welcoming</span>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">Respect the time and effort of maintainers and contributors</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
