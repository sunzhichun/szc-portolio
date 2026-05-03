import { AiLabSection } from "@/components/AiLabSection";
import { EducationSection } from "@/components/EducationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import aboutData from "@/content/about.json";
import aiLabData from "@/content/ai-lab.json";
import educationData from "@/content/education.json";
import experienceData from "@/content/experience.json";
import skillsData from "@/content/skills.json";
import type {
  AboutContent,
  AiLabContent,
  EducationContent,
  ExperienceItem,
  SkillCategory,
} from "@/lib/types";

const about = aboutData as AboutContent;
const education = educationData as EducationContent;
const experiences = experienceData as ExperienceItem[];
const skills = skillsData as SkillCategory[];
const aiLab = aiLabData as AiLabContent;

export default function Home() {
  return (
    <main id="main-content" className="bg-background text-text-primary" tabIndex={-1}>
      <Header />
      <HeroSection about={about} />
      <EducationSection content={education} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection skills={skills} />
      <AiLabSection content={aiLab} />
    </main>
  );
}
