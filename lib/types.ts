export interface ContactInfo {
  wechatParts: string[];
  emailParts: string[];
}

export interface AboutContent {
  greeting: string;
  roles: string[];
  intro: string;
  resumeBaseName: string;
  /** 浏览器「另存为」时建议使用的文件名 */
  resumeDownloadFileName?: string;
  jdPlaceholder: string;
  contact: ContactInfo;
}

export interface EducationEntry {
  id: string;
  school: string;
  schoolBadges?: string[];
  period: string;
  degree: string;
  major: string;
  ranking: string;
  courses: string[];
  tags: Array<{
    label: string;
    tone: "mint" | "orange" | "blue";
  }>;
}

export interface EasterPage {
  id: string;
  title: string;
  theme: "mint" | "orange";
  content: string[];
}

export interface EducationContent {
  timeline: EducationEntry[];
  crossMajorPages: EasterPage[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  summary: string;
  star: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  responsibilities: string[];
  responsibilityGroups?: Array<{
    label: string;
    items: string[];
  }>;
  highlight: string;
  projects?: ProjectDetail[];
}

export interface SkillCategory {
  id: string;
  title: string;
  tone: "mint" | "orange" | "blue";
  items: string[];
}

export interface LabProject {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  cover: string;
  /** 宽幅详情展示图（可用横向滚动容器展示） */
  detailImage?: string;
  /** 标题下方补充说明（如 VPN 提示） */
  titleNote?: string;
}

export interface LearningNote {
  id: string;
  title: string;
  summary: string;
  stats: string;
  link: string;
}

export interface AiLabContent {
  projects: LabProject[];
  notes: LearningNote[];
}

/** 阶段 0：仅 JD 文本入参；产出等级/总分/四维矩阵/亮点/一段总结；不含 gap 建议；模型可 mock。 */
export type JobMatchOverallLevel =
  | "非常匹配"
  | "匹配"
  | "较匹配"
  | "一般"
  | "不匹配";

export interface JobMatchMatrixDimension {
  id: "education" | "experience" | "skills" | "softSkills";
  label: string;
  score: number;
  reason: string;
}

export interface JobMatchHighlight {
  jdRequirement: string;
  resumeEvidence: string;
}

export interface JobMatchResult {
  overallScore: number;
  overallLevel: JobMatchOverallLevel;
  matrix: JobMatchMatrixDimension[];
  highlights: JobMatchHighlight[];
  /** 单段连贯总结（语气由模型生成，不做死板句式约束） */
  summary: string;
}

/** POST /api/match 请求体（阶段 1+）；阶段 0 前端仅占位 */
export interface JobMatchRequestBody {
  jdText: string;
}

export interface JobMatchSuccessResponse {
  success: true;
  data: JobMatchResult;
}

export interface JobMatchErrorResponse {
  success: false;
  error: {
    code: "INVALID_INPUT" | "INTERNAL_ERROR";
    message: string;
  };
}

export type JobMatchResponseBody = JobMatchSuccessResponse | JobMatchErrorResponse;
