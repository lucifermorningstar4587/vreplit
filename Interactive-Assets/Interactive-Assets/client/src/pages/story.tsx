import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Milestone = {
  id: string;
  title: string;
  caption: string;
  dateHint: string;
};

export default function StoryPage() {
  const milestones = useMemo<Milestone[]>(
    () => [
      { id: "meet", title: "First meet", caption: "The day the universe got a little softer.", dateHint: "Once upon a moment" },
      {
        id: "talk",
        title: "First conversation",
        caption: "And suddenly talking felt like home.",
        dateHint: "A warm hello",
      },
      { id: "laugh", title: "First laugh", caption: "The kind that makes your cheeks hurt (worth it).", dateHint: "Giggles" },
      { id: "fight", title: "First fight 😛", caption: "Even storms are cute when it\u2019s us.", dateHint: "Tiny thunder" },
      { id: "love", title: "Falling in love", caption: "Quietly. Loudly. Completely.", dateHint: "Always" },
    ],
    [],
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Milestone | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
      <header className="soft-fade-in mb-8 space-y-3">
        <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl" data-testid="text-story-title">
          Our Story
        </h1>
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg" data-testid="text-story-subtitle">
          A timeline of little moments that turned into forever.
        </p>
      </header>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[hsl(var(--sage)/0.0)] via-[hsl(var(--sage)/0.55)] to-[hsl(var(--sage)/0.0)] sm:left-1/2"
          aria-hidden
        />

        <div className="space-y-6">
          {milestones.map((m, idx) => {
            const right = idx % 2 === 1;
            return (
              <motion.button
                key={m.id}
                type="button"
                data-testid={`card-milestone-${m.id}`}
                onClick={() => {
                  setActive(m);
                  setOpen(true);
                }}
                className={
                  "valentine-ring group relative block w-full text-left sm:w-[calc(50%-1.5rem)] " +
                  (right ? "sm:ml-auto" : "")
                }
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className="valentine-card overflow-hidden rounded-[26px] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55" data-testid={`text-milestone-date-${m.id}`}>
                        {m.dateHint}
                      </div>
                      <div className="text-lg font-semibold text-foreground" data-testid={`text-milestone-title-${m.id}`}>
                        {m.title}
                      </div>
                      <div className="text-sm text-foreground/65" data-testid={`text-milestone-caption-${m.id}`}>
                        {m.caption}
                      </div>
                    </div>

                    <motion.div
                      aria-hidden
                      className="mt-1 h-10 w-10 rounded-2xl border border-border bg-[hsl(var(--sage)/0.14)] text-[hsl(var(--sage))]"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.04 }}
                      transition={{ duration: 0.45 }}
                    >
                      <div className="flex h-full w-full items-center justify-center">🍃</div>
                    </motion.div>
                  </div>

                  <div className="mt-4 h-1 w-full rounded-full bg-[hsl(var(--sage)/0.10)]">
                    <div
                      className="h-full w-[42%] rounded-full bg-gradient-to-r from-[hsl(var(--sage)/0.55)] to-[hsl(var(--rose)/0.55)]"
                      aria-hidden
                    />
                  </div>
                </div>

                <span
                  className={
                    "pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-border bg-[hsl(var(--card))] shadow-sm sm:left-1/2 " +
                    (right ? "sm:translate-x-[calc(-0.75rem)]" : "sm:translate-x-[calc(-0.75rem)]")
                  }
                  aria-hidden
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open && active && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent data-testid="modal-milestone" className="valentine-card max-w-xl rounded-[28px]">
              <DialogHeader>
                <DialogTitle data-testid="text-modal-title" className="font-display text-4xl">
                  {active.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div
                  className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-[hsl(var(--sage)/0.12)]"
                  data-testid="img-modal-placeholder"
                >
                  <div
                    className="h-full w-full"
                    style={{
                      background:
                        "radial-gradient(520px 240px at 30% 30%, hsl(var(--blush)/0.55), transparent 60%), radial-gradient(520px 240px at 70% 70%, hsl(var(--sage)/0.50), transparent 60%)",
                    }}
                  />
                </div>
                <p className="text-base text-foreground/75" data-testid="text-modal-caption">
                  {active.caption}
                </p>
                <div className="rounded-2xl border border-border bg-[hsl(var(--cream)/0.6)] px-4 py-3 text-sm text-foreground/70" data-testid="text-modal-extra">
                  A tiny sparkle appears every time you scroll past this moment ✨
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
