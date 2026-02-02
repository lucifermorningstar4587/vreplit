import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Q = {
  id: string;
  q: string;
  a: string;
  options: string[];
};

export default function GamesPage() {
  const questions = useMemo<Q[]>(
    () => [
      { id: "color", q: "What\u2019s my comfort color?", a: "Sage green", options: ["Sage green", "Neon blue", "Jet black", "Tomato red"] },
      { id: "food", q: "My forever snack?", a: "Something sweet", options: ["Something spicy", "Something sweet", "Only salad", "Ice\u2011cold water"] },
      { id: "date", q: "Best kind of date with you?", a: "Anywhere, as long as it\u2019s us", options: ["Fancy only", "Anywhere, as long as it\u2019s us", "Strictly movies", "Never leaving bed"] },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const progress = Math.round(((idx + (picked ? 1 : 0)) / questions.length) * 100);

  const next = () => {
    if (!picked) return;
    const correct = picked === q.a;
    if (correct) setScore((s) => s + 1);
    setPicked(null);

    if (idx + 1 >= questions.length) {
      setDone(true);
      return;
    }

    setIdx((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <header className="soft-fade-in mb-8 space-y-3">
        <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl" data-testid="text-games-title">
          Fun & Games
        </h1>
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg" data-testid="text-games-subtitle">
          How well do you know me? (don\u2019t panic \u2014 I\u2019m cute about it)
        </p>
      </header>

      <div className="valentine-card rounded-[30px] p-6 sm:p-8" data-testid="card-quiz">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55" data-testid="text-quiz-kicker">
            question {Math.min(idx + 1, questions.length)} of {questions.length}
          </div>

          <div className="flex items-center gap-3" data-testid="meter-progress">
            <div className="h-2 w-44 overflow-hidden rounded-full bg-[hsl(var(--sage)/0.12)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--sage)/0.7)] to-[hsl(var(--rose)/0.7)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="text-sm font-semibold text-foreground/70" data-testid="text-progress">
              {progress}%
            </div>
          </div>
        </div>

        {!done ? (
          <div className="mt-7 space-y-5">
            <div className="text-2xl font-semibold" data-testid="text-question">
              {q.q}
            </div>

            <div className="grid gap-3">
              {q.options.map((opt) => {
                const chosen = picked === opt;
                const correct = chosen && opt === q.a;
                const wrong = chosen && opt !== q.a;
                return (
                  <motion.button
                    key={opt}
                    type="button"
                    data-testid={`button-option-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setPicked(opt)}
                    whileTap={{ scale: 0.99 }}
                    className={
                      "valentine-ring rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition " +
                      (correct
                        ? "border-[hsl(var(--sage)/0.65)] bg-[hsl(var(--sage)/0.18)]"
                        : wrong
                          ? "border-[hsl(var(--rose)/0.55)] bg-[hsl(var(--blush)/0.22)]"
                          : chosen
                            ? "border-[hsl(var(--sage)/0.40)] bg-[hsl(var(--card)/0.7)]"
                            : "border-border bg-[hsl(var(--card)/0.6)] hover:bg-[hsl(var(--card)/0.85)]")
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{opt}</span>
                      {correct ? <span aria-hidden>💚</span> : wrong ? <span aria-hidden>😝💢</span> : <span aria-hidden>🍃</span>}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.button
                type="button"
                data-testid="button-next-question"
                onClick={next}
                disabled={!picked}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="valentine-ring inline-flex items-center justify-center rounded-full bg-[hsl(var(--sage))] px-6 py-3 text-sm font-semibold text-[hsl(var(--cream))] shadow-lg shadow-[hsl(var(--sage)/0.25)] transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </motion.button>

              <div className="text-sm text-foreground/65" data-testid="text-quiz-reaction">
                {picked ? (picked === q.a ? "Correct! happy happy 💖" : "Wrong! but you\u2019re still cute 😝") : "Pick one…"}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-7 space-y-4" data-testid="panel-quiz-done">
            <div className="font-display text-4xl">Awww!</div>
            <div className="text-base text-foreground/75" data-testid="text-quiz-score">
              Score: {score} / {questions.length}
            </div>
            <button
              type="button"
              data-testid="button-retry-quiz"
              onClick={() => {
                setIdx(0);
                setScore(0);
                setPicked(null);
                setDone(false);
              }}
              className="valentine-ring inline-flex rounded-full border border-border bg-[hsl(var(--card)/0.7)] px-5 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-[hsl(var(--card)/0.9)]"
            >
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
