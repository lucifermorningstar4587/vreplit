import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

type Memory = {
  id: string;
  title: string;
  caption: string;
  category: "Us" | "Cute Moments" | "Silly Times";
};

const categories: Array<Memory["category"] | "All"> = ["All", "Us", "Cute Moments", "Silly Times"];

export default function GalleryPage() {
  const memories = useMemo<Memory[]>(
    () => [
      { id: "1", title: "That smile", caption: "I still replay it in my head.", category: "Us" },
      { id: "2", title: "Tiny dates", caption: "The small things felt huge with you.", category: "Cute Moments" },
      { id: "3", title: "Chaos twins", caption: "We\u2019re unserious together. Perfect.", category: "Silly Times" },
      { id: "4", title: "Soft evenings", caption: "Just you, me, and time slowing down.", category: "Us" },
      { id: "5", title: "Laugh attacks", caption: "My favorite kind of cardio.", category: "Silly Times" },
      { id: "6", title: "Little surprises", caption: "You make ordinary feel magical.", category: "Cute Moments" },
    ],
    [],
  );

  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<Memory | null>(null);

  const list = memories.filter((m) => filter === "All" || m.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <header className="soft-fade-in mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl" data-testid="text-gallery-title">
            Memory Gallery
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 sm:text-lg" data-testid="text-gallery-subtitle">
            Tap a memory to open it like a little movie.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" data-testid="group-gallery-filters">
          {categories.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                type="button"
                data-testid={`button-filter-${c.toString().toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setFilter(c)}
                className={
                  "valentine-ring rounded-full border px-4 py-2 text-sm font-semibold transition " +
                  (active
                    ? "border-[hsl(var(--sage)/0.55)] bg-[hsl(var(--sage)/0.18)] text-[hsl(var(--sage))]"
                    : "border-border bg-[hsl(var(--card)/0.6)] text-foreground/70 hover:bg-[hsl(var(--card)/0.85)]")
                }
              >
                {c === "Us" ? "Us 💚" : c === "Cute Moments" ? "Cute Moments 🌿" : c === "Silly Times" ? "Silly Times 😝" : "All"}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <motion.div
            key={m.id}
            className="valentine-card group relative overflow-hidden rounded-[26px]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            data-testid={`card-memory-${m.id}`}
          >
            <button
              type="button"
              onClick={() => setLightbox(m)}
              data-testid={`button-open-memory-${m.id}`}
              className="block w-full text-left"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <div
                  className="h-full w-full transition duration-500 group-hover:scale-[1.02]"
                  style={{
                    background:
                      "radial-gradient(460px 220px at 30% 25%, hsl(var(--blush)/0.55), transparent 60%), radial-gradient(460px 220px at 70% 75%, hsl(var(--sage)/0.52), transparent 60%), linear-gradient(180deg, hsl(var(--cream)/0.35), transparent)",
                  }}
                  data-testid={`img-memory-${m.id}`}
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-base font-semibold" data-testid={`text-memory-title-${m.id}`}>
                      {m.title}
                    </div>
                    <div className="text-sm text-foreground/65" data-testid={`text-memory-caption-${m.id}`}>
                      {m.caption}
                    </div>
                  </div>

                  <button
                    type="button"
                    data-testid={`button-like-memory-${m.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLiked((prev) => ({ ...prev, [m.id]: !prev[m.id] }));
                    }}
                    className={
                      "valentine-ring inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-[hsl(var(--card)/0.65)] backdrop-blur transition hover:bg-[hsl(var(--card)/0.85)]"
                    }
                    aria-label="Like"
                  >
                    <Heart
                      className={
                        "h-4.5 w-4.5 transition " +
                        (liked[m.id] ? "fill-[hsl(var(--rose))] text-[hsl(var(--rose))]" : "text-foreground/60")
                      }
                      strokeWidth={2.2}
                    />
                  </button>
                </div>

                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55" data-testid={`text-memory-category-${m.id}`}>
                  {m.category}
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            data-testid="modal-lightbox"
          >
            <motion.div
              className="valentine-card w-full max-w-3xl overflow-hidden rounded-[30px]"
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[16/9] w-full">
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(820px 380px at 30% 25%, hsl(var(--blush)/0.60), transparent 60%), radial-gradient(820px 380px at 70% 75%, hsl(var(--sage)/0.55), transparent 60%)",
                  }}
                  data-testid="img-lightbox"
                />
              </div>
              <div className="p-6">
                <div className="font-display text-4xl" data-testid="text-lightbox-title">
                  {lightbox.title}
                </div>
                <div className="mt-2 text-base text-foreground/75" data-testid="text-lightbox-caption">
                  {lightbox.caption}
                </div>
                <button
                  type="button"
                  data-testid="button-close-lightbox"
                  onClick={() => setLightbox(null)}
                  className="valentine-ring mt-5 inline-flex rounded-full border border-border bg-[hsl(var(--card)/0.7)] px-5 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-[hsl(var(--card)/0.9)]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
