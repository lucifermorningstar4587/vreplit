import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

type Note = {
  id: string;
  title: string;
  body: string;
};

function Typewriter({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <div className="leading-relaxed">
      {chars.map((c, idx) => (
        <motion.span
          key={`${c}-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: idx * 0.015, duration: 0.2 }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

export default function LoveNotesPage() {
  const notes = useMemo<Note[]>(
    () => [
      {
        id: "forever",
        title: "A soft forever",
        body: "You make my world feel gentler. Thank you for loving me in the small moments and the loud ones.\n\nForever yours, always 💚",
      },
      {
        id: "home",
        title: "You feel like home",
        body: "In a noisy world, you are my calm. I choose you in every version of tomorrow.\n\nForever yours, always 💚",
      },
      {
        id: "smile",
        title: "I love your smile",
        body: "It’s my favorite sunrise. If I could bottle it up, I’d wear it like perfume.\n\nForever yours, always 💚",
      },
    ],
    [],
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Note | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <header className="soft-fade-in mb-8 space-y-3">
        <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl" data-testid="text-notes-title">
          Love Notes
        </h1>
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg" data-testid="text-notes-subtitle">
          Little envelopes, each one holding a piece of my heart.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((n) => (
          <motion.button
            key={n.id}
            type="button"
            data-testid={`card-envelope-${n.id}`}
            onClick={() => {
              setActive(n);
              setOpen(true);
            }}
            className="valentine-ring valentine-card group relative overflow-hidden rounded-[26px] p-5 text-left"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(520px 240px at 20% 10%, hsl(var(--sage)/0.16), transparent 60%), radial-gradient(520px 240px at 90% 10%, hsl(var(--blush)/0.25), transparent 60%)",
                }}
              />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55" data-testid={`text-envelope-kicker-${n.id}`}>
                    tap to open
                  </div>
                  <div className="mt-2 text-lg font-semibold" data-testid={`text-envelope-title-${n.id}`}>
                    {n.title}
                  </div>
                </div>
                <div className="mt-1 grid h-10 w-10 place-items-center rounded-2xl border border-border bg-[hsl(var(--cream)/0.55)] text-lg" aria-hidden>
                  💌
                </div>
              </div>

              <div className="mt-5 h-12 w-full overflow-hidden rounded-2xl border border-border bg-[hsl(var(--cream)/0.55)]" aria-hidden>
                <div className="h-full w-full bg-gradient-to-r from-[hsl(var(--sage)/0.12)] via-[hsl(var(--blush)/0.20)] to-[hsl(var(--gold)/0.14)]" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            data-testid="modal-note"
          >
            <motion.div
              className="valentine-card w-full max-w-2xl rounded-[30px] p-6 sm:p-8"
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55" data-testid="text-note-kicker">
                    a note for you
                  </div>
                  <div className="mt-2 font-display text-4xl" data-testid="text-note-title">
                    {active.title}
                  </div>
                </div>
                <button
                  type="button"
                  data-testid="button-close-note"
                  onClick={() => setOpen(false)}
                  className="valentine-ring inline-flex rounded-full border border-border bg-[hsl(var(--card)/0.7)] px-4 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-[hsl(var(--card)/0.9)]"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 rounded-[26px] border border-[hsl(var(--sage)/0.35)] bg-[hsl(var(--cream)/0.55)] p-6 shadow-[0_0_0_1px_hsl(var(--sage)/0.10),0_0_40px_hsl(var(--sage)/0.18)]" data-testid="panel-note-body">
                <div className="font-display text-2xl text-foreground/90">Dear love,</div>
                <div className="mt-3 text-base text-foreground/80" data-testid="text-note-body">
                  <Typewriter text={active.body} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
