"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "关于我" },
  { id: "education", label: "教育背景" },
  { id: "experience", label: "工作经历" },
  { id: "skills", label: "技能特长" },
  { id: "ai-lab", label: "学习与探索" },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [lockedTargetId, setLockedTargetId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMobileOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  useEffect(() => {
    const getCurrentSection = () => {
      if (lockedTargetId) {
        const target = document.getElementById(lockedTargetId);
        if (!target) return;
        const topGap = Math.abs(target.getBoundingClientRect().top - 120);
        if (topGap < 24) {
          setLockedTargetId(null);
        }
        return;
      }

      const activationLine = window.scrollY + 160;
      let currentId = navItems[0].id;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        if (section.offsetTop <= activationLine) {
          currentId = item.id;
        }
      }

      setActiveId(currentId);
    };

    getCurrentSection();
    window.addEventListener("scroll", getCurrentSection, { passive: true });
    window.addEventListener("resize", getCurrentSection);

    return () => {
      window.removeEventListener("scroll", getCurrentSection);
      window.removeEventListener("resize", getCurrentSection);
    };
  }, [lockedTargetId]);

  const navigateTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    setLockedTargetId(id);
    setMobileOpen(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const linkClass = (id: string) =>
    `rounded-full px-6 py-3 text-lg font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
      activeId === id ? "bg-black text-white" : "text-black/70 hover:bg-surface"
    }`;

  const mobileLinkClass = (id: string) =>
    `block rounded-2xl px-4 py-3.5 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
      activeId === id ? "bg-black text-white" : "text-black/80 hover:bg-surface"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 glass-panel">
      <div className="site-container flex h-28 items-center justify-between gap-3">
        <a
          href="#about"
          onClick={(event) => navigateTo(event, "about")}
          className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl outline-none ring-black/20 transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="回到关于我"
        >
          <Image
            src="/images/nav-avatar.png"
            alt=""
            fill
            className="object-contain mix-blend-multiply"
            priority
          />
        </a>
        <nav className="flex items-center gap-2" aria-label="页面分区导航">
          <ul className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(event) => navigateTo(event, item.id)} className={linkClass(item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-black shadow-sm transition hover:bg-surface md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">{mobileOpen ? "关闭导航" : "打开导航"}</span>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </div>
      {mobileOpen ? (
        <div id="mobile-nav-panel" className="max-h-[min(70vh,calc(100dvh-7rem))] overflow-y-auto border-t border-black/5 md:hidden">
          <ul className="site-container flex flex-col gap-1 py-3 pb-5">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(event) => navigateTo(event, item.id)} className={mobileLinkClass(item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
