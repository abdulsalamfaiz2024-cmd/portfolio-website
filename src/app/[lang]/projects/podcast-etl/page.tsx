"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  AudioLines,
  MessageSquareText,
  Sparkles,
  Clapperboard,
  Archive,
  SplitSquareHorizontal,
  Cpu,
  Cloud,
  Shield,
  Zap,
  DollarSign,
  Search,
  HardDrive,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ── Content ────────────────────────────────────────────────────────── */
const content = {
  en: {
    back: "Back to Projects",
    title: "Podcast AI-ETL Pipeline",
    subtitle: "Automated NLP Pipeline for Digital Production & Intelligent Archiving",
    metrics: [
      { value: "80%+", label: "Processing time saved" },
      { value: "Hybrid AI", label: "Local + Cloud inference" },
      { value: "10-min", label: "Smart chunking blocks" },
    ],
    tocTitle: "On this page",
    tocSections: [
      { id: "overview", label: "Overview" },
      { id: "value", label: "Value Proposition" },
      { id: "architecture", label: "Hybrid AI Architecture" },
      { id: "workflow", label: "Automation Workflow" },
    ],
    tags: ["AI Automation", "NLP", "Audio Processing", "ETL", "Python"],
    overviewTitle: "Project Overview",
    overviewText: "Developed for the \"Third Sector Podcast\" (NGOs Yemen), this project addresses the bottleneck of manual transcription for long-form video content. I engineered a custom \"Digital Production Pipeline\" (ETL) that automates the ingestion of large video files, converting hours of footage into precise, searchable, and timestamped text to streamline post-production and social media marketing.",
    dashboardCaption: "Dashboard interface — English & Arabic (RTL) versions",
    valueTitle: "Value Proposition & Key Features",
    valueSubtitle: "Three capabilities that transform the podcast production workflow.",
    features: [
      {
        icon: Clapperboard,
        title: "Smart Content Creation",
        subtitle: "Reels & Shorts Optimization",
        desc: "Generates transcripts with high-precision timestamps and speaker identification. Empowers editing teams to instantly locate \"golden moments\" for promotional clips without manual review.",
        benefitIcon: Clock,
        benefitText: "Drastically reduces turnaround time for short-form content",
        colorClass: "bg-violet-50 border-violet-100",
        iconColor: "text-violet-500",
        subColor: "text-violet-500"
      },
      {
        icon: Archive,
        title: "Cost-Effective Text-Based Archiving",
        desc: "Enables indexing and retrieval of specific quotes or topics via .TXT / .DOCX formats. Replaces reliance on raw video storage with a searchable text-based database.",
        benefits: [
          { icon: DollarSign, text: "Significant storage cost savings" },
          { icon: Search, text: "Full-text searchable archive" }
        ],
        colorClass: "bg-emerald-50 border-emerald-100",
        iconColor: "text-emerald-500"
      },
      {
        icon: SplitSquareHorizontal,
        title: "Optimized Large-Scale Processing",
        desc: "Implements a \"Smart Chunking\" algorithm that segments massive files into 10-minute blocks, preventing memory overloads and ensuring 100% data integrity during long-form episodes.",
        benefits: [
          { icon: HardDrive, text: "Zero memory overflows" },
          { icon: CheckCircle2, text: "100% data integrity" }
        ],
        colorClass: "bg-amber-50 border-amber-100",
        iconColor: "text-amber-500"
      }
    ],
    archTitle: "Technical Architecture",
    archSubtitle: "The Hybrid AI Approach — balancing privacy, speed, and cost with a dual-layer inference strategy.",
    localEngine: {
      title: "Local Inference Engine",
      desc: "Powered by OpenAI Whisper (Faster-Whisper) running locally for raw transcription — eliminating cloud costs and ensuring data privacy.",
      tags: [{ icon: Shield, text: "Privacy-first" }, { icon: Zap, text: "Zero cloud cost" }]
    },
    cloudEngine: {
      title: "Cloud Refinement Layer",
      desc: "Google Gemini 1.5 Pro API acts as an intelligent editor — correcting grammar and distinguishing between \"Host\" and \"Guest\" dialogue.",
      tags: [{ icon: Sparkles, text: "Context-aware" }, { icon: MessageSquareText, text: "Speaker ID" }]
    },
    coreStackTitle: "Core Stack",
    coreStackTags: ["Python", "FFmpeg", "Faster-Whisper", "Gemini 1.5 Pro", "PCM 16kHz"],
    workflowTitle: "The Automation Workflow",
    workflowSubtitle: "A 4-step pipeline from raw video to polished, searchable transcript.",
    workflowSteps: [
      { step: 1, icon: Upload, title: "Ingestion", detail: "Accepts raw video files (MP4 / MOV) via drag-and-drop upload.", color: "bg-blue-50 border-blue-100 text-blue-500" },
      { step: 2, icon: AudioLines, title: "Optimization", detail: "Isolates and optimizes audio tracks via FFmpeg (PCM 16 kHz).", color: "bg-amber-50 border-amber-100 text-amber-500" },
      { step: 3, icon: MessageSquareText, title: "Transcription", detail: "Local Whisper AI converts audio chunks to timestamped text.", color: "bg-violet-50 border-violet-100 text-violet-500" },
      { step: 4, icon: Sparkles, title: "AI Polishing", detail: "Cloud Gemini merges, formats, and refines the final transcript.", color: "bg-emerald-50 border-emerald-100 text-emerald-500" },
    ],
    ctaTitle: "Interested in learning more?",
    ctaDesc: "Get in touch to discuss this project or explore collaboration.",
    ctaContact: "Contact Me",
    ctaAll: "View All Projects",
    stepText: "STEP"
  },
  ar: {
    back: "العودة للمشاريع",
    title: "مسار الذكاء الاصطناعي للبودكاست",
    subtitle: "مسار معالجة لغات طبيعية مؤتمت للإنتاج الرقمي والأرشفة الذكية",
    metrics: [
      { value: "80%+", label: "توفير في وقت المعالجة" },
      { value: "هجين", label: "معالجة محلية وسحابية" },
      { value: "10-min", label: "تجزئة ذكية للملفات" },
    ],
    tocTitle: "في هذه الصفحة",
    tocSections: [
      { id: "overview", label: "نظرة عامة" },
      { id: "value", label: "القيمة المضافة" },
      { id: "architecture", label: "البنية التحتية" },
      { id: "workflow", label: "سير عمل الأتمتة" },
    ],
    tags: ["أتمتة الذكاء الاصطناعي", "معالجة اللغات الطبيعية", "معالجة الصوت", "ETL", "بايثون"],
    overviewTitle: "نظرة عامة على المشروع",
    overviewText: "تم تطوير هذا المشروع لصالح \"بودكاست القطاع الثالث\" (المنظمات غير الحكومية في اليمن) لمعالجة مشكلة النسخ اليدوي البطيء لمحتوى الفيديو الطويل. قمت بهندسة \"مسار إنتاج رقمي\" (ETL) مخصص يقوم بأتمتة استيعاب ملفات الفيديو الكبيرة، وتحويل ساعات من اللقطات إلى نص دقيق وقابل للبحث ومزود بطوابع زمنية لتسهيل عمليات المونتاج والتسويق عبر وسائل التواصل الاجتماعي.",
    dashboardCaption: "واجهة لوحة التحكم — النسختين الإنجليزية والعربية",
    valueTitle: "القيمة المضافة والميزات الرئيسية",
    valueSubtitle: "ثلاث قدرات تُحدث تحولاً جذرياً في سير عمل إنتاج البودكاست.",
    features: [
      {
        icon: Clapperboard,
        title: "إنشاء محتوى ذكي",
        subtitle: "تحسين إنتاج مقاطع الريلز والشورتس",
        desc: "ينشئ نصوصاً بطوابع زمنية عالية الدقة وتحديد للمتحدثين. يمكّن فرق المونتاج من تحديد \"اللحظات الذهبية\" فوراً للمقاطع الترويجية دون الحاجة للمراجعة اليدوية.",
        benefitIcon: Clock,
        benefitText: "يقلل بشكل كبير من وقت إنتاج المحتوى القصير",
        colorClass: "bg-violet-50 border-violet-100",
        iconColor: "text-violet-500",
        subColor: "text-violet-500"
      },
      {
        icon: Archive,
        title: "أرشفة نصية منخفضة التكلفة",
        desc: "يتيح فهرسة واسترجاع اقتباسات أو مواضيع معينة عبر صيغ .TXT / .DOCX. يستبدل الاعتماد على تخزين ملفات الفيديو الخام الكبيرة بقاعدة بيانات نصية قابلة للبحث.",
        benefits: [
          { icon: DollarSign, text: "توفير كبير في تكاليف التخزين" },
          { icon: Search, text: "أرشيف قابل للبحث بالكامل" }
        ],
        colorClass: "bg-emerald-50 border-emerald-100",
        iconColor: "text-emerald-500"
      },
      {
        icon: SplitSquareHorizontal,
        title: "معالجة محسنة للملفات الضخمة",
        desc: "ينفذ خوارزمية \"تجزئة ذكية\" تقسم الملفات الضخمة إلى كتل مدتها 10 دقائق، مما يمنع التحميل الزائد على الذاكرة ويضمن سلامة البيانات بنسبة 100٪ خلال الحلقات الطويلة.",
        benefits: [
          { icon: HardDrive, text: "انعدام مشاكل امتلاء الذاكرة" },
          { icon: CheckCircle2, text: "سلامة البيانات بنسبة 100٪" }
        ],
        colorClass: "bg-amber-50 border-amber-100",
        iconColor: "text-amber-500"
      }
    ],
    archTitle: "البنية الفنية والتقنية",
    archSubtitle: "نهج الذكاء الاصطناعي الهجين — الموازنة بين الخصوصية، السرعة، والتكلفة عبر استراتيجية استنتاج ثنائية الطبقات.",
    localEngine: {
      title: "محرك الاستنتاج المحلي",
      desc: "يعمل بنظام OpenAI Whisper (النسخة الأسرع) محلياً للنسخ الصوتي الخام — مما يزيل التكاليف السحابية ويضمن الخصوصية التامة للبيانات.",
      tags: [{ icon: Shield, text: "الأولوية للخصوصية" }, { icon: Zap, text: "صفر تكاليف سحابية" }]
    },
    cloudEngine: {
      title: "طبقة التحسين السحابية",
      desc: "تعمل واجهة برمجة تطبيقات Google Gemini 1.5 Pro كمحرر ذكي — لتصحيح القواعد اللغوية والتمييز بين حوار \"المضيف\" و \"الضيف\".",
      tags: [{ icon: Sparkles, text: "إدراك السياق" }, { icon: MessageSquareText, text: "تحديد المتحدثين" }]
    },
    coreStackTitle: "التقنيات الأساسية",
    coreStackTags: ["بايثون", "FFmpeg", "Faster-Whisper", "Gemini 1.5 Pro", "PCM 16kHz"],
    workflowTitle: "سير عمل الأتمتة",
    workflowSubtitle: "مسار من 4 خطوات من الفيديو الخام إلى نص منقح وقابل للبحث.",
    workflowSteps: [
      { step: 1, icon: Upload, title: "الإدخال", detail: "استقبال ملفات الفيديو الخام عبر السحب والإفلات.", color: "bg-blue-50 border-blue-100 text-blue-500" },
      { step: 2, icon: AudioLines, title: "التحسين", detail: "عزل مسارات الصوت وتحسينها عبر FFmpeg.", color: "bg-amber-50 border-amber-100 text-amber-500" },
      { step: 3, icon: MessageSquareText, title: "النسخ الصوتي", detail: "محرك Whisper يحول الصوتيات إلى نصوص.", color: "bg-violet-50 border-violet-100 text-violet-500" },
      { step: 4, icon: Sparkles, title: "التنقيح الذكي", detail: "يقوم نموذج Gemini السحابي بدمج وتنسيق النص النهائي.", color: "bg-emerald-50 border-emerald-100 text-emerald-500" },
    ],
    ctaTitle: "مهتم بمعرفة المزيد؟",
    ctaDesc: "تواصل معي لمناقشة هذا المشروع أو استكشاف فرص التعاون.",
    ctaContact: "تواصل معي",
    ctaAll: "عرض كل المشاريع",
    stepText: "خطوة"
  }
};

