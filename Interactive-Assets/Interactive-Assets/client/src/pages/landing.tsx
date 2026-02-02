import { motion } from "framer-motion";
import { useLocation } from "wouter";

function TypeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = Array.from(text);
  return (
    <span className="inline-flex flex-wrap">
      {letters.map((ch, idx) => (
        <motion.span
          key={`${ch}-${idx}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + idx * 0.018, duration: 0.36, ease: "easeOut" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function LandingPage() {
  const [, navigate] = useLocation();

  return (
    <div className="relative">
      <section className="mx-auto flex min-h-[calc(100dvh-7rem)] max-w-5xl items-center px-5 py-14">
        <div className="valentine-card soft-fade-in relative w-full overflow-hidden rounded-[30px] px-6 py-10 sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 520px at 20% 15%, hsl(var(--sage)/0.22), transparent 62%), radial-gradient(900px 520px at 85% 25%, hsl(var(--blush)/0.30), transparent 62%), linear-gradient(180deg, transparent, hsl(var(--cream)/0.35))",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-7">
              <div className="space-y-3">
                <h1
                  className="font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl"
                  data-testid="text-landing-title"
                >
                  <TypeLine text="For You" /> <span aria-hidden>💚</span>
                </h1>
                <p
                  className="max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
                  data-testid="text-landing-subtitle"
                >
                  <TypeLine
                    text="Hey love… this little corner of the internet is only for you 💚"
                    delay={0.25}
                  />
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.button
                  type="button"
                  onClick={() => navigate("/story")}
                  data-testid="button-start-journey"
                  className="valentine-ring heartbeat inline-flex items-center justify-center rounded-full bg-[hsl(var(--sage))] px-6 py-3 text-sm font-semibold text-[hsl(var(--cream))] shadow-lg shadow-[hsl(var(--sage)/0.25)] transition hover:brightness-[1.03] active:brightness-[0.98]"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start the Journey 🌿💖
                </motion.button>

                <div className="text-sm text-foreground/65" data-testid="text-landing-hint">
                  (little surprises hide everywhere)
                </div>
              </div>

              <div className="pt-4">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-[hsl(var(--card)/0.55)] px-4 py-2 text-sm text-foreground/70 backdrop-blur"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  data-testid="badge-scroll"
                >
                  <span aria-hidden>🍃</span>
                  <span>scroll gently</span>
                  <span aria-hidden className="text-[hsl(var(--rose))]">
                    ♥
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] border border-border bg-[hsl(var(--card)/0.55)] backdrop-blur">
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(480px 300px at 30% 25%, hsl(var(--blush)/0.55), transparent 62%), radial-gradient(480px 300px at 70% 75%, hsl(var(--sage)/0.45), transparent 62%), linear-gradient(180deg, hsl(var(--cream)/0.4), transparent)",
                  }}
                  data-testid="panel-landing-art"
                />
              </div>

              <motion.div
                className="pointer-events-none absolute -bottom-5 -left-4 rounded-2xl border border-border bg-[hsl(var(--card)/0.7)] px-4 py-3 text-sm text-foreground/75 shadow-sm backdrop-blur"
                initial={{ opacity: 0, y: 10, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: -1 }}
                transition={{ delay: 0.55, duration: 0.55 }}
                data-testid="card-landing-note"
              >
                <div className="font-display text-2xl text-foreground">psst…</div>
                <div>tap the leaves below 🌿</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
