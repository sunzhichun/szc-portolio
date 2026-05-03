"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import type { ExperienceItem, ProjectDetail } from "@/lib/types";

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const catlMarketDetail = {
  titleZh: "分布式电驱产品市场策划",
  titleEn: "DISTRIBUTED E-DRIVE PRODUCT MARKET PLANNING",
  blocks: [
    {
      titleZh: "竞品洞察",
      titleEn: "Competitive benchmarking",
      tone: "from-[#DCEBFA] to-[#BFD8F4]",
      bullets: [
        "深度剖析10+主流竞品技术参数、产品方案",
        "提炼“大扭矩、高功率密度、高集成度、TV功能”4大卖点",
        "构建应用端场景优势",
      ],
    },
    {
      titleZh: "应用市场深度拆解",
      titleEn: "Market analysis",
      tone: "from-[#D5F6EE] to-[#A9EBD9]",
      bullets: [
        "基于2023-2025数据（50+车型，10万+销量）",
        "用户分层与需求聚类",
        "定义“五大车型 + 两大性能导向”赛道",
        "输出 B 端技术需求 & C 端传播卖点矩阵",
      ],
    },
    {
      titleZh: "产品规划",
      titleEn: "Product planning",
      tone: "from-[#FCE8D1] to-[#F8D9AF]",
      bullets: ["瞄准3大高潜力目标市场", "从性能、功能、成本设计产品谱", "制定3代产品迭代路线图", "推动方案评审与落地"],
    },
    {
      titleZh: "客户匹配",
      titleEn: "Client matching",
      tone: "from-[#E5E0FC] to-[#CFC8F5]",
      bullets: ["复盘50+历史客户需求与回复案例", "挖掘15+潜在合作机会", "制定4级目标客户优先级", "搭建“客户-需求-产品”匹配体系"],
    },
  ],
  results: [
    "搭建完整市场定位体系，明确3组产品形态与目标市场",
    "完成下一代迭代产品关键指标定义（性能+25%，成本-9%），推动项目立项进入研发",
    "推动2家高潜客户进入商业合作",
  ],
};

const catlPlatformDetail = {
  titleZh: "客户需求管理平台搭建",
  titleEn: "CLIENT DEMAND MANAGEMENT PLATFORM CONSTRUCTION",
  blocks: [
    {
      titleZh: "标准化流程与功能设计",
      titleEn: "Standardized flow & function design",
      tone: "from-[#DCEBFA] to-[#BFD8F4]",
      bullets: ["梳理从需求收集到方案发布的全链路流程", "链接5个流转节点，定义各节点关键字段与标准化管控SOP", "输出平台交互界面与功能定义"],
    },
    {
      titleZh: "功能体验迭代优化",
      titleEn: "Function experience iteration",
      tone: "from-[#D5F6EE] to-[#A9EBD9]",
      bullets: [
        "基于数据分析挖掘用户痛点",
        "通过多轮产品迭代，优化核心功能设计（如复用库、gap识别、版本追溯等），进一步提升平台易用性",
      ],
    },
    {
      titleZh: "AI自动化方案策划",
      titleEn: "AI-powered solution planning",
      tone: "from-[#FCE8D1] to-[#F8D9AF]",
      bullets: ["引入AI大模型-自动化方案制定工具", "打通“需求解析-规格匹配-成本核算”链条", "实现一键精准输出最具性价比方案"],
    },
    {
      titleZh: "多维度数据看板搭建",
      titleEn: "Multi-dimensional data dashboard",
      tone: "from-[#E5E0FC] to-[#CFC8F5]",
      bullets: ["基于30+需求数据，搭建多维看板", "分析车型性能与功能需求分布", "挖掘方案复用率，支撑数据决策"],
    },
  ],
  results: [
    "需求响应时效从平均1周压缩至3.5天，方案制定效率提升30%",
    "通过多轮功能优化与用户引导，平台核心模块真实使用率提升25%，问题工单量降低60%",
    "制定《需求管理平台操作手册》，推动团队适配线上流程，实现客户需求100%线上化管控",
  ],
};

