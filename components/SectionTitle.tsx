interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionTitle({ title, subtitle, align = "center" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mb-9 text-center md:mb-12" : "mb-7 md:mb-9"}>
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-sm text-black/60 md:text-base">{subtitle}</p> : null}
    </div>
  );
}
