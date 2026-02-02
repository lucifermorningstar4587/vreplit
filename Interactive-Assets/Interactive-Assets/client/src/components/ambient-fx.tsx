import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Particle = {
  id: string;
  kind: "heart" | "leaf";
  left: number; // vw
  size: number; // px
  delay: number; // s
  duration: number; // s
  opacity: number;
};

function Heart({ size }: { size: number }) {
  return (
    <svg
      data-testid="icon-heart"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 21s-7.2-4.56-9.6-9.12C.18 7.74 2.7 4.5 6.2 4.5c2.02 0 3.58 1.02 4.54 2.2C11.7 5.52 13.26 4.5 15.28 4.5c3.5 0 6.02 3.24 3.8 7.38C19.2 16.44 12 21 12 21Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Leaf({ size }: { size: number }) {
  return (
    <svg
      data-testid="icon-leaf"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20.3 3.7c-6.9-.6-12 1.7-15.2 5.3C1.7 12.4 2 17.9 2 19.8c0 .7.6 1.2 1.2 1.2 2 0 7.4-.3 10.8-3.1 3.6-3.1 5.9-8.3 5.3-15.2Z"
        fill="currentColor"
      />
      <path
        d="M7 17c2.3-4.3 6.9-7.8 11-9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity=".65"
      />
    </svg>
  );
}

export default function AmbientFX() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!media.matches);
    const onChange = () => setEnabled(!media.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const kind: Particle["kind"] = Math.random() > 0.55 ? "leaf" : "heart";
      list.push({
        id: `${kind}-${i}`,
        kind,
        left: Math.round(Math.random() * 1000) / 10,
        size: 10 + Math.round(Math.random() * 14),
        delay: Math.round(Math.random() * 60) / 10,
        duration: 14 + Math.round(Math.random() * 18),
        opacity: 0.22 + Math.random() * 0.25,
      });
    }
    return list;
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
      data-testid="fx-ambient"
    >
      {particles.map((p) => {
        const color =
          p.kind === "heart" ? "text-[hsl(var(--rose)/0.55)]" : "text-[hsl(var(--sage)/0.55)]";
        return (
          <motion.div
            key={p.id}
            className={`absolute -top-16 ${color}`}
            style={{ left: `${p.left}vw`, opacity: p.opacity }}
            initial={{ y: -40, rotate: -8, scale: 0.9 }}
            animate={{ y: [0, 1100], rotate: [-10, 8, -6], x: [0, 18, -10] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {p.kind === "heart" ? <Heart size={p.size} /> : <Leaf size={p.size} />}
          </motion.div>
        );
      })}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 20% 25%, hsl(var(--sage)/0.12), transparent 60%), radial-gradient(900px 420px at 80% 30%, hsl(var(--blush)/0.16), transparent 60%)",
        }}
      />
    </div>
  );
}