const catlProcessDetail = {
  titleZh: "项目流程与工具标准化",
  titleEn: "ESTABLISHING A STANDARDIZED FRAMEWORK FOR PROJECT MANAGEMENT PROCESSES AND TOOLS",
  blocks: [
    {
      titleZh: "流程诊断与缺口分析",
      titleEn: "Process diagnosis & gap analysis",
      tone: "from-[#DCEBFA] to-[#BFD8F4]",
      bullets: [
        "基于4个在研项目，全面梳理现有项目流程，识别瓶颈",
        "流程对标PMP项目管理规范，技术对标 ASPICE L2 标准",
        "提炼关键缺口与改进机会",
      ],
    },
    {
      titleZh: "标准流程 SOP 制定与固化",
      titleEn: "Standard SOP development & solidification",
      tone: "from-[#D5F6EE] to-[#A9EBD9]",
      bullets: ["制定标准项目生命周期流程，串联5大过程组、6个项目管理模块", "固化各阶段交付物和控制点", "发布标准化 SOP 文档"],
    },
    {
      titleZh: "PM工具策划与迭代升级",
      titleEn: "PM tool introduction & iteration",
      tone: "from-[#FCE8D1] to-[#F8D9AF]",
      bullets: ["优化ALM 项目生命周期管理系统", "引入迭代 SVN 版本管控工具", "基于用户反馈策划 7 次功能上线，提升工具易用性及用户粘性"],
    },
    {
      titleZh: "AI 辅助需求溯源设计",
      titleEn: "AI-assisted requirement traceability design",
      tone: "from-[#E5E0FC] to-[#CFC8F5]",
      bullets: ["设计基于大语言模型的需求自动化溯源流程", "促进“一次性采纳率”提升 10%", "降低“人工修改率” 8%"],
    },
  ],
  results: [
    "项目管理平台核心用户活跃度提升50%，任务偏差率降至5%",
    "主导核心客户项目通过 ASPICE L2 认证，形成可复制体系在部门内推广，覆盖80%以上的研发项目",
    "建立3张项目自动监控报表，实现项目进度、质量、风险“一键查看”",
  ],
};

