 "use client";

import { SectionTitle } from "@/components/SectionTitle";
import type { PointerEvent } from "react";
import type { SkillCategory } from "@/lib/types";
import { toneClassMap } from "@/lib/ui";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

function SkillCategoryIcon({ id, tone }: { id: string; tone: "mint" | "orange" | "blue" }) {
  const iconBg = tone === "mint" ? "bg-[#95E5CC]" : tone === "blue" ? "bg-[#9ED4F5]" : "bg-[#F3B899]";
  const iconStroke = tone === "mint" ? "#2D8D70" : tone === "blue" ? "#2B6F9F" : "#A85F3E";

  return (
    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}>
      {id === "analysis" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={iconStroke} strokeWidth="2" strokeLinecap="round">
          <path d="M4 18h16" />
          <path d="M7 17V9" />
          <path d="M12 17V6" />
          <path d="M17 17v-4" />
        </svg>
      ) : id === "tools" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={iconStroke} strokeWidth="2" strokeLinecap="round">
          <circle cx="10" cy="10" r="5.5" />
          <path d="m14.5 14.5 4 4" />
          <path d="M8.5 8.5h.01" />
          <path d="M11.5 7.5h.01" />
          <path d="M12.5 10.5h.01" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="4.5" />
          <path d="M9 13.2V19l3-1.8L15 19v-5.8" />
        </svg>
      )}
    </span>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    const card = event.currentTarget;
    card.getAnimations().forEach((animation) => animation.cancel());
    card.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(1)" },
        { transform: "translate3d(0, -12px, 0) scale(1.02)" },
      ],
      {
        duration: 260,
        easing: "ease-out",
        fill: "forwards",
      },
    );
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    const card = event.currentTarget;
    card.getAnimations().forEach((animation) => animation.cancel());
    card.animate(
      [{ transform: "translate3d(0, -12px, 0) scale(1.02)" }, { transform: "translate3d(0, 0, 0) scale(1)" }],
      { duration: 180, easing: "ease-out", fill: "forwards" },
    );
  };

  return (
    <section id="skills" className="section-shell scroll-mt-24 bg-surface md:min-h-[760px] md:py-32">
      <div className="site-container">
        <SectionTitle title="技能特长" />
        <div className="mt-20 grid gap-5 md:mt-28 md:grid-cols-3 md:gap-7">
          {skills.map((category) => (
            <div
              key={category.id}
              className={`relative ${
                category.id === "analysis"
                  ? "md:mt-3 md:translate-x-12 md:-rotate-[5deg] md:z-0"
                  : category.id === "cert"
                    ? "md:-ml-5 md:mt-1 md:rotate-[5deg] md:z-0"
                    : "md:z-20 md:scale-[1.02]"
              }`}
            >
              <button
                type="button"
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                className={`skill-card-hover relative min-h-[240px] w-full rounded-3xl p-7 shadow-soft transition-shadow duration-300 md:min-h-[270px] md:p-8 ${
                  category.id === "cert" ? "bg-[#FDDDD2] text-text-primary" : toneClassMap[category.tone]
                } text-left`}
              >
                <div>
                  <SkillCategoryIcon id={category.id} tone={category.tone} />
                  <p className="mt-6 text-xl font-bold md:text-[1.4rem]">{category.title}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {category.items.map((item) => (
                      <span key={item} className="rounded-full bg-white/65 px-3.5 py-1.5 text-sm font-semibold">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
