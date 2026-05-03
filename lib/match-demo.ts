import type { JobMatchResult } from "@/lib/types";
import { overallScoreToLevel } from "@/lib/match-bands";

/** 阶段 0 前端演示用 mock；接 DashScope 后由 /api/match 替换 */
const OVERALL_SCORE = 54;

export const JOB_MATCH_DEMO: JobMatchResult = {
  overallScore: OVERALL_SCORE,
  overallLevel: overallScoreToLevel(OVERALL_SCORE),
  matrix: [
    { id: "education", label: "学历", score: 72, reason: "学历背景与岗位门槛匹配度较好。" },
    {
      id: "experience",
      label: "工作经验",
      score: 58,
      reason: "有相关产品与项目经历，但岗位侧重点仅部分重合。",
    },
    {
      id: "skills",
      label: "技能特长",
      score: 49,
      reason: "核心技能部分匹配，部分工具或方法论覆盖不足。",
    },
    {
      id: "softSkills",
      label: "软技能",
      score: 64,
      reason: "协作推进与沟通表达有证据支撑，整体处于中上水平。",
    },
  ],
  highlights: [
    {
      jdRequirement: "负责需求梳理与跨团队协同推进",
      resumeEvidence: "具备 B 端产品策划与项目管理实践，参与流程搭建与跨部门协作。",
    },
    {
      jdRequirement: "具备数据分析意识并支持决策",
      resumeEvidence: "有 SQL/SPSS 相关能力与业务分析实践，具备基础分析与验证能力。",
    },
    {
      jdRequirement: "熟悉 AI 产品或 AI 应用场景",
      resumeEvidence: "有 AI 相关项目探索与产品化尝试，具备可迁移的应用经验。",
    },
  ],
  summary:
    "你具备较好的学历背景与跨团队协作经历，能够与岗位中对结构化思考和协同推进的要求形成稳定匹配；你有B端产品策划与项目管理实践，能够与岗位中的需求梳理、流程推进和结果交付形成基础匹配；你在数据分析与AI应用探索上有一定积累，能够与岗位中对分析意识和应用能力的要求形成中等匹配，整体属于可快速适配并持续增强的候选人类型。",
};