function highlightResultNumbers(text: string) {
  const numberPattern = /(\+?\-?\d+(?:\.\d+)?%|\d+(?:\.\d+)?\+?家|\d+(?:\.\d+)?\+?组|\d+(?:\.\d+)?\+?代|\b\d+(?:\.\d+)?\b)/g;
  const parts = text.split(numberPattern);
  const exactNumberPattern =
    /^(\+?\-?\d+(?:\.\d+)?%|\d+(?:\.\d+)?\+?家|\d+(?:\.\d+)?\+?组|\d+(?:\.\d+)?\+?代|\b\d+(?:\.\d+)?\b)$/;

  return parts.map((part, index) =>
    exactNumberPattern.test(part) ? (
      <span key={`${part}-${index}`} className="font-bold text-[#4F82D4]">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function UpRightArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function HighlightBulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="#020002"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.8 10.7c.8.7 1.3 1.7 1.5 2.7h4.6c.2-1 .7-2 1.5-2.7A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  return (
    <section id="experience" className="section-shell scroll-mt-24">
      <div className="site-container">
        <SectionTitle title="工作经历" />
        <div className="space-y-7">
          {experiences.map((experience) => (
            <article key={experience.id} className="card-shell rounded-3xl p-6 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold md:text-[2rem]">{experience.company}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#338FEC] md:text-base">{experience.role}</p>
                </div>
                <span className="mt-1 text-sm text-black/55">{experience.period}</span>
              </div>
              <p className="mt-5 leading-7 text-black/75">{experience.summary}</p>
              {experience.responsibilityGroups?.length ? (
                <div className="mt-5 space-y-3">
                  {experience.responsibilityGroups.map((group) => (
                    <div className="flex flex-wrap items-center gap-3" key={group.label}>
                      <span className="w-24 text-base font-normal text-black/80 md:w-28">{group.label}</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {group.items.map((item, itemIndex) => (
                          <span
                            key={item}
                            className={`inline-flex w-[168px] items-center justify-center rounded-full bg-blue px-3 py-1.5 text-center text-sm font-semibold text-black/75 ${
                              item === "客户需求管理" || item === "B端平台搭建"
                                ? "ml-5"
                                : itemIndex > 0
                                  ? "ml-2"
                                  : ""
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.responsibilities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-blue px-3 py-1.5 text-sm font-semibold text-black/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
              {experience.id !== "catl" ? (
                <div className="mt-8 w-full max-w-[980px]">
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC9B6]/45 px-2.5 py-1 text-sm leading-6 text-black md:whitespace-nowrap">
                    <span className="inline-flex h-7 w-7 items-center justify-center">
                      <HighlightBulbIcon />
                    </span>
                    <span className="font-semibold text-black">高光时刻：</span>
                    <span className="font-semibold text-black/75">{experience.highlight}</span>
                  </p>
                </div>
              ) : null}
              {experience.projects?.length ? (
                <div className="mt-8">
                  {experience.id === "catl" ? (
                    <div className="mb-5 flex items-center gap-4">
                      <span className="h-px flex-1 bg-black/12" />
                      <span className="text-sm font-semibold tracking-[0.08em] text-black/45">项目经历</span>
                      <span className="h-px flex-1 bg-black/12" />
                    </div>
                  ) : null}
                  <div className="grid gap-3 md:grid-cols-3">
                    {experience.projects.map((project) => (
                      <div
                        key={project.id}
                        className="overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_34px_rgba(0,0,0,0.14)]"
                      >
                        <div className="relative aspect-[16/9] w-full bg-surface">
                          {project.id === "catl-market" ? (
                            <Image
                              src="/images/catl-project-1.png"
                              alt="分布式电驱产品市场策划项目封面"
                              fill
                              className="object-cover"
                            />
                          ) : project.id === "catl-platform" ? (
                            <Image
                              src="/images/catl-project-2.png"
                              alt="需求管理平台搭建项目封面"
                              fill
                              className="object-cover"
                            />
                          ) : project.id === "catl-process" ? (
                            <Image
                              src="/images/catl-project-3.png"
                              alt="项目流程与工具标准化项目封面"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm font-medium text-black/35">
                              项目图片预留区
                            </div>
                          )}
                        </div>
                        <div className="flex min-h-[142px] flex-col p-4">
                          <p className="font-semibold leading-6">{project.title}</p>
                          <p className="mt-2 line-clamp-2 text-sm text-black/60">{project.summary}</p>
                          <button
                            type="button"
                            className="mt-auto inline-flex self-start pt-3 text-sm font-semibold text-black/85"
                            onClick={() => setActiveProject(project)}
                          >
                            <span>查看详情</span>
                            <span className="ml-1.5 mt-[1px]">
                              <UpRightArrowIcon />
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 p-4"
            onClick={() => setActiveProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`glass-panel w-full rounded-3xl p-6 shadow-soft md:p-7 ${
                activeProject.id === "catl-market" || activeProject.id === "catl-platform" || activeProject.id === "catl-process"
                  ? "max-w-6xl"
                  : "max-w-2xl"
              }`}
              onClick={(event) => event.stopPropagation()}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label={activeProject.title}
            >
              {activeProject.id === "catl-market" || activeProject.id === "catl-platform" || activeProject.id === "catl-process" ? (
                <div>
                  {(() => {
                    const detail =
                      activeProject.id === "catl-market"
                        ? catlMarketDetail
                        : activeProject.id === "catl-platform"
                          ? catlPlatformDetail
                          : catlProcessDetail;
                    return (
                      <>
                        <div className="rounded-2xl border border-black/10 bg-gradient-to-r from-[#eef5fc] to-[#f6f9ff] p-4 md:p-5">
                          <h4 className="text-3xl font-bold tracking-tight">{detail.titleZh}</h4>
                          <p className="mt-1 text-sm font-semibold text-black/70">{detail.titleEn}</p>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                          <div className="md:col-span-2 xl:col-span-4">
                            <h5 className="text-center text-3xl font-bold tracking-tight">核心职责</h5>
                            <p className="text-center text-sm font-semibold text-black/55">CORE RESPONSIBILITIES</p>
                          </div>
                          {detail.blocks.map((block) => (
                            <div key={block.titleZh} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                              <div className={`bg-gradient-to-r ${block.tone} px-3 py-2`}>
                                <p className="text-lg font-bold">{block.titleZh}</p>
                                <p className="text-xs font-semibold text-black/70">{block.titleEn}</p>
                              </div>
                              <div className="space-y-2 p-3">
                                {block.bullets.map((bullet) => (
                                  <p key={bullet} className="flex gap-2 text-xs leading-5 text-black/80">
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#78a8d8]" />
                                    <span>{bullet}</span>
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                          <h5 className="text-center text-3xl font-bold tracking-tight">核心成果</h5>
                          <p className="text-center text-sm font-semibold text-black/55">CORE RESULTS</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {detail.results.map((item, index) => (
                              <div
                                key={item}
                                className="flex items-center justify-center rounded-2xl bg-surface p-3 text-center text-sm font-semibold leading-6 text-black/80"
                              >
                                <span
                                  className={
                                    index === 1 ? "max-w-[280px]" : index === 0 || index === 2 ? "max-w-[250px]" : "max-w-[220px]"
                                  }
                                >
                                  {highlightResultNumbers(item)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <>
                  <h4 className="text-2xl font-bold">{activeProject.title}</h4>
                  <p className="mt-3 text-black/70">{activeProject.summary}</p>
                  <div className="mt-5 space-y-3 rounded-2xl bg-white/80 p-4">
                    <p>
                      <span className="font-semibold">S：</span>
                      {activeProject.star.situation}
                    </p>
                    <p>
                      <span className="font-semibold">T：</span>
                      {activeProject.star.task}
                    </p>
                    <p>
                      <span className="font-semibold">A：</span>
                      {activeProject.star.action}
                    </p>
                    <p>
                      <span className="font-semibold">R：</span>
                      {activeProject.star.result}
                    </p>
                  </div>
                </>
              )}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="mt-5 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
