import { LitElement, css, html } from "lit";
import { mallorcaProperties } from "../data/properties.js";
import { createDiscoveryBrief } from "../lib/discovery.js";

const DEFAULT_PROMPT = "find best options for home in Mallorca";

export class TopPropertiesApp extends LitElement {
  static properties = {
    prompt: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    .shell {
      min-height: 100vh;
      padding: clamp(24px, 4vw, 64px);
      color: #f5efe4;
      background:
        radial-gradient(circle at 78% 12%, rgb(198 157 86 / 28%), transparent 30rem),
        linear-gradient(135deg, #17120d 0%, #2a1d12 52%, #efe3d1 52%, #c7a267 100%);
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
      gap: clamp(28px, 5vw, 72px);
      align-items: center;
      max-width: 1180px;
      margin: 0 auto;
    }

    .eyebrow {
      margin: 0 0 18px;
      color: #d4aa63;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h1 {
      max-width: 10ch;
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(4rem, 11vw, 9rem);
      font-weight: 500;
      letter-spacing: -0.08em;
      line-height: 0.82;
    }

    .lede {
      max-width: 650px;
      margin: 28px 0;
      color: #e5d3bd;
      font-size: clamp(1.05rem, 2vw, 1.35rem);
      line-height: 1.55;
    }

    .prompt {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      width: 100%;
      max-width: 680px;
      box-sizing: border-box;
      padding: 12px;
      border: 1px solid rgb(255 255 255 / 18%);
      border-radius: 999px;
      background: rgb(255 255 255 / 10%);
      box-shadow: 0 24px 80px rgb(0 0 0 / 22%);
      backdrop-filter: blur(18px);
    }

    input {
      flex: 1 1 260px;
      min-width: 0;
      border: 0;
      padding: 14px 20px;
      color: #fff7ec;
      background: transparent;
      font: inherit;
      outline: none;
    }

    button {
      border: 0;
      border-radius: 999px;
      padding: 14px 20px;
      color: #22160d;
      background: #f1c56f;
      font-weight: 800;
      cursor: pointer;
    }

    .panel {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      border: 1px solid rgb(45 28 14 / 16%);
      border-radius: 36px;
      padding: clamp(22px, 3vw, 34px);
      color: #21170f;
      background: rgb(255 249 240 / 88%);
      box-shadow: 0 28px 90px rgb(48 29 13 / 30%);
    }

    .panel h2 {
      margin: 0 0 18px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 0.95;
    }

    .brief-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 22px;
    }

    .pill {
      border-radius: 999px;
      padding: 8px 12px;
      background: #ead8bd;
      color: #5a3a1f;
      font-size: 0.82rem;
      font-weight: 700;
    }

    .cards {
      display: grid;
      gap: 14px;
    }

    article {
      padding: 18px;
      border: 1px solid #ead7ba;
      border-radius: 22px;
      background: #fffaf2;
    }

    article h3 {
      margin: 0 0 8px;
      font-size: 1.05rem;
    }

    article p {
      margin: 0 0 12px;
      color: #65482c;
    }

    .highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .highlights li {
      border-radius: 999px;
      padding: 6px 9px;
      background: #24170e;
      color: #f8e5c7;
      font-size: 0.75rem;
    }

    @media (max-width: 760px) {
      .shell {
        box-sizing: border-box;
        width: 100vw;
        overflow-x: hidden;
        padding: 18px;
        background: linear-gradient(180deg, #17120d 0%, #2a1d12 56%, #c7a267 100%);
      }

      .hero {
        grid-template-columns: minmax(0, 1fr);
        width: 100%;
        max-width: 339px;
        margin: 0;
      }

      .eyebrow {
        font-size: 0.68rem;
        line-height: 1.5;
        white-space: normal;
      }

      h1 {
        max-width: 7ch;
        font-size: clamp(3.1rem, 17vw, 4.4rem);
      }

      .panel h2 {
        font-size: clamp(1.8rem, 10vw, 2.35rem);
      }

      .lede,
      .panel,
      article,
      article p {
        min-width: 0;
        overflow-wrap: anywhere;
      }

      .prompt,
      .panel {
        max-width: 339px;
      }

      .prompt {
        border-radius: 28px;
      }

      .prompt input {
        flex-basis: 100%;
      }

      button {
        width: 100%;
      }
    }
  `;

  constructor() {
    super();
    this.prompt = DEFAULT_PROMPT;
  }

  render() {
    const brief = createDiscoveryBrief(this.prompt, mallorcaProperties);
    const curated = brief.sections.find((section) => section.kind === "curated-properties");

    return html`
      <main class="shell">
        <section class="hero" aria-labelledby="page-title">
          <div>
            <p class="eyebrow">TopProperties / Mallorca intelligence</p>
            <h1 id="page-title">Luxury homes, agent composed.</h1>
            <p class="lede">
              A lightweight startup baseline for the agentic Mallorca demo: prompt-led discovery,
              curated safe primitives, and a clear Vite+ handoff path for the next implementation
              pass.
            </p>
            <form class="prompt" @submit=${this.#handleSubmit}>
              <input
                name="prompt"
                aria-label="Buyer prompt"
                .value=${this.prompt}
                @input=${this.#handleInput}
              />
              <button type="submit">Compose brief</button>
            </form>
          </div>

          <aside class="panel" aria-label="Generated property brief">
            <div class="brief-meta">
              <span class="pill">${brief.intent}</span>
              <span class="pill">${brief.location}</span>
              <span class="pill">safe Lit primitive</span>
            </div>
            <h2>${curated.title}</h2>
            <div class="cards">
              ${curated.items.map(
                (property) => html`
                  <article>
                    <h3>${property.title}</h3>
                    <p>${property.location} · ${property.priceLabel} · ${property.fit}</p>
                    <ul class="highlights">
                      ${property.highlights.map((highlight) => html`<li>${highlight}</li>`)}
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
