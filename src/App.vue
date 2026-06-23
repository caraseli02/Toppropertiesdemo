<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowUpRight, Bot, Check, Compass, MapPinned, MessageCircle, Sparkles } from "@lucide/vue";
import { composePrototypeBrief, defaultPrompt } from "./data/prototype";

const prompt = ref(defaultPrompt);
const submittedPrompt = ref(defaultPrompt);

const brief = computed(() => composePrototypeBrief(submittedPrompt.value));
const leadHome = computed(() => brief.value.matches[0]);
const supportingHomes = computed(() => brief.value.matches.slice(1));

function composeBrief() {
  submittedPrompt.value = prompt.value;
}
</script>

<template>
  <main class="min-h-screen overflow-x-hidden bg-[#ece7dc] text-[#18221d]">
    <section class="relative isolate min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,#ffffff_0,transparent_30%),radial-gradient(circle_at_86%_12%,#bfdcd5_0,transparent_34%),linear-gradient(135deg,#f8f4ea_0%,#e6dfd1_100%)]"
      />
      <div aria-hidden="true" class="absolute inset-0 -z-10 opacity-45 blueprint-grid" />

      <div
        class="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-[1480px] gap-4 lg:grid-cols-[86px_minmax(0,1fr)_380px]"
      >
        <aside
          class="hidden rounded-[28px] border border-white/70 bg-white/55 p-4 shadow-[0_24px_70px_rgba(47,54,45,0.12)] backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:justify-between"
          aria-label="Prototype navigation"
        >
          <a
            href="#topproperties-prototype"
            class="focus-ring grid size-12 place-items-center rounded-2xl bg-[#17241f] text-sm font-black text-[#f8f4ea]"
          >
            TP
          </a>
          <nav class="grid gap-3" aria-label="Prototype sections">
            <a class="nav-dot is-active" href="#topproperties-prototype" aria-label="Brief" />
            <a class="nav-dot" href="#property-options" aria-label="Properties" />
            <a class="nav-dot" href="#area-intelligence" aria-label="Areas" />
          </nav>
          <span class="vertical-label">Mallorca</span>
        </aside>

        <section id="topproperties-prototype" class="grid gap-4">
          <header
            class="flex items-center justify-between gap-4 rounded-[28px] border border-white/70 bg-white/60 px-4 py-3 shadow-[0_18px_54px_rgba(47,54,45,0.1)] backdrop-blur-xl sm:px-5"
          >
            <div>
              <p class="text-xs font-black uppercase tracking-[0.18em] text-[#657269]">
                TopProperties
              </p>
              <p class="text-sm font-semibold text-[#26352e]">Luxury discovery assistant</p>
            </div>
            <div class="hidden items-center gap-2 md:flex">
              <span class="status-pill">Mallorca only</span>
              <span class="status-pill">Mock AI</span>
            </div>
            <button
              class="focus-ring inline-flex size-11 items-center justify-center rounded-2xl bg-[#dba94f] text-[#17241f] shadow-[0_14px_28px_rgba(219,169,79,0.28)]"
              type="button"
              aria-label="Open generated brief"
            >
              <Sparkles :size="18" aria-hidden="true" />
            </button>
          </header>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
            <article
              class="relative min-h-[620px] overflow-hidden rounded-[34px] border border-white/75 bg-[#17241f] shadow-[0_34px_90px_rgba(38,53,46,0.2)]"
              aria-labelledby="hero-title"
            >
              <img
                :src="leadHome.image"
                :alt="`${leadHome.name} luxury home visual reference`"
                class="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <div
                aria-hidden="true"
                class="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,24,20,0.86),rgba(15,24,20,0.22)_58%,rgba(15,24,20,0.5)),linear-gradient(0deg,rgba(15,24,20,0.66),transparent_48%)]"
              />

              <div class="relative z-10 flex min-h-[620px] flex-col justify-between p-5 sm:p-7">
                <div class="max-w-[620px] space-y-5">
                  <div
                    class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#d8f0ea] backdrop-blur-md"
                  >
                    <Bot :size="15" aria-hidden="true" />
                    Agent-composed brief
                  </div>
                  <h1
                    id="hero-title"
                    class="max-w-[10ch] text-[3.4rem] font-black leading-[0.9] tracking-normal text-white sm:text-[5rem] lg:text-[6.4rem]"
                  >
                    Find the right Mallorca home.
                  </h1>
                  <p class="max-w-[34rem] text-base leading-7 text-[#f5efe4] sm:text-lg">
                    A Figma-inspired showcase for luxury buyers comparing lifestyle, privacy, and
                    investment confidence before a move or second home.
                  </p>
                </div>

                <form
                  class="grid gap-3 rounded-[24px] border border-white/24 bg-white/18 p-3 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:grid-cols-[1fr_auto]"
                  @submit.prevent="composeBrief"
                >
                  <label class="sr-only" for="buyer-prompt">Buyer prompt</label>
                  <input
                    id="buyer-prompt"
                    v-model="prompt"
                    class="min-h-14 min-w-0 rounded-[18px] border border-white/70 bg-[#fffaf0] px-4 text-[0.98rem] font-semibold text-[#17241f] outline-none placeholder:text-[#6d766e] focus:border-[#dba94f]"
                    autocomplete="off"
                  />
                  <button
                    class="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] bg-[#dba94f] px-5 text-sm font-black text-[#17241f] transition hover:bg-[#efbf66]"
                    type="submit"
                    aria-label="Compose Mallorca property brief"
                  >
                    Generate
                    <ArrowUpRight :size="18" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </article>

            <div class="grid gap-4">
              <article class="figma-panel p-5 sm:p-6">
                <div class="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p class="eyebrow">AI response</p>
                    <h2 class="mt-2 text-2xl font-black leading-tight sm:text-3xl">
                      {{ brief.intent }}
                    </h2>
                  </div>
                  <span
                    class="grid size-12 place-items-center rounded-2xl bg-[#17241f] text-[#d8f0ea]"
                  >
                    <MessageCircle :size="20" aria-hidden="true" />
                  </span>
                </div>
                <div class="rounded-[24px] bg-[#f6f1e6] p-4">
                  <p class="text-sm font-black uppercase tracking-[0.14em] text-[#6a746d]">
                    Prompt
                  </p>
                  <p class="mt-2 text-xl font-black leading-tight">"{{ brief.prompt }}"</p>
                </div>
                <p class="mt-5 text-base leading-7 text-[#4d5a52]">{{ brief.summary }}</p>
              </article>

              <article id="area-intelligence" class="figma-panel min-h-[320px] overflow-hidden p-5">
                <div class="mb-4 flex items-center justify-between">
                  <div>
                    <p class="eyebrow">Map intelligence</p>
                    <h2 class="mt-1 text-xl font-black">Lifestyle zones</h2>
                  </div>
                  <MapPinned :size="22" aria-hidden="true" class="text-[#416b5e]" />
                </div>
                <div class="relative h-[230px] overflow-hidden rounded-[28px] bg-[#dce9e4]">
                  <div class="absolute inset-5 rounded-full border border-[#17241f]/15" />
                  <div class="map-blob left-[16%] top-[47%] bg-[#6d9081]" />
                  <div class="map-blob right-[22%] top-[18%] bg-[#dba94f]" />
                  <div class="map-blob bottom-[16%] right-[14%] bg-[#90bbb2]" />
                  <div class="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
                    <div v-for="area in brief.areas" :key="area.area" class="map-label">
                      <span>{{ area.tone }}</span>
                      <strong>{{ area.area }}</strong>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <section id="property-options" class="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <article
              v-for="home in supportingHomes"
              :key="home.id"
              class="figma-panel grid overflow-hidden p-0 sm:grid-cols-[190px_1fr]"
            >
              <img
                :src="home.image"
                :alt="`${home.name} luxury home visual reference`"
                class="h-56 w-full object-cover sm:h-full"
              />
              <div class="space-y-4 p-5">
                <div>
                  <p class="eyebrow">{{ home.area }} / {{ home.price }}</p>
                  <h3 class="mt-2 text-2xl font-black leading-tight">{{ home.name }}</h3>
                </div>
                <p class="text-sm font-black text-[#2f5548]">{{ home.fit }}</p>
                <p class="text-sm leading-6 text-[#5b675f]">{{ home.thesis }}</p>
                <ul class="flex flex-wrap gap-2">
                  <li v-for="highlight in home.highlights" :key="highlight" class="soft-pill">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
            </article>
          </section>
        </section>

        <aside class="grid gap-4 lg:grid-rows-[auto_1fr]" aria-label="Generated brief details">
          <section class="figma-panel p-5">
            <p class="eyebrow">Recommended first</p>
            <h2 class="mt-2 text-2xl font-black leading-tight">{{ leadHome.name }}</h2>
            <p class="mt-3 text-sm font-black text-[#2f5548]">{{ leadHome.fit }}</p>
            <p class="mt-4 text-sm leading-6 text-[#5b675f]">{{ leadHome.thesis }}</p>
            <dl class="mt-5 grid grid-cols-3 gap-2">
              <div class="metric">
                <dt>Privacy</dt>
                <dd>{{ leadHome.signals.privacy }}</dd>
              </div>
              <div class="metric">
                <dt>Airport</dt>
                <dd>{{ leadHome.signals.airport }}</dd>
              </div>
              <div class="metric">
                <dt>Mode</dt>
                <dd>{{ leadHome.signals.lifestyle }}</dd>
              </div>
            </dl>
          </section>

          <section class="figma-panel flex flex-col p-5">
            <div class="mb-5 flex items-center justify-between">
              <div>
                <p class="eyebrow">Tradeoff stack</p>
                <h2 class="mt-1 text-xl font-black">How to choose</h2>
              </div>
              <Compass :size="22" aria-hidden="true" class="text-[#416b5e]" />
            </div>
            <div class="grid gap-3">
              <article v-for="area in brief.areas" :key="area.area" class="choice-row">
                <Check :size="17" aria-hidden="true" class="mt-1 shrink-0 text-[#dba94f]" />
                <div>
                  <h3 class="font-black">{{ area.area }}</h3>
                  <p class="mt-1 text-sm leading-6 text-[#5b675f]">
                    {{ area.mood }}. {{ area.buyerFit }}; {{ area.timing }}.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </aside>
      </div>
    </section>
  </main>
</template>
