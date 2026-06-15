import { LitElement, html } from "lit";
import { mallorcaProperties } from "../data/properties.js";
import { createDiscoveryBrief } from "../lib/discovery.js";

const DEFAULT_PROMPT = "find best options for home in Mallorca";

export class TopPropertiesApp extends LitElement {
  static properties = {
    prompt: { type: String },
  };

  constructor() {
    super();
    this.prompt = DEFAULT_PROMPT;
  }

  createRenderRoot() {
    // Tailwind's generated stylesheet is global; render Lit into light DOM so utilities apply.
    return this;
  }

  render() {
    const brief = createDiscoveryBrief(this.prompt, mallorcaProperties);
    const curated = brief.sections.find((section) => section.kind === "curated-properties");

    return html`
      <main
        class="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_78%_12%,rgb(198_157_86_/_28%),transparent_30rem),linear-gradient(135deg,#17120d_0%,#2a1d12_52%,#efe3d1_52%,#c7a267_100%)] px-[18px] py-6 text-surface-warm md:px-[clamp(24px,4vw,64px)] md:py-[clamp(24px,4vw,64px)]"
      >
        <section
          aria-labelledby="page-title"
          class="mx-0 grid w-full max-w-[339px] grid-cols-1 items-center gap-7 md:mx-auto md:max-w-[1180px] md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:gap-[clamp(28px,5vw,72px)]"
        >
          <div>
            <p
              class="mb-[18px] text-[0.68rem] font-bold leading-normal tracking-[0.18em] text-brand uppercase md:text-[0.78rem]"
            >
              TopProperties / Mallorca intelligence
            </p>
            <h1
              id="page-title"
              class="m-0 max-w-[7ch] font-serif text-[clamp(3.1rem,17vw,4.4rem)] leading-[0.82] font-medium tracking-[-0.08em] md:max-w-[10ch] md:text-[clamp(4rem,11vw,9rem)]"
            >
              Luxury homes, agent composed.
            </h1>
            <p
              class="my-7 max-w-[650px] text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.55] text-stone-300"
            >
              A lightweight startup baseline for the agentic Mallorca demo: prompt-led discovery,
              curated safe primitives, and a clear Vite+ handoff path for the next implementation
              pass.
            </p>
            <form
              class="flex w-full max-w-[339px] flex-wrap gap-3 rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-[0_24px_80px_rgb(0_0_0_/_22%)] backdrop-blur-[18px] md:max-w-[680px] md:rounded-full"
              @submit=${this.#handleSubmit}
            >
              <input
                class="min-w-0 flex-[1_1_100%] border-0 bg-transparent px-5 py-3.5 font-[inherit] text-amber-50 outline-none md:flex-[1_1_260px]"
                name="prompt"
                aria-label="Buyer prompt"
                .value=${this.prompt}
                @input=${this.#handleInput}
              />
              <button
                class="w-full cursor-pointer rounded-full border-0 bg-amber-300 px-5 py-3.5 font-extrabold text-stone-950 md:w-auto"
                type="submit"
              >
                Compose brief
              </button>
            </form>
          </div>

          <aside
            class="w-full max-w-[339px] min-w-0 rounded-[36px] border border-stone-950/15 bg-amber-50/90 p-[clamp(22px,3vw,34px)] text-stone-950 shadow-[0_28px_90px_rgb(48_29_13_/_30%)] md:max-w-none"
            aria-label="Generated property brief"
          >
            <div class="mb-[22px] flex flex-wrap gap-2.5">
              <span
                class="rounded-full bg-stone-200 px-3 py-2 text-[0.82rem] font-bold text-stone-700"
              >
                ${brief.intent}
              </span>
              <span
                class="rounded-full bg-stone-200 px-3 py-2 text-[0.82rem] font-bold text-stone-700"
              >
                ${brief.location}
              </span>
              <span
                class="rounded-full bg-stone-200 px-3 py-2 text-[0.82rem] font-bold text-stone-700"
              >
                safe Lit primitive
              </span>
            </div>
            <h2
              class="mb-[18px] font-serif text-[clamp(1.8rem,10vw,2.35rem)] leading-[0.95] md:text-[clamp(2rem,4vw,3rem)]"
            >
              ${curated.title}
            </h2>
            <div class="grid gap-3.5">
              ${curated.items.map(
                (property) => html`
                  <article class="rounded-[22px] border border-stone-200 bg-amber-50 p-[18px]">
                    <h3 class="mb-2 text-[1.05rem] font-bold">${property.title}</h3>
                    <p class="mb-3 break-words text-stone-700">
                      ${property.location} · ${property.priceLabel} · ${property.fit}
                    </p>
                    <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
                      ${property.highlights.map(
                        (highlight) => html`
                          <li
                            class="rounded-full bg-stone-950 px-[9px] py-1.5 text-xs text-amber-100"
                          >
                            ${highlight}
                          </li>
                        `,
                      )}
                    </ul>
                  </article>
                `,
              )}
            </div>
          </aside>
        </section>
      </main>
    `;
  }

  #handleInput(event) {
    this.prompt = event.target.value;
  }

  #handleSubmit(event) {
    event.preventDefault();
  }
}

customElements.define("topproperties-app", TopPropertiesApp);
