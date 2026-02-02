import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";

export default function ValentinePage() {
  const [, navigate] = useLocation();

  const [noCount, setNoCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [yes, setYes] = useState(false);

  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  const noMessage =
    "hehehhe neek aa chance ledhu le 😌\nmuskuni YES nokku 💚";

  const yesMessage =
    "heehheeh neek verey option ledhu le nen tappa 😘\nHappy Valentine\u2019s Day bangaram 💚";

  const burst = useMemo(() => Array.from({ length: 26 }).map((_, i) => i), []);

  useEffect(() => {
    if (!shake) return;
    const t = window.setTimeout(() => setShake(false), 420);
    return () => window.clearTimeout(t);
  }, [shake]);

  const dodge = () => {
    const el = noBtnRef.current;
    if (!el) return;

    const parent = el.closest("[data-dodge-root]") as HTMLElement | null;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const padding = 12;
    const x = padding + Math.random() * (rect.width - padding * 2);
    const y = padding + Math.random() * (rect.height - padding * 2);

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <header className="soft-fade-in mb-8 space-y-3">
        <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl" data-testid="text-valentine-title">
          Will You Be My Valentine? 💚
        </h1>
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg" data-testid="text-valentine-subtitle">
          I asked the universe… it said: obviously.
        </p>
      </header>

      <div
        className={
          "valentine-card relative overflow-hidden rounded-[34px] p-7 sm:p-10 " +
          (shake ? "animate-[shake_420ms_ease-in-out]" : "")
        }
        data-testid="card-valentine"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 20% 10%, hsl(var(--sage)/0.22), transparent 60%), radial-gradient(900px 520px at 85% 25%, hsl(var(--blush)/0.26), transparent 60%)",
          }}
        />

        <div className="relative">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto inline-flex rounded-[28px] border border-[hsl(var(--sage)/0.45)] bg-[hsl(var(--card)/0.55)] px-6 py-5 shadow-[0_0_0_1px_hsl(var(--sage)/0.16),0_0_55px_hsl(var(--sage)/0.20)]">
              <div className="space-y-3">
                <div className="font-display text-5xl" data-testid="text-valentine-question">
                  Will you be my Valentine? 💚
                </div>
                <div className="text-base text-foreground/70" data-testid="text-valentine-instruction">
                  Choose wisely… (or I\u2019ll help you)
                </div>
              </div>
            </div>

            <div
              className="relative mx-auto mt-8 h-[210px] w-full max-w-xl"
              data-dodge-root
              data-testid="panel-valentine-buttons"
            >
              <motion.button
                type="button"
                data-testid="button-yes"
                onClick={() => setYes(true)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="valentine-ring absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-[hsl(var(--sage))] px-10 py-3 text-sm font-semibold text-[hsl(var(--cream))] shadow-lg shadow-[hsl(var(--sage)/0.25)]"
              >
                YES 💖
              </motion.button>

              <button
                ref={noBtnRef}
                type="button"
                data-testid="button-no"
                onMouseEnter={() => {
                  dodge();
                }}
                onFocus={() => {
                  dodge();
                }}
                onClick={() => {
                  setNoCount((c) => c + 1);
                  setShake(true);
                }}
                className="valentine-ring absolute left-1/2 top-[130px] -translate-x-1/2 rounded-full border border-[hsl(var(--rose)/0.45)] bg-[hsl(var(--card)/0.7)] px-10 py-3 text-sm font-semibold text-foreground/75 shadow-sm backdrop-blur transition hover:bg-[hsl(var(--card)/0.9)]"
              >
                NO 😈
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center">
                <AnimatePresence>
                  {noCount > 0 && !yes && (
                    <motion.div
                      className="mx-auto inline-flex max-w-lg whitespace-pre-line rounded-[22px] border border-[hsl(var(--rose)/0.35)] bg-[hsl(var(--blush)/0.20)] px-5 py-4 text-sm text-foreground/80"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      data-testid="text-no-message"
                    >
                      {noMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {yes && (
            <motion.div
              className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-testid="modal-yes"
            >
              <motion.div
                className="valentine-card w-full max-w-2xl rounded-[34px] p-7 sm:p-10"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="text-center">
                  <div className="font-display text-6xl">YAY 💚</div>
                  <div
                    className="mt-4 whitespace-pre-line text-base text-foreground/80"
                    data-testid="text-yes-message"
                  >
                    {yesMessage}
                  </div>

                  <div className="mt-5 font-display text-4xl text-[hsl(var(--sage))]" data-testid="text-forever-always">
                    Forever & Always 🌿💍
                  </div>

                  <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      type="button"
                      data-testid="button-replay-story"
                      onClick={() => {
                        setYes(false);
                        navigate("/story");
                      }}
                      className="valentine-ring inline-flex items-center justify-center rounded-full bg-[hsl(var(--sage))] px-7 py-3 text-sm font-semibold text-[hsl(var(--cream))] shadow-lg shadow-[hsl(var(--sage)/0.25)]"
                    >
                      Replay Our Story 💖
                    </button>
                    <button
                      type="button"
                      data-testid="button-close-yes"
                      onClick={() => setYes(false)}
                      className="valentine-ring inline-flex rounded-full border border-border bg-[hsl(var(--card)/0.75)] px-7 py-3 text-sm font-semibold text-foreground/70 transition hover:bg-[hsl(var(--card)/0.95)]"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <Burst pieces={burst} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`@keyframes shake {0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}}`}</style>
    </div>
  );
}

function Burst({ pieces }: { pieces: number[] }) {
  return (
    <div className="pointer-events-none relative mx-auto mt-2 h-1 w-full max-w-2xl" aria-hidden data-testid="fx-burst">
      {pieces.map((i) => {
        const left = (i / pieces.length) * 100;
        const hue = i % 3 === 0 ? "var(--sage)" : i % 3 === 1 ? "var(--blush)" : "var(--gold)";
        return (
          <motion.span
            key={i}
            className="absolute -top-12 h-2.5 w-2.5 rounded-full"
            style={{ left: `${left}%`, background: `hsl(${hue} / 0.85)` }}
            initial={{ y: 0, opacity: 0, scale: 0.6 }}
            animate={{ y: [-10, 60], opacity: [0, 1, 0], scale: [0.6, 1, 1] }}
            transition={{ duration: 1.4, delay: i * 0.015, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
