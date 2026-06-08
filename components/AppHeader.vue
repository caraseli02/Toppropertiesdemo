<template>
  <header class="sticky top-0 z-50 bg-surface-elevated/80 backdrop-blur-md border-b border-stone-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Logo / Brand -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-8 h-8 rounded-lg bg-stone-950 flex items-center justify-center">
            <span class="text-gold-400 font-display text-sm font-bold">T</span>
          </div>
          <div class="hidden sm:block">
            <span class="font-display text-lg text-stone-950 tracking-tight">TopProperties</span>
            <span class="text-xs text-stone-400 block -mt-0.5 tracking-widest uppercase">Mallorca</span>
          </div>
        </NuxtLink>

        <!-- Nav (placeholder) -->
        <nav class="hidden md:flex items-center gap-8">
          <span class="text-sm text-stone-500 hover:text-stone-900 cursor-default transition-colors">Buy</span>
          <span class="text-sm text-stone-500 hover:text-stone-900 cursor-default transition-colors">Explore</span>
          <span class="text-sm text-stone-500 hover:text-stone-900 cursor-default transition-colors">Insights</span>
        </nav>

        <!-- CTA -->
        <button
          class="bg-stone-950 text-stone-50 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Start Search
        </button>
      </div>
    </div>
  </header>
</template>