/* ── Image helper ───────────────────────────────────────────────────── */
const img = (name: string) => `/images/projects/podcast-etl/${name}`;

/* ── Active section tracker ─────────────────────────────────────────── */
function useActiveSection(tocSections: { id: string; label: string }[]) {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocSections]);

  return active;
}

/* ═══════════════════════════════════════════════════════════════════════
   Podcast ETL Case Study Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function PodcastEtlCaseStudy() {
  const params = useParams();
  const lang = (params?.lang as "en" | "ar") || "en";
  const data = content[lang];
  const activeSection = useActiveSection(data.tocSections);

  return (
    <article className="bg-white min-h-screen">
      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <div className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/${lang}/#projects`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors group"
          >
            {lang === 'ar' ? (
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            ) : (
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            )}
            {data.back}
          </Link>
        </div>
      </div>

      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <FadeIn>
        <header className="pt-10 pb-8 sm:pt-16 sm:pb-12 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-accent bg-accent-muted rounded-full px-3 py-1 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {data.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              {data.subtitle}
            </p>

            {/* Quick metrics */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-5 sm:gap-8">
              {data.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-5 sm:gap-8">
                  {i > 0 && <div className="h-8 w-px bg-slate-200 hidden sm:block" />}
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{m.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>
      </FadeIn>

      {/* ── Main content with sidebar ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex gap-8 lg:gap-16">
          {/* Sticky TOC sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <nav className="sticky top-24">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] mb-4">
                {data.tocTitle}
              </p>
              <ul className="space-y-1">
                {data.tocSections.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`block text-[0.8125rem] py-1.5 px-3 ${lang === 'ar' ? 'border-r-2' : 'border-l-2'} transition-all duration-200 ${
                        activeSection === id
                          ? "border-accent text-accent font-medium"
                          : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200"
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Article body */}
          <div className="flex-1 max-w-3xl">

            {/* ── Overview ──────────────────────────────────────────── */}
            <FadeIn>
              <section id="overview" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.overviewTitle}
                </h2>
                <p className="text-slate-600 leading-relaxed text-[0.9375rem]">
                  {data.overviewText}
                </p>

                {/* Dashboard screenshots */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("dashboard-en.png")} alt="Pipeline Dashboard — English" width={700} height={420} className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("dashboard-ar.png")} alt="Pipeline Dashboard — Arabic" width={700} height={420} className="w-full h-auto" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-400 text-center">
                  {data.dashboardCaption}
                </p>
              </section>
            </FadeIn>

            {/* ── Value Proposition ─────────────────────────────────── */}
            <FadeIn>
              <section id="value" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                  {data.valueTitle}
                </h2>
                <p className="text-slate-500 mb-8 text-[0.9375rem]">
                  {data.valueSubtitle}
                </p>

                <div className="space-y-5">
                  {data.features.map((f, i) => (
                    <FadeIn key={f.title} delay={i * 0.06}>
                      <div className="rounded-xl border border-slate-200 p-6 hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${f.colorClass}`}>
                            <f.icon className={`h-5 w-5 ${f.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">
                              {f.title}
                            </h3>
                            {f.subtitle && (
                              <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${f.subColor}`}>
                                {f.subtitle}
                              </p>
                            )}
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">
                              {f.desc}
                            </p>
                            {f.benefitText && f.benefitIcon && (
                              <div className="flex items-center gap-2">
                                <f.benefitIcon className="h-3.5 w-3.5 text-slate-400" />
                                <p className="text-xs text-slate-400">
                                  {f.benefitText}
                                </p>
                              </div>
                            )}
                            {f.benefits && (
                              <div className="flex flex-wrap gap-4">
                                {f.benefits.map((b, bIdx) => (
                                  <div key={bIdx} className="flex items-center gap-2">
                                    <b.icon className="h-3.5 w-3.5 text-slate-400" />
                                    <p className="text-xs text-slate-400">{b.text}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Hybrid AI Architecture ────────────────────────────── */}
            <FadeIn>
              <section id="architecture" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                  {data.archTitle}
                </h2>
                <p className="text-slate-500 mb-8 text-[0.9375rem]">
                  {data.archSubtitle}
                </p>

                {/* Architecture diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("pipeline-diagram-en.png")} alt="Pipeline Architecture — English" width={700} height={480} className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("pipeline-diagram-ar.png")} alt="Pipeline Architecture — Arabic" width={700} height={480} className="w-full h-auto" />
                  </div>
                </div>

                {/* Dual-layer cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Local engine */}
                  <div className="relative rounded-2xl border-2 border-violet-100 bg-gradient-to-br from-violet-50/60 to-white p-6">
                    <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} h-2 w-2 rounded-full bg-violet-400/50 animate-pulse`} />
                    <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
                      <Cpu className="h-5 w-5 text-violet-500" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {data.localEngine.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {data.localEngine.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {data.localEngine.tags.map((t, i) => (
                        <span key={i} className="text-[0.6875rem] font-medium text-violet-500 bg-violet-50 border border-violet-100 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                          <t.icon className="h-3 w-3" /> {t.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cloud layer */}
                  <div className="relative rounded-2xl border-2 border-accent/15 bg-gradient-to-br from-accent-muted/50 to-white p-6">
                    <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} h-2 w-2 rounded-full bg-accent/40 animate-pulse`} />
                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                      <Cloud className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {data.cloudEngine.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {data.cloudEngine.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {data.cloudEngine.tags.map((t, i) => (
                        <span key={i} className="text-[0.6875rem] font-medium text-accent bg-accent-muted rounded-full px-2.5 py-0.5 flex items-center gap-1">
                          <t.icon className="h-3 w-3" /> {t.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Core stack callout */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{data.coreStackTitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {data.coreStackTags.map((t) => (
                      <span key={t} className="text-xs text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </section>
            </FadeIn>

            {/* ── Automation Workflow ───────────────────────────────── */}
            <FadeIn>
              <section id="workflow" className="mb-16 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                  {data.workflowTitle}
                </h2>
                <p className="text-slate-500 mb-8 text-[0.9375rem]">
                  {data.workflowSubtitle}
                </p>

                {/* Workflow steps screenshot */}
                <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image src={img("workflow-steps.png")} alt="4-Step Automation Workflow" width={1100} height={300} className="w-full h-auto" />
                </div>

                {/* Step cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.workflowSteps.map((ws, i) => (
                    <FadeIn key={ws.step} delay={i * 0.06}>
                      <div className="rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow h-full">
                        <div className="flex items-start gap-3">
                          <div className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${ws.color}`}>
                            <ws.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[0.6875rem] font-bold text-slate-300">
                                {data.stepText} {ws.step}
                              </span>
                              {i < data.workflowSteps.length - 1 && (
                                <ArrowRight className={`h-3 w-3 text-slate-200 hidden sm:block ${lang === 'ar' ? 'rotate-180' : ''}`} />
                              )}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-0.5">{ws.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{ws.detail}</p>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Bottom CTA ────────────────────────────────────────── */}
            <FadeIn>
              <div className="border-t border-slate-100 pt-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {data.ctaTitle}
                    </p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {data.ctaDesc}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/${lang}/#contact`}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                    >
                      {data.ctaContact}
                    </Link>
                    <Link
                      href={`/${lang}/#projects`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {data.ctaAll}
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </article>
  );
}
