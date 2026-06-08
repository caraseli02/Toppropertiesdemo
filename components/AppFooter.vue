<template>
  <footer class="border-t border-stone-200/60 bg-stone-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <!-- Brand column -->
        <div class="max-w-xs">
          <div class="flex items-center gap-2.5 mb-3">
            <div class="w-7 h-7 rounded-md bg-stone-950 flex items-center justify-center">
              <span class="text-gold-400 font-display text-xs font-bold">T</span>
            </div>
            <span class="font-display text-base text-stone-950">TopProperties</span>
          </div>
          <p class="text-sm text-stone-500 leading-relaxed">
            Curated luxury property discovery in Mallorca, powered by concierge intelligence.
          </p>
        </div>

        <!-- Links -->
        <div class="flex gap-12 text-sm">
          <div>
            <h4 class="font-medium text-stone-900 mb-3">Explore</h4>
            <ul class="space-y-2 text-stone-500">
              <li class="cursor-default">Properties</li>
              <li class="cursor-default">Neighborhoods</li>
              <li class="cursor-default">Lifestyle Guide</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-stone-900 mb-3">Company</h4>
            <ul class="space-y-2 text-stone-500">
              <li class="cursor-default">About</li>
              <li class="cursor-default">Contact</li>
              <li class="cursor-default">Privacy</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p class="text-xs text-stone-400">&copy; {{ year }} TopProperties. Portfolio demo — not a real marketplace.</p>
        <p class="text-xs text-stone-400">Crafted with care in Mallorca</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
