import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sun Zhichun - Personal Portfolio",
  description: "孙致纯个人品牌网站",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-black focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          跳到主要内容
        </a>
        {children}
      </body>
    </html>
  );
}
