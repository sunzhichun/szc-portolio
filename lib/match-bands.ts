import type { JobMatchOverallLevel } from "@/lib/types";

/** 综合分 → 等级（与 UI 胶囊一致；后端最终与大模型约定可对齐此表） */
const BANDS: ReadonlyArray<{ min: number; level: JobMatchOverallLevel }> = [
  { min: 90, level: "非常匹配" },
  { min: 75, level: "匹配" },
  { min: 60, level: "较匹配" },
  { min: 40, level: "一般" },
  { min: 0, level: "不匹配" },
];

export function overallScoreToLevel(score: number): JobMatchOverallLevel {
  const n = Math.round(Math.min(100, Math.max(0, score)));
  for (const { min, level } of BANDS) {
    if (n >= min) return level;
  }
  return "不匹配";
}
