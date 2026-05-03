"use client";

import { useEffect, useMemo, useState } from "react";

interface TypewriterTextProps {
  words: string[];
}

export function TypewriterText({ words }: TypewriterTextProps) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const currentWord = safeWords[wordIndex % safeWords.length] ?? "";
  const colorMap: Record<string, string> = {
    "Product & Project Manager": "#A469DE",
    "AI Explorer": "#58E5AF",
    ESTJ: "#EF8550",
  };
  const activeColor = colorMap[currentWord] ?? "#6b7280";

  useEffect(() => {
    if (safeWords.length === 0) return;
    const currentWord = safeWords[wordIndex % safeWords.length];
    const doneTyping = text === currentWord && !isDeleting;
    const doneDeleting = text.length === 0 && isDeleting;

    const timeout = setTimeout(
      () => {
        if (doneTyping) {
          setIsDeleting(true);
          return;
        }
        if (doneDeleting) {
          setWordIndex((prev) => (prev + 1) % safeWords.length);
          setIsDeleting(false);
          return;
        }

        setText((prev) => {
          if (isDeleting) return currentWord.slice(0, Math.max(0, prev.length - 1));
          return currentWord.slice(0, prev.length + 1);
        });
      },
      doneTyping ? 1200 : isDeleting ? 45 : 90,
    );

    return () => clearTimeout(timeout);
  }, [isDeleting, safeWords, text, wordIndex]);

  return (
    <p className="mt-3 min-h-8 text-xl md:min-h-11 md:text-[2.1rem]" style={{ color: activeColor }}>
      {text}
      <span className="ml-1 animate-pulse">|</span>
    </p>
  );
}
