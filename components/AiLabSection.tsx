"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import type { AiLabContent } from "@/lib/types";

interface AiLabSectionProps {
  content: AiLabContent;
}

function ViewLargeImageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-black" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth={2.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="
          M17.25 7.25 7.75 17.75
          M17.25 7.25 17.25 10.95
          M17.25 7.25 13.95 7.25
          M7.75 17.75 11.05 17.75
          M7.75 17.75 7.75 13.95
        "
      />
    </svg>
  );
}

export function AiLabSection({ content }: AiLabSectionProps) {
  const [activeProjectId, setActiveProjectId] = useState(content.projects[0]?.id ?? "");
  const activeProject = content.projects.find((project) => project.id === activeProjectId) ?? content.projects[0];
  const [detailLightbox, setDetailLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!detailLightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [detailLightbox]);

  const notePlaceholders = [
    {
      id: "mock-note-1",
      tone: "bg-[#E8F4EF] border-[#CDE8DC]",
      title: "文科生还愿贴｜终于vibe coding出第一个App",
      excerpt:
        "其实生活里有很多小灵感，但从没接触过代码，总觉得遗憾。直到vibe coding出现：历时3周，从0到熟练用Cursor实现，终于看到MVP落地。",
      likes: 1755,
      collections: 1810,
      comments: 81,
      link: "https://www.xiaohongshu.com/discovery/item/69cfada6000000002102ffb2?source=webshare&xhsshare=pc_web&xsec_token=ABeUnWTDSxsYEkxyzqKg5bkf8rAO4nxmAj6wbnqeVoLy4=&xsec_source=pc_share",
    },
    {
      id: "mock-note-2",
      tone: "bg-[#EEF3F8] border-[#D8E4F2]",
      title: "总结了一套从0-1做产品的vibe coding工作流",
      excerpt: "👆🏻👆🏻如题，全干货，0代码基础也能直接抄！！\n\n💡这是vibe coding了两个项目后，逐渐找到的一套高效搭建产品的办法，此刻通通拿出来分享。",
      likes: 1056,
      collections: 1571,
      comments: 23,
      link: "https://www.xiaohongshu.com/discovery/item/69e32369000000001a027ad9?source=webshare&xhsshare=pc_web&xsec_token=ABIkda8NnGNfuHPL_N-P_kI-bETnbrcqFUp6KGrIRqLkE=&xsec_source=pc_share",
    },
    {
      id: "mock-note-3",
      tone: "bg-[#FBEFE7] border-[#F3DDCD]",
      title: "经验贴｜要是我vibe coding前知道这些就好了",
      excerpt:
        "个人经验如上☝️ 额外说明几点： 1️⃣最开始我其实是用的是Replit，但感觉它的开发过程比较黑盒，于是转向Cursor。",
      likes: 483,
      collections: 638,
      comments: 16,
      link: "https://www.xiaohongshu.com/discovery/item/69d3191c000000001a024738?source=webshare&xhsshare=pc_web&xsec_token=ABZwHCg1aAH0emjPuzxKfC2vIuNUWqxZ1BQesCcUSeD1I=&xsec_source=pc_share",
    },
  ];

  return (
    <section id="ai-lab" className="section-shell scroll-mt-24">
      <div className="site-container">
        <SectionTitle title="学习与探索" />
        <div className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-2 lg:gap-10">
          <article>
            <h3 className="mb-10 flex items-center gap-3 text-2xl font-bold md:text-3xl">
              <span className="h-7 w-2 flex-none rounded-full bg-[#CFF3E7]" />
              Vibe Coding 作品
            </h3>
            {activeProject ? (
              <div className="card-shell mx-auto max-w-lg overflow-hidden rounded-2xl lg:mx-0">
                {activeProject.detailImage ? (
                  <div className="relative w-full bg-surface">
                    <div className="relative w-full overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:thin]">
                      <div className="flex min-w-full justify-center">
                        <div className="inline-flex h-48 min-h-[12rem] items-stretch md:h-[14rem]">
                          <Image
                            src={activeProject.detailImage}
                            alt={`${activeProject.name} 作品详情`}
                            width={3200}
                            height={1200}
                            className="h-full w-auto max-w-none object-contain object-center"
                            sizes="(max-width:1024px) 100vw, 600px"
                            priority
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDetailLightbox({
                          src: activeProject.detailImage!,
                          alt: `${activeProject.name} 作品详情大图`,
                        })
                      }
                      className="absolute right-2 top-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white/70 text-black shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition hover:bg-white/[0.82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      title="查看大图"
                      aria-label={`在弹窗中查看 ${activeProject.name} 详情大图`}
                    >
                      <ViewLargeImageIcon />
                    </button>
                  </div>
                ) : (
                  <div className="relative h-48 w-full md:h-[14rem]">
                    <Image src={activeProject.cover} alt={activeProject.name} fill className="object-cover" sizes="100vw" />
                  </div>
                )}
                <div className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg font-bold md:text-xl">{activeProject.name}</h4>
                      {activeProject.titleNote ? (
                        <p className="mt-1 text-xs font-medium text-[#338FEC]">{activeProject.titleNote}</p>
                      ) : null}
                    </div>
                    <a
                      href={activeProject.link}
                      className="shrink-0 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white"
                    >
                      打开
                    </a>
                  </div>
                  <p className="mt-2.5 text-sm leading-6 text-black/70 md:text-[0.9375rem] md:leading-7">{activeProject.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-mint px-3 py-1 text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="mx-auto mt-4 w-full max-w-lg space-y-3.5 lg:mx-0">
              {content.projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProjectId(project.id)}
                  className={`group card-shell flex w-full items-center gap-3 rounded-2xl border border-transparent p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-black/15 hover:shadow-[0_16px_34px_rgba(0,0,0,0.12)] ${
                    project.id === activeProjectId ? "ring-2 ring-black/10 border-black/10" : ""
                  }`}
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-surface">
                    <Image
                      src={project.cover}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="font-semibold transition-colors duration-300 group-hover:text-black">{project.name}</p>
                    <p className="text-sm text-black/60">{project.tags.join(" · ")}</p>
                  </div>
                </button>
              ))}
            </div>
          </article>

          <article>
            <h3 className="mb-10 flex items-center gap-3 text-2xl font-bold md:text-3xl">
              <span className="h-7 w-2 flex-none rounded-full bg-[#FDDDD2]" />
              学习与沉淀
            </h3>
            <div className="mx-auto flex h-[45rem] w-full max-w-[21rem] flex-col overflow-hidden rounded-[3rem] border-[10px] border-black bg-white p-4 shadow-soft">
              <div className="mx-auto mb-4 h-7 w-28 shrink-0 rounded-full bg-black" />
              <div className="mx-1 mb-3 flex items-center justify-between">
                <p className="text-[2rem] font-black leading-none text-[#FF2442]">小红书</p>
              </div>
              <div className="-mx-4 bg-[#FFF8F8] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image src="/images/xhs-avatar.png" alt="小红书头像占位" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-lg font-bold leading-6">tinyCube</p>
                    <p className="mt-1 text-sm text-black/45">小红书号：439793053</p>
                  </div>
                </div>
              </div>
              <div className="no-scrollbar mt-2 min-h-0 space-y-3 overflow-y-auto pr-1">
                {notePlaceholders.map((note, index) => (
                  <div key={note.id} className={`rounded-2xl border p-3.5 ${note.tone}`}>
                    <div className="flex gap-2">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-lg">📝</div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-lg font-bold leading-7">{note.title}</p>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-black/52">
                          {note.excerpt}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-black/42">
                          <span className="inline-flex items-center gap-1">
                            <span aria-hidden="true">♡</span>
                            <span>{note.likes || "—"}</span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <span aria-hidden="true">☆</span>
                            <span>{note.collections || "—"}</span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <span aria-hidden="true">💬</span>
                            <span>{note.comments || "—"}</span>
                          </span>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <a
                            href={note.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-semibold text-[#FF5A6F] hover:underline"
                          >
                            查看全文
                            <svg
                              viewBox="0 0 16 16"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M6 12 L12 6" />
                              <path d="M10 6 H12 V8" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pb-1 pt-1">
                  <a
                    href="https://xhslink.com/m/busnoDCYIB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 text-sm font-semibold text-black/60 transition-colors hover:text-black focus-visible:text-black active:text-black"
                  >
                    查看更多
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 12 L12 6" />
                      <path d="M10 6 H12 V8" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm leading-6 text-black/45">
              记录 AI 工具探索、产品思考与学习成长历程
            </p>
          </article>
        </div>
      </div>

      {detailLightbox ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="作品详情大图"
          onClick={() => setDetailLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="关闭大图"
            onClick={() => setDetailLightbox(null)}
          >
            关闭
          </button>
          <div
            className="max-h-[90vh] max-w-[min(96vw,1400px)] overflow-auto rounded-lg bg-white/5 p-1"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={detailLightbox.src}
              alt={detailLightbox.alt}
              width={3200}
              height={1200}
              className="h-auto max-h-[88vh] w-auto max-w-[min(94vw,1380px)] object-contain"
              sizes="(max-width: 1400px) 96vw, 1400px"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
