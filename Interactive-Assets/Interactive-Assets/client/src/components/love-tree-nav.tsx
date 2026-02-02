import { useLocation } from "wouter";
import { motion } from "framer-motion";

type LeafLink = {
  label: string;
  href: string;
  emoji: string;
  testId: string;
};

const links: LeafLink[] = [
  { label: "Home", href: "/", emoji: "🍃❤️", testId: "link-leaf-home" },
  { label: "Our Story", href: "/story", emoji: "🍃📖", testId: "link-leaf-story" },
  { label: "Gallery", href: "/gallery", emoji: "🍃🖼️", testId: "link-leaf-gallery" },
  { label: "Love Notes", href: "/notes", emoji: "🍃💌", testId: "link-leaf-notes" },
  { label: "Games", href: "/games", emoji: "🍃🎮", testId: "link-leaf-games" },
  { label: "Surprise", href: "/surprise", emoji: "🍃🎁", testId: "link-leaf-surprise" },
  { label: "Valentine", href: "/valentine", emoji: "🍃💍", testId: "link-leaf-valentine" },
];

export default function LoveTreeNav() {
  const [location, navigate] = useLocation();

  const active = (href: string) => (href === "/" ? location === "/" : location.startsWith(href));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-[max(env(safe-area-inset-bottom),0px)]">
      <div className="mx-auto w-full max-w-xl px-4 pb-4">
        <div className="valentine-card valentine-glow relative overflow-hidden rounded-[26px] px-3 py-3">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 240px at 50% 0%, hsl(var(--sage)/0.22), transparent 60%), radial-gradient(560px 200px at 20% 30%, hsl(var(--blush)/0.22), transparent 60%)",
            }}
          />

          <div className="relative flex items-center justify-between gap-2">
            <motion.button
              type="button"
              data-testid="button-tree-tooltip"
              onClick={() => {
                // a tiny, cute tooltip without extra libs
                const el = document.getElementById("love-tree-tip");
                if (!el) return;
                el.dataset.open = el.dataset.open === "true" ? "false" : "true";
                window.setTimeout(() => {
                  el.dataset.open = "false";
                }, 2200);
              }}
              className="valentine-ring group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-[hsl(var(--card)/0.6)] backdrop-blur transition hover:bg-[hsl(var(--card)/0.85)]"
              animate={{ rotate: [0, -1.3, 1.3, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xl" aria-hidden>
                🌳
              </span>
              <span className="sr-only">Love tree navigator</span>
              <div
                id="love-tree-tip"
                data-testid="tooltip-tree"
                data-open="false"
                className="pointer-events-none absolute -top-11 left-1/2 w-max -translate-x-1/2 rounded-full border border-border bg-[hsl(var(--card)/0.9)] px-3 py-1 text-xs text-foreground/80 shadow-sm backdrop-blur transition data-[open=false]:opacity-0 data-[open=false]:translate-y-1 data-[open=true]:opacity-100"
              >
                Pick a leaf, my love 🌿💖
              </div>
            </motion.button>

            <div className="flex flex-1 items-center justify-between gap-1">
              {links.map((l) => {
                const isActive = active(l.href);
                return (
                  <button
                    key={l.href}
                    type="button"
                    data-testid={l.testId}
                    onClick={() => navigate(l.href)}
                    className={
                      "valentine-ring group relative flex h-14 flex-1 flex-col items-center justify-center rounded-2xl border border-transparent px-1 text-center transition hover:bg-[hsl(var(--sage)/0.10)]"
                    }
                  >
                    <motion.span
                      aria-hidden
                      className={
                        isActive
                          ? "text-lg drop-shadow-[0_0_14px_hsl(var(--sage)/0.55)]"
                          : "text-lg"
                      }
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.03 }}
                      transition={{ duration: 0.45 }}
                    >
                      {l.emoji}
                    </motion.span>
                    <span
                      className={
                        isActive
                          ? "mt-1 text-[11px] font-semibold text-[hsl(var(--sage))]"
                          : "mt-1 text-[11px] font-medium text-foreground/60"
                      }
                      data-testid={`text-nav-${l.label.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {l.label}
                    </span>
                    {isActive && (
                      <motion.span
                        className="pointer-events-none absolute inset-x-2 bottom-1 h-1 rounded-full bg-[hsl(var(--sage)/0.5)]"
                        layoutId="leaf-active"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
