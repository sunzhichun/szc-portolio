"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import type { EducationContent } from "@/lib/types";

interface EducationSectionProps {
  content: EducationContent;
}

function DegreeIcon({ degree }: { degree: string }) {
  if (degree.includes("硕")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
        <path d="M7 11.7V15c0 .5.3.9.8 1.2 2.5 1.6 5.2 1.6 7.7 0 .5-.3.8-.8.8-1.2v-3.3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6.5a2 2 0 0 1 2-2h11.5a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.5Z" />
      <path d="M8 4.5v14" />
      <path d="M10.5 8h6" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${direction === "up" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FoldChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 text-black/55 transition ${expanded ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function BadgeLineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 shrink-0 text-black/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.5" r="4.5" />
      <path d="M9.4 12.2 8 19.5l4-2.3 4 2.3-1.4-7.3" />
    </svg>
  );
}

function EggTitleIcon({ theme }: { theme: "orange" | "mint" }) {
  if (theme === "mint") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-mint/55 text-[0.8rem] font-bold text-[#2f8f73]">
        ✓
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FFC9B6]/55 text-[#c46e52]">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="10.5" cy="10.5" r="4.5" />
        <path d="m14 14 4 4" />
      </svg>
    </span>
  );
}

export function EducationSection({ content }: EducationSectionProps) {
  const [eduIndex, setEduIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [eggExpanded, setEggExpanded] = useState(false);
  const currentEdu = content.timeline[eduIndex];
  const currentPage = content.crossMajorPages[pageIndex];
  const whyIndex = content.crossMajorPages.findIndex((page) => page.id === "why");
  const whatIndex = content.crossMajorPages.findIndex((page) => page.id === "what");

  const pageToneClass = useMemo(
    () =>
      currentPage.theme === "orange"
        ? "from-[#FFC9B6]/90 to-[#FFC9B6]/40"
        : "from-mint/70 to-mint/25",
    [currentPage.theme],
  );
  const isMaster = currentEdu.degree.includes("硕");
  const eduAccentClass = isMaster ? "bg-mint" : "bg-[#FFC9B6]";
  const eduAccentSoftClass = isMaster ? "bg-mint/40" : "bg-[#FFC9B6]/40";

  return (
    <section id="education" className="section-shell scroll-mt-24 bg-surface">
      <div className="site-container">
        <SectionTitle title="教育背景" />
        <div className="space-y-6 md:mx-auto md:max-w-[980px]">
          <div className="grid gap-6 md:grid-cols-[112px_1fr] md:gap-7">
            <div className="relative hidden h-full items-center justify-end md:-ml-[120px] md:flex">
              <div className="relative flex h-full w-20 flex-col items-center justify-center gap-7 py-4">
              <button
                type="button"
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/12 bg-white text-black/75 shadow-[0_4px_10px_rgb(0,0,0,0.08)] transition hover:scale-[1.03]"
                onClick={() => setEduIndex((prev) => (prev - 1 + content.timeline.length) % content.timeline.length)}
                aria-label="上一条教育经历"
              >
                <ChevronIcon direction="up" />
              </button>
              {content.timeline.map((item, index) => (
                <div key={item.id} className="my-1.5 flex items-center gap-2.5">
                  <span
                    className={`w-10 text-right text-base font-bold ${
                      index === eduIndex ? "text-black" : "text-black/50"
                    }`}
                  >
                    {item.degree}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEduIndex(index)}
                    className={`relative z-10 rounded-full transition ${
                      index === eduIndex
                        ? `${item.degree.includes("硕") ? "h-12 w-12 bg-mint" : "h-12 w-12 bg-[#FFC9B6]"} shadow-[0_8px_18px_rgb(0,0,0,0.12)]`
                        : "h-10 w-10 bg-white text-black/45 shadow-[0_4px_10px_rgb(0,0,0,0.06)]"
                    }`}
                    aria-label={`切换到${item.degree}`}
                  >
                    <span className="flex h-full w-full items-center justify-center">
                      <DegreeIcon degree={item.degree} />
                    </span>
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/12 bg-white text-black/75 shadow-[0_4px_10px_rgb(0,0,0,0.08)] transition hover:scale-[1.03]"
                onClick={() => setEduIndex((prev) => (prev + 1) % content.timeline.length)}
                aria-label="下一条教育经历"
              >
                <ChevronIcon direction="down" />
              </button>
            </div>
            </div>
            <motion.article
              key={currentEdu.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-shell min-h-[340px] rounded-3xl p-7 md:min-h-[380px] md:p-10"
            >
              <div className={`mb-8 h-1.5 w-11 rounded-full ${eduAccentClass}`} />
              <div className="pt-3 md:pt-4">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-2xl font-bold md:text-[2rem]">{currentEdu.school}</h3>
                    {currentEdu.schoolBadges?.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-black/8 px-2.5 py-0.5 text-xs font-semibold text-black/45"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${eduAccentSoftClass}`}>{currentEdu.period}</span>
              </div>
              <div
                className={`mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-black/70 ${eduAccentSoftClass}`}
              >
                <BadgeLineIcon />
                <span>
                  {currentEdu.major} / {currentEdu.ranking}
                </span>
              </div>
              <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-black/65">
                {currentEdu.courses.map((course) => (
                  <li key={course} className="flex items-center gap-2 text-sm md:text-base">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/35" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3.5">
                {currentEdu.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold shadow-[0_3px_10px_rgb(0,0,0,0.05)] ${
                      tag.tone === "orange" ? "bg-[#FFC9B6] text-text-primary" : "bg-mint text-text-primary"
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              </div>
            </motion.article>
          </div>

          <div className="my-8 flex items-center justify-center gap-4 md:my-10">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ED9D82]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#CFF3E7]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0F2FC]" />
            </div>
            <button
              type="button"
              onClick={() => setEggExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black/75 shadow-soft transition hover:bg-black/5"
              aria-expanded={eggExpanded}
              aria-controls="cross-major-card"
            >
              <span>关于跨专业</span>
              <FoldChevron expanded={eggExpanded} />
            </button>
          </div>

          <div className="mt-10 md:ml-6 md:mt-12">
            {eggExpanded ? (
              <article id="cross-major-card" className="card-shell overflow-hidden rounded-3xl border border-[#f2e5df]">
            <div className={`h-2 bg-gradient-to-r ${pageToneClass}`} />
            <div className="p-5 md:p-6">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-lg font-bold md:text-[1.35rem]">
                  <EggTitleIcon theme={currentPage.theme} />
                  <span>{currentPage.title}</span>
                </h4>
                <span className="text-xs text-black/45 md:text-sm">
                  {pageIndex + 1} / {content.crossMajorPages.length}
                </span>
              </div>
              <motion.div
                key={currentPage.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="pl-8"
              >
                {currentPage.content.map((item) => (
                  <p className="mb-2 leading-6 text-[0.82rem] text-black/70 md:whitespace-nowrap md:text-[0.88rem]" key={item}>
                    {item.includes("：") ? (
                      <>
                        <strong>{item.split("：")[0]}：</strong>
                        {item.split("：").slice(1).join("：")}
                      </>
                    ) : (
                      item
                    )}
                  </p>
                ))}
              </motion.div>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center border-t border-black/5 px-5 py-3.5 md:px-6">
              <button
                type="button"
                onClick={() => setPageIndex(whyIndex >= 0 ? whyIndex : 0)}
                className={`justify-self-start text-sm font-semibold transition ${
                  pageIndex === 0 ? "text-black/35" : "text-black/70"
                } hover:text-black/80`}
              >
                ‹ 为什么？
              </button>
              <div className="flex items-center justify-center gap-2">
                {content.crossMajorPages.map((page, index) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setPageIndex(index)}
                    className={`h-2.5 w-8 rounded-full ${
                      index === pageIndex ? (page.theme === "orange" ? "bg-orange" : "bg-mint") : "bg-black/10"
                    }`}
                    aria-label={`切换到${page.title}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setPageIndex(whatIndex >= 0 ? whatIndex : Math.min(1, content.crossMajorPages.length - 1))
                }
                className={`justify-self-end text-sm font-semibold transition ${
                  pageIndex === 1 ? "text-black/35" : "text-black/80"
                } hover:text-black`}
              >
                我做了什么？ ›
              </button>
            </div>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
