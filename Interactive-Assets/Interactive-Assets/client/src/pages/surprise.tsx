import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function SurprisePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <header className="soft-fade-in mb-8 space-y-3">
        <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl" data-testid="text-surprise-title">
          Surprise
        </h1>
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg" data-testid="text-surprise-subtitle">
          One button. One little miracle.
        </p>
      </header>

      <div className="valentine-card relative overflow-hidden rounded-[30px] p-7 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 20% 10%, hsl(var(--sage)/0.18), transparent 60%), radial-gradient(900px 520px at 85% 35%, hsl(var(--blush)/0.26), transparent 60%)",
          }}
        />

        <div className="relative flex flex-col items-center justify-center gap-6 text-center">
          <motion.button
            type="button"
            data-testid="button-unlock-surprise"
            onClick={() => setOpen(true)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="valentine-ring inline-flex items-center justify-center rounded-full bg-[hsl(var(--sage))] px-7 py-3 text-sm font-semibold text-[hsl(var(--cream))] shadow-lg shadow-[hsl(var(--sage)/0.25)]"
          >
            Click to Unlock Your Surprise 🎁
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="mt-2 w-full max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                data-testid="panel-surprise-reveal"
              >
                <motion.div
                  className="mx-auto grid aspect-[16/8] w-full place-items-center overflow-hidden rounded-[28px] border border-[hsl(var(--sage)/0.45)] bg-[hsl(var(--cream)/0.55)] shadow-[0_0_0_1px_hsl(var(--sage)/0.14),0_0_50px_hsl(var(--sage)/0.22)]"
                  initial={{ scale: 0.96 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="space-y-3 px-6">
                    <div className="font-display text-5xl">For you 💚</div>
                    <div className="text-base text-foreground/75" data-testid="text-surprise-message">
                      You are my favorite person, my safest place, my sweetest accident.\n\nToday and every day: I choose you.
                    </div>
                  </div>
                </motion.div>

                <Confetti />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 22 }).map((_, i) => i);
  return (
    <div className="pointer-events-none relative mx-auto mt-1 h-1 w-full max-w-2xl" aria-hidden data-testid="fx-confetti">
      {pieces.map((i) => {
        const left = (i / pieces.length) * 100;
        const hue = i % 2 === 0 ? "var(--sage)" : "var(--blush)";
        return (
          <motion.span
            key={i}
            className="absolute -top-8 h-2 w-2 rounded-sm"
            style={{ left: `${left}%`, background: `hsl(${hue} / 0.85)` }}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: [0, 46], opacity: [0, 1, 0], rotate: [0, 140] }}
            transition={{ duration: 1.2, delay: i * 0.02, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
