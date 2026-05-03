# Sun Zhichun Portfolio

Personal portfolio website built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and Run

```bash
npm run build
npm run start
```

## Content Update Guide

Update content files only, no component changes needed:

- `content/about.json`
- `content/education.json`
- `content/experience.json`
- `content/skills.json`
- `content/ai-lab.json`

## Resume File Update

Put resume PDF under `public/resume/`.

Recommended filename base:

- `sunzhichun_resume.pdf`

If filename changes, update `resumeBaseName` in `content/about.json`.

## Placeholder Assets to Replace

- Project covers in `public/placeholders/`
- External links in `content/ai-lab.json`
- Screenshot placeholder copy in all `content/*.json`

## AI 岗位匹配（DashScope）

匹配接口 `POST /api/match` 调用阿里云百炼兼容 OpenAI 协议。环境变量：

| 变量 | 说明 |
| --- | --- |
| `DASHSCOPE_API_KEY` | 必填，百炼 API Key |
| `DASHSCOPE_MODEL` | **请固定为 `qwen3-max`**（本地、测试与线上均需一致）；未设置时代码默认亦为 `qwen3-max` |
| `DASHSCOPE_ENABLE_THINKING` | 建议 `false`，便于稳定返回纯 JSON |

本地可复制 `.env.local.example` 为 `.env.local` 后填写 Key。

## Alibaba Cloud Deployment Notes

This project runs in Node mode.

1. Install Node.js 20+ on the ECS instance.
2. Upload project files.
3. Run:
   - `npm install`
   - `npm run build`
   - `npm run start`
4. Use Nginx reverse proxy to map your domain to the app port (default 3000).
5. In the deployment console, set environment variables (at least `DASHSCOPE_API_KEY`, and `DASHSCOPE_MODEL=qwen3-max` for production).
