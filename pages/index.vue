<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-stone-950 text-stone-50 overflow-hidden">
      <!-- Atmospheric background -->
      <div class="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,60,0.08),transparent_60%)]" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div class="max-w-3xl">
          <!-- Eyebrow -->
          <div class="flex items-center gap-2 mb-6">
            <div class="w-5 h-px bg-gold-500" />
            <span class="text-gold-400 text-xs tracking-[0.2em] uppercase font-medium">Concierge Intelligence</span>
          </div>

          <!-- Headline -->
          <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
            Find your exceptional home in Mallorca
          </h1>

          <!-- Subline -->
          <p class="text-stone-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Curated luxury properties, powered by concierge intelligence. Tell us what you're looking for.
          </p>

          <!-- Prompt input -->
          <div class="relative max-w-xl">
            <div class="bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-sm">
              <div class="flex items-center gap-3">
                <div class="flex-1 px-4 py-3">
                  <span class="text-stone-400 text-base">Find best options for home in Mallorca</span>
                </div>
                <button class="bg-gold-500 hover:bg-gold-600 text-stone-950 font-medium text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer">
                  <span>Explore</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-stone-500 text-xs mt-3 pl-4">
              Try: "modern villa with sea view under 3M" or "quiet area near Palma for a family"
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom gradient fade -->
      <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </section>

    <!-- Trust Bar -->
    <section class="bg-surface-muted border-b border-stone-200/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-stone-400">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <span>Verified luxury listings</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <span>AI-powered neighborhood insights</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <span>Mallorca-focused expertise</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Placeholder Content Area -->
    <section class="py-20 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="font-display text-3xl sm:text-4xl text-stone-950 tracking-tight mb-4">
            Curated for you
          </h2>
          <p class="text-stone-500 text-lg max-w-lg mx-auto">
            AI-composed property recommendations and neighborhood intelligence will appear here.
          </p>
        </div>

        <!-- Placeholder cards grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-surface-elevated rounded-2xl border border-stone-200/60 overflow-hidden shadow-soft hover:shadow-medium transition-shadow"
          >
            <div class="aspect-[4/3] bg-stone-100 flex items-center justify-center">
              <span class="text-stone-300 text-sm">Property image</span>
            </div>
            <div class="p-5">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-medium text-stone-900">Villa example {{ i }}</h3>
                <span class="text-gold-600 font-display text-lg">€{{ (1.2 + i * 0.8).toFixed(1) }}M</span>
              </div>
              <p class="text-sm text-stone-500 mb-3">Southwest Mallorca · {{ 3 + i }} beds · Sea view</p>
              <div class="flex gap-2">
                <span class="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">Pool</span>
                <span class="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">Terrace</span>
                <span class="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">{{ i === 1 ? 'New build' : 'Renovated' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
