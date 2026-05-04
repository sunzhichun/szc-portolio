import { overallScoreToLevel } from "@/lib/match-bands";
import type { JobMatchResult } from "@/lib/types";
import { buildMatchSystemPrompt, buildMatchUserPrompt } from "@/lib/match-prompt";

interface DashScopeMessage {
  role: "system" | "user";
  content: string;
}

interface DashScopeChoice {
  message?: {
    content?: string | null;
    /** 深度思考模型可能返回；若 content 为空可尝试从此处解析 JSON */
    reasoning_content?: string | null;
  };
}

interface DashScopeChatResponse {
  choices?: DashScopeChoice[];
}

/** 未设置时回退 qwen3.6-plus；与百炼控制台模型名一致 */
const DEFAULT_MODEL = process.env.DASHSCOPE_MODEL ?? "qwen3.6-plus";
const ENDPOINT = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

function envFlag(name: string, defaultValue: boolean): boolean {
  const v = process.env[name];
  if (v === undefined || v === "") return defaultValue;
  return v === "1" || v.toLowerCase() === "true" || v.toLowerCase() === "yes";
}

function parseJsonFromModelContent(content: string): JobMatchResult {
  const trimmed = content.trim();
  const unfenced = trimmed.startsWith("```")
    ? trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "")
    : trimmed;
  const parsed = JSON.parse(unfenced) as JobMatchResult;
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid JSON payload");
  }
  if (typeof parsed.overallScore !== "number" || !Number.isFinite(parsed.overallScore)) {
    throw new Error("Invalid overallScore");
  }
  if (!Array.isArray(parsed.matrix) || !Array.isArray(parsed.highlights) || typeof parsed.summary !== "string") {
    throw new Error("Invalid result shape");
  }
  return normalizeJobMatchResult(parsed);
}

/** 最终分数按四维加权重算，等级由分档表生成，避免模型分档漂移 */
function normalizeJobMatchResult(result: JobMatchResult): JobMatchResult {
  const byId = new Map(result.matrix.map((item) => [item.id, item.score] as const));
  const education = Number(byId.get("education") ?? 0);
  const experience = Number(byId.get("experience") ?? 0);
  const skills = Number(byId.get("skills") ?? 0);
  const softSkills = Number(byId.get("softSkills") ?? 0);
  const weighted = education * 0.1 + experience * 0.35 + skills * 0.3 + softSkills * 0.25;
  const overallScore = Math.round(Math.min(100, Math.max(0, weighted)));
  return {
    ...result,
    overallScore,
    overallLevel: overallScoreToLevel(overallScore),
  };
}

export async function getMatchFromDashScope(jdText: string): Promise<JobMatchResult> {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    throw new Error("DASHSCOPE_API_KEY is missing");
  }

  const messages: DashScopeMessage[] = [
    { role: "system", content: buildMatchSystemPrompt() },
    { role: "user", content: buildMatchUserPrompt(jdText) },
  ];

  /** 与官方 OpenAI 兼容 SDK 的 extra_body.enable_thinking 一致；默认关闭，利于纯 JSON 直连 content */
  const enableThinking = envFlag("DASHSCOPE_ENABLE_THINKING", false);

  const requestBody: Record<string, unknown> = {
    model: DEFAULT_MODEL,
    temperature: 0.2,
    messages,
    enable_thinking: enableThinking,
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DashScope request failed: ${response.status} ${text}`);
  }

  const payload = (await response.json()) as DashScopeChatResponse;
  const message = payload.choices?.[0]?.message;
  const content = message?.content?.trim() ?? "";
  const reasoning = message?.reasoning_content?.trim() ?? "";
  const textForJson = content || reasoning;
  if (!textForJson) {
    throw new Error("DashScope response missing message content");
  }

  return parseJsonFromModelContent(textForJson);
}
