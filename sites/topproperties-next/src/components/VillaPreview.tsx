import { useEffect, useRef, useState } from "react";
import type { VillaScene, VillaView } from "./villaScene";

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function VillaPreview({ image }: { image: string }) {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");
  const [view, setView] = useState<VillaView>("terrace");
  const [hour, setHour] = useState(15);
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const host = useRef<HTMLDivElement>(null);
  const runtime = useRef<VillaScene | null>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      setReduced(media.matches);
      if (media.matches) setPlaying(false);
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    if (!active || !host.current) return;
    let cancelled = false;
    const fail = () => {
      if (cancelled) return;
      setStatus("unavailable");
      setActive(false);
    };
    void import("./villaScene")
      .then(({ createVillaScene }) => {
        if (cancelled || !host.current) return;
        try {
          runtime.current = createVillaScene(host.current, fail);
          setStatus("ready");
        } catch {
          fail();
        }
      })
      .catch(fail);
    return () => {
      cancelled = true;
      runtime.current?.dispose();
      runtime.current = null;
    };
  }, [active]);

  useEffect(() => {
    if (status === "ready") runtime.current?.setView(view);
  }, [view, status]);
  useEffect(() => {
    if (status === "ready") runtime.current?.setHour(hour);
  }, [hour, status]);
  useEffect(() => {
    if (status === "ready") runtime.current?.setPlaying(playing);
  }, [playing, status]);

  function showConcept() {
    if (!active) {
      setStatus("loading");
      setActive(true);
    }
  }

  return (
    <div className={`hero-photograph villa-preview${active ? " villa-preview-active" : ""}`}>
      <img src={image} alt="Coastal residence overlooking the Mediterranean" fetchPriority="high" />
      <div className="villa-mode-switch" aria-label="Residence preview">
        <button aria-pressed={!active} onClick={() => setActive(false)}>
          Photo
        </button>
        <button aria-pressed={active} onClick={showConcept}>
          Explore in 3D
        </button>
      </div>
      {active ? (
        <>
          <div ref={host} className="villa-canvas" />
          <div className="villa-concept-label">Architectural concept · illustrative</div>
          {status === "loading" && (
            <p className="villa-loading" role="status">
              Preparing your architectural view…
            </p>
          )}
          <div className="villa-controls" aria-label="Architectural view controls">
            <div className="villa-view-row">
              <div className="villa-views">
                {(["terrace", "garden", "aerial"] as const).map((value) => (
                  <button
                    key={value}
                    disabled={status !== "ready"}
                    aria-pressed={view === value}
                    onClick={() => setView(value)}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </button>
                ))}
              </div>
              <button
                className="villa-motion"
                disabled={status !== "ready" || reduced}
                onClick={() => setPlaying(!playing)}
                aria-label={
                  reduced
                    ? "Animation disabled for reduced motion"
                    : playing
                      ? "Pause camera orbit"
                      : "Play camera orbit"
                }
              >
                {reduced ? "Motion off" : playing ? "Pause" : "Play"}
              </button>
            </div>
            <div className="villa-daylight">
              <label htmlFor="villa-daylight">
                Daylight <span>{String(hour).padStart(2, "0")}:00</span>
              </label>
              <input
                id="villa-daylight"
                type="range"
                min={8}
                max={19}
                step={1}
                value={hour}
                disabled={status !== "ready"}
                onChange={(event) => setHour(Number(event.target.value))}
                aria-valuetext={`${hour}:00 illustrative daylight`}
              />
              <span className="villa-light-note">Morning to golden hour</span>
            </div>
          </div>
        </>
      ) : (
        <span className="photo-caption">The Mediterranean edit</span>
      )}
      {status === "unavailable" && (
        <p className="villa-fallback" role="status">
          3D isn’t available in this browser. The photo is shown instead.
        </p>
      )}
    </div>
  );
}
