"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { AboutContent, JobMatchRequestBody, JobMatchResponseBody, JobMatchResult } from "@/lib/types";
import { TypewriterText } from "@/components/TypewriterText";

interface HeroSectionProps {
  about: AboutContent;
}

function MatrixIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 16.5h14" strokeLinecap="round" />
      <rect x="4.5" y="9.5" width="2.8" height="5.5" rx="0.8" />
      <rect x="8.8" y="6.8" width="2.8" height="8.2" rx="0.8" />
      <rect x="13.1" y="4.6" width="2.8" height="10.4" rx="0.8" />
    </svg>
  );
}

function HighlightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m10 2.8 1.7 3.8 4.2.4-3.2 2.8 1 4-3.7-2.2-3.7 2.2 1-4L4.1 7l4.2-.4Z" />
    </svg>
  );
}

function SummaryIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3.5" width="12" height="13" rx="2.2" />
      <path d="M7 8h6M7 11h6M7 14h4" />
    </svg>
  );
}

function MatchSubmitArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-[1.1em] w-[1.1em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 10H16M11 4.5 16.5 10 11 15.5" />
    </svg>
  );
}

export function HeroSection({ about }: HeroSectionProps) {
  const [showContact, setShowContact] = useState(false);
  const [showMatchResult, setShowMatchResult] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [jdText, setJdText] = useState("");
  const wechat = useMemo(() => about.contact.wechatParts.join(""), [about.contact.wechatParts]);
  const email = useMemo(() => about.contact.emailParts.join(""), [about.contact.emailParts]);

  const handleMatch = async () => {
    const trimmedJd = jdText.trim();
    if (!trimmedJd) {
      setMatchError("请先粘贴 JD 内容，再开始匹配。");
      return;
    }

    setIsMatching(true);
    setMatchError(null);
    try {
      const requestBody: JobMatchRequestBody = { jdText: trimmedJd };
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const payload = (await response.json()) as JobMatchResponseBody;

      if (!response.ok || !payload.success) {
        setMatchError(payload.success ? "匹配失败，请稍后重试。" : payload.error.message);
        return;
      }

      setMatchResult(payload.data);
      setShowMatchResult(true);
    } catch {
      setMatchError("网络异常，请检查连接后重试。");
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section id="about" className="section-shell scroll-mt-28 md:pt-20">
      <div className="site-container">
        <div className="grid items-start gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="text-[2.65rem] font-bold leading-tight tracking-tight md:text-[4.5rem]">{about.greeting}</h1>
            <TypewriterText words={about.roles} />
            <p className="mt-7 max-w-2xl text-[0.95rem] leading-relaxed text-black/70 md:text-[1.25rem] md:leading-[1.55]">
              {about.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={`/resume/${about.resumeBaseName}.pdf`}
                download={about.resumeDownloadFileName}
                className="rounded-2xl border-2 border-black px-7 py-3.5 text-lg font-semibold transition hover:-translate-y-0.5"
              >
                下载简历
              </a>
              <button
                type="button"
                onClick={() => setShowContact(true)}
                className="rounded-2xl bg-mint px-7 py-3.5 text-lg font-semibold transition hover:-translate-y-0.5"
              >
                联系我
              </button>
            </div>
            <div className="mt-12 rounded-3xl border border-black/5 bg-white p-3 shadow-soft md:p-4">
              <p className="mb-2.5 text-sm font-semibold text-black/55">AI 岗位匹配器</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input
                  className="h-12 flex-1 rounded-2xl bg-surface px-4 text-sm outline-none ring-black/20 transition focus:ring"
                  placeholder={about.jdPlaceholder}
                  value={jdText}
                  onChange={(event) => setJdText(event.target.value)}
                  aria-label="粘贴职位描述"
                />
                <button
                  type="button"
                  onClick={handleMatch}
                  disabled={isMatching}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-7 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-black/50"
                >
                  {isMatching ? (
                    "匹配中..."
                  ) : (
                    <>
                      <span>开始匹配</span>
                      <MatchSubmitArrowIcon />
                    </>
                  )}
                </button>
              </div>
              {isMatching ? (
                <p className="mt-2 text-xs text-black/45" aria-live="polite">
                  请耐心等待10~20s
                </p>
              ) : null}
              {matchError ? <p className="mt-2 text-xs text-[#D9363E]">{matchError}</p> : null}
            </div>
          </div>
          <div className="mx-auto mt-2 aspect-square w-full max-w-xl md:mt-0 md:-translate-y-4">
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/hero-portrait.png"
                alt="孙致纯个人照片"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 92vw, 576px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showContact ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 p-4"
            onClick={() => setShowContact(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-soft"
              onClick={(event) => event.stopPropagation()}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="联系方式"
            >
              <h3 className="text-xl font-bold">联系我</h3>
              <div className="mt-4 space-y-2 text-black/75">
                <p>微信/电话：{wechat}</p>
                <p>邮箱：{email}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="mt-5 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {showMatchResult && matchResult ? (
          <motion.div
            className="fixed inset-0 z-[65] flex items-center justify-center bg-black/25 p-4"
            onClick={() => setShowMatchResult(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-panel w-full max-w-3xl rounded-3xl p-6 shadow-soft md:p-7"
              onClick={(event) => event.stopPropagation()}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="AI岗位匹配结果"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">综合等级</h3>
                    <span className="inline-flex h-9 items-center rounded-full bg-[#FDDDD2] px-3 text-sm font-semibold text-black/70 shadow-[0_6px_14px_rgba(0,0,0,0.14)]">
                      {matchResult.overallLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/80 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6">
                  <div className="md:flex md:w-44 md:shrink-0 md:flex-col md:min-h-0">
                    <p className="flex shrink-0 items-center gap-2 text-xl font-bold leading-tight text-[#338FEC] md:text-2xl">
                      <MatrixIcon />
                      匹配矩阵
                    </p>
                    <div className="mt-2 hidden min-h-0 flex-1 md:flex md:items-center md:justify-center">
                      <div className="inline-flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#FDDDD2] shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                        <div className="text-center">
                          <p className="text-xs font-semibold text-black/55">综合分</p>
                          <p className="mt-1 flex items-end justify-center gap-1 leading-none">
                            <span className="text-4xl font-black text-black/80">{matchResult.overallScore}</span>
                            <span className="mb-0.5 text-sm font-semibold text-black/55">/100</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {matchResult.matrix.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center gap-3">
                          <span className="w-16 shrink-0 text-sm font-semibold text-black/80">{item.label}</span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/8">
                            <div className="h-full rounded-full bg-[#8EC5FF]" style={{ width: `${item.score}%` }} />
                          </div>
                          <span className="w-9 shrink-0 text-right text-sm font-semibold text-black/55">{item.score}</span>
                        </div>
                        <p className="ml-[4.75rem] mt-1.5 text-xs text-black/45">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 md:hidden">
                  <div className="inline-flex h-28 w-28 items-center justify-center rounded-full bg-[#FDDDD2] shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-black/55">综合分</p>
                      <p className="mt-1 flex items-end justify-center gap-1 leading-none">
                        <span className="text-4xl font-black text-black/80">{matchResult.overallScore}</span>
                        <span className="mb-0.5 text-sm font-semibold text-black/55">/100</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-4">
                  <p className="flex items-center gap-2 text-base font-bold text-[#338FEC]">
                    <HighlightIcon />
                    匹配亮点
                  </p>
                  <div className="mt-3 space-y-3 text-sm text-black/72">
                    {matchResult.highlights.map((item) => (
                      <div key={item.jdRequirement}>
                        <p className="font-semibold">JD：{item.jdRequirement}</p>
                        <p className="mt-1 text-black/58">{item.resumeEvidence}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 p-4">
                  <p className="flex items-center gap-2 text-base font-bold text-[#338FEC]">
                    <SummaryIcon />
                    总结
                  </p>
                  <p className="mt-3 text-sm leading-7 text-black/72">{matchResult.summary}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowMatchResult(false)}
                  className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
