import { NextResponse } from "next/server";
import { JOB_MATCH_DEMO } from "@/lib/match-demo";
import { getMatchFromDashScope } from "@/lib/dashscope";
import type { JobMatchRequestBody, JobMatchResponseBody } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<JobMatchRequestBody>;
    const jdText = body.jdText?.trim();

    if (!jdText) {
      const errorBody: JobMatchResponseBody = {
        success: false,
        error: {
          code: "INVALID_INPUT",
          message: "jdText 不能为空",
        },
      };
      return NextResponse.json(errorBody, { status: 400 });
    }

    let data = JOB_MATCH_DEMO;
    try {
      data = await getMatchFromDashScope(jdText);
    } catch (error) {
      console.error("DashScope unavailable, fallback to mock:", error);
    }

    const successBody: JobMatchResponseBody = {
      success: true,
      data,
    };
    return NextResponse.json(successBody, { status: 200 });
  } catch {
    const errorBody: JobMatchResponseBody = {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "匹配服务暂时不可用，请稍后重试",
      },
    };
    return NextResponse.json(errorBody, { status: 500 });
  }
}
