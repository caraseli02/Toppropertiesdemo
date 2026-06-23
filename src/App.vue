<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Home,
  MapPinned,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "@lucide/vue";
import { composePrototypeBrief, defaultPrompt } from "./data/prototype";

const prompt = ref(defaultPrompt);
const submittedPrompt = ref(defaultPrompt);
const activeHomeId = ref("andratx-cliff-house");

const brief = computed(() => composePrototypeBrief(submittedPrompt.value));
const activeHome = computed(
  () =>
    brief.value.matches.find((home) => home.id === activeHomeId.value) ?? brief.value.matches[0],
);

function composeBrief() {
  submittedPrompt.value = prompt.value;
}
</script>

<template>
  <main class="min-h-screen bg-[#f6f6f4] text-[#181818]">
    <section
      class="mx-auto grid min-h-screen w-full max-w-[1440px] gap-0 bg-white lg:grid-cols-[88px_1fr]"
    >
      <aside
        class="hidden border-r border-[#e7e4df] bg-white lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-6"
      >
        <a
          href="#topproperties-app"
          class="focus-ring grid size-11 place-items-center rounded-[14px] bg-[#a70f2d] text-sm font-black text-white"
        >
          TP
        </a>
        <nav class="grid gap-5" aria-label="Prototype navigation">
          <a class="rail-icon is-active" href="#topproperties-app" aria-label="Home">
            <Home :size="18" aria-hidden="true" />
          </a>
          <a class="rail-icon" href="#shortlist" aria-label="Shortlist">
            <Search :size="18" aria-hidden="true" />
          </a>
          <a class="rail-icon" href="#intelligence" aria-label="Intelligence">
            <MapPinned :size="18" aria-hidden="true" />
          </a>
        </nav>
        <span
          class="rotate-[-90deg] text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#8f8f8b]"
        >
          Mallorca
        </span>
      </aside>

      <section id="topproperties-app" class="grid min-w-0 grid-rows-[auto_1fr_auto]">
        <header class="border-b border-[#e7e4df] bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#a70f2d]">
                TopProperties
              </p>
              <h1 class="mt-1 text-xl font-black tracking-[-0.02em] sm:text-2xl">
                Mallorca property brief
              </h1>
            </div>
            <div class="hidden items-center gap-2 md:flex">
              <span class="tiny-status">Buyer move</span>
              <span class="tiny-status">Mock AI</span>
              <button class="icon-button" type="button" aria-label="Open filters">
                <SlidersHorizontal :size="18" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <div
          class="grid min-h-0 gap-0 lg:grid-cols-[minmax(360px,0.9fr)_minmax(420px,1.08fr)_minmax(330px,0.72fr)]"
        >
          <section class="screen-column" aria-labelledby="prompt-title">
            <div class="screen-topline">
              <span>01</span>
              <span>Prompt</span>
            </div>

            <div class="space-y-7">
              <div>
                <p class="eyebrow-red">Agent request</p>
                <h2
                  id="prompt-title"
                  class="mt-3 max-w-[12ch] text-5xl font-black leading-[0.92] tracking-[-0.05em]"
                >
                  Find best options.
                </h2>
                <p class="mt-4 max-w-[26rem] text-sm leading-6 text-[#5c5c58]">
                  A clean Figma-inspired property workspace for a luxury buyer comparing Mallorca
                  homes, tradeoffs, and neighborhood signals.
                </p>
              </div>

              <form class="prompt-card" @submit.prevent="composeBrief">
                <label class="field-label" for="buyer-prompt">Buyer prompt</label>
                <textarea
                  id="buyer-prompt"
                  v-model="prompt"
                  rows="4"
                  class="prompt-input"
                  autocomplete="off"
                />
                <button
                  class="primary-action"
                  type="submit"
                  aria-label="Generate Mallorca property brief"
                >
                  Generate brief
                  <ArrowUpRight :size="17" aria-hidden="true" />
                </button>
              </form>

              <div class="mini-module">
                <div class="module-title">
                  <Bot :size="17" aria-hidden="true" />
                  Safe generated UI
                </div>
                <p>
                  Static mock composition from curated homes, comparison modules, and Mallorca area
                  intelligence.
                </p>
              </div>
            </div>
          </section>

          <section
            id="shortlist"
            class="screen-column screen-column-strong"
            aria-labelledby="shortlist-title"
          >
            <div class="screen-topline">
              <span>02</span>
              <span>Generated shortlist</span>
            </div>

            <div class="brief-strip">
              <div>
                <p class="eyebrow-red">Composed from</p>
                <h2 id="shortlist-title" class="mt-2 text-2xl font-black tracking-[-0.03em]">
                  "{{ brief.prompt }}"
                </h2>
              </div>
              <Sparkles :size="20" aria-hidden="true" class="text-[#a70f2d]" />
            </div>

            <div class="list-shell">
              <button
                v-for="(home, index) in brief.matches"
                :key="home.id"
                class="property-row focus-ring"
                :class="{ 'is-selected': home.id === activeHome.id }"
                type="button"
                @click="activeHomeId = home.id"
              >
                <span class="property-index">{{ String(index + 1).padStart(2, "0") }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-base font-black tracking-[-0.02em]">{{ home.name }}</span>
                  <span
                    class="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#777772]"
                  >
                    {{ home.area }} · {{ home.price }}
                  </span>
                </span>
                <span class="row-verdict">{{ home.signals.airport }}</span>
                <ChevronRight :size="17" aria-hidden="true" />
              </button>
            </div>

            <section id="intelligence" class="mt-7">
              <div class="mb-3 flex items-center justify-between">
                <p class="eyebrow-red">Area intelligence</p>
                <MapPinned :size="18" aria-hidden="true" class="text-[#a70f2d]" />
              </div>
              <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <article v-for="area in brief.areas" :key="area.area" class="area-card">
                  <div class="area-pin" />
                  <h3>{{ area.area }}</h3>
                  <p>{{ area.mood }}</p>
                </article>
              </div>
            </section>
          </section>

          <aside class="screen-column" aria-label="Selected property detail">
            <div class="screen-topline">
              <span>03</span>
              <span>Detail</span>
            </div>

            <article class="detail-card">
              <div class="detail-header">
                <div>
                  <p class="eyebrow-red">Recommended first</p>
                  <h2 class="mt-2 text-3xl font-black leading-tight tracking-[-0.04em]">
                    {{ activeHome.name }}
                  </h2>
                </div>
                <span class="detail-badge">{{ activeHome.price }}</span>
              </div>

              <p class="mt-5 text-sm font-black text-[#a70f2d]">{{ activeHome.fit }}</p>
              <p class="mt-4 text-sm leading-6 text-[#555550]">{{ activeHome.thesis }}</p>

              <dl class="metric-grid">
                <div>
                  <dt>Privacy</dt>
                  <dd>{{ activeHome.signals.privacy }}</dd>
                </div>
                <div>
                  <dt>Airport</dt>
                  <dd>{{ activeHome.signals.airport }}</dd>
                </div>
                <div>
                  <dt>Mode</dt>
                  <dd>{{ activeHome.signals.lifestyle }}</dd>
                </div>
              </dl>

              <div class="mt-6">
                <p class="field-label">Highlights</p>
                <ul class="mt-3 grid gap-2">
                  <li v-for="highlight in activeHome.highlights" :key="highlight" class="check-row">
                    <Check :size="15" aria-hidden="true" />
                    {{ highlight }}
                  </li>
                </ul>
              </div>
            </article>

            <article class="mt-6 border-t border-[#e7e4df] pt-6">
              <div class="module-title">
                <MessageCircle :size="17" aria-hidden="true" />
                Next best question
              </div>
              <p class="mt-3 text-sm leading-6 text-[#555550]">
                Should I optimize for privacy and sea access, or for Palma convenience and
                year-round investment confidence?
              </p>
              <button class="secondary-action" type="button">
                Compare tradeoffs
                <ArrowUpRight :size="16" aria-hidden="true" />
              </button>
            </article>
          </aside>
        </div>

        <nav class="bottom-nav" aria-label="Mobile navigation">
          <a class="is-active" href="#topproperties-app">
            <Home :size="17" aria-hidden="true" />
            Brief
          </a>
          <a href="#shortlist">
            <Search :size="17" aria-hidden="true" />
            Homes
          </a>
          <a href="#intelligence">
            <MapPinned :size="17" aria-hidden="true" />
            Areas
          </a>
        </nav>
      </section>
    </section>
  </main>
</template>
