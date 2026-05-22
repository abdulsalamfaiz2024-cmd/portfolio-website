// ── Portfolio Data Types ──────────────────────────────────────────────
// These interfaces define the contract between data files and UI components.
// All content is managed externally; components render from these shapes.

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  resumeUrl: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface HeroData {
  badge: string;
  headline: string;
  headlineAccent: string;
  headlineSuffix: string;
  subheadline: string;
  competencies: Competency[];
}

export interface Competency {
  icon: string;           // lucide icon name key
  label: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "corporate" | "humanitarian" | "consulting";
  summary: string;
  metrics: Metric[];
  tags: string[];         // e.g. "SAP ERP", "M&E", "ROM"
  image?: string;         // optional path to image
  imageAlt?: string;
}

export interface Metric {
  value: string;          // e.g. "70%", "150+", "$2M"
  label: string;          // e.g. "Efficiency Improvement"
}

export interface ProjectEntry {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  image?: string;         // path relative to public/
  objective: string;
  solution: string;
  impact: string;
  techStack: string[];
  metrics: Metric[];
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  issuerTier: "premium" | "standard";  // premium = IBM, CU Boulder etc.
  date: string;
  credentialUrl?: string;
  description: string;
  image?: string;         // path relative to public/
}

export interface SkillCategory {
  id: string;
  title: string;          // e.g. "Data Engineering", "Business Analytics", "AI Tools"
  skills: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  status: string;
  tags?: string[];
  image?: string;         // path relative to public/
}

export interface CredentialsData {
  certifications: CertificationEntry[];
  education: EducationEntry[];
  skillCategories: SkillCategory[];
}
