import { Moon, Music2, Sun } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const MUSIC_SRC =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [night, setNight] = useState(false);

  const audio = useMemo(() => {
    const a = new Audio(MUSIC_SRC);
    a.loop = true;
    a.volume = 0.18;
    return a;
  }, []);

  useEffect(() => {
    audioRef.current = audio;
    return () => {
      try {
        audio.pause();
      } catch {
        // ignore
      }
    };
  }, [audio]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", night);
  }, [night]);

  const toggle = async () => {
    const next = !muted;
    setMuted(next);
    if (!audioRef.current) return;

    try {
      if (next) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch {
      setMuted(true);
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={() => setNight((s) => !s)}
        data-testid="button-toggle-night"
        className="valentine-ring group relative inline-flex h-11 items-center gap-2 rounded-full border border-border bg-[hsl(var(--card)/0.7)] px-4 shadow-sm backdrop-blur transition hover:bg-[hsl(var(--card)/0.85)]"
      >
        {night ? (
          <Moon className="h-4.5 w-4.5 text-[hsl(var(--gold))]" strokeWidth={2.2} />
        ) : (
          <Sun className="h-4.5 w-4.5 text-[hsl(var(--gold))]" strokeWidth={2.2} />
        )}
        <span className="text-sm font-medium text-foreground/80">Night</span>
      </button>

      <button
        type="button"
        onClick={toggle}
        data-testid="button-toggle-music"
        className="valentine-ring group relative inline-flex h-11 items-center gap-2 rounded-full border border-border bg-[hsl(var(--card)/0.7)] px-4 shadow-sm backdrop-blur transition hover:bg-[hsl(var(--card)/0.85)]"
      >
        <Music2
          className={`h-4.5 w-4.5 ${muted ? "text-foreground/55" : "text-[hsl(var(--sage))]"}`}
          strokeWidth={2.2}
        />
        <span className="text-sm font-medium text-foreground/80">{muted ? "Muted" : "Playing"}</span>
      </button>
    </div>
  );
}
