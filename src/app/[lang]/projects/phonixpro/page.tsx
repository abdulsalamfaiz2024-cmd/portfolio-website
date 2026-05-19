"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Sparkles,
  BarChart3,
  PieChart,
  Brain,
  FileText,
  Rocket,
  Users,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Image as ImageIcon,
  UserCheck,
  Layers,
  LayoutDashboard,
  Maximize,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ── Content ────────────────────────────────────────────────────────── */
const content = {
  en: {
    back: "Back to Projects",
    title: "PhonixPro",
    subtitle: "AI-Driven SaaS Data Analysis & Reporting Platform",
    metrics: [
      { value: "70%", label: "Reduction in analysis time" },
      { value: "<50ms", label: "Average query response" },
      { value: "Zero-DB", label: "In-memory architecture" },
    ],
    tocTitle: "On this page",
    tocSections: [
      { id: "overview", label: "Overview" },
      { id: "audience", label: "Target Audience" },
      { id: "architecture", label: "Architecture & Stack" },
      { id: "features", label: "Core Features" },
      { id: "ai-capabilities", label: "AI Capabilities" },
      { id: "reporting", label: "Automated Reporting" },
      { id: "roadmap", label: "Upcoming Updates" },
    ],
    tags: ["SaaS", "AI", "Data Engineering", "Analytics", "Machine Learning"],
    overviewTitle: "Project Overview",
    overviewText: "PhonixPro is a modern web-based SaaS platform designed for advanced data analysis, statistical modeling, and AI-driven insights. Transitioning from a local desktop application to a scalable SaaS, it features a unique high-performance in-memory processing architecture, operating without a persistent backend database to ensure absolute data privacy and rapid processing speeds.",
    privacyTitle: "Privacy-First Architecture",
    privacyText: "All data is processed in-memory with zero persistent storage — no database, no data retention. Your datasets stay yours.",
    audienceTitle: "Target Audience",
    audienceItems: [
      { icon: Briefcase, title: "Data Analysts & Business Analysts", desc: "For routine analytics and fast, client-ready reports." },
      { icon: GraduationCap, title: "Researchers & Academics", desc: "For statistical testing and modeling." },
      { icon: Users, title: "Business Professionals", desc: "For decision support dashboards and operational analysis." },
    ],
    techTitle: "Technical Architecture & Stack",
    techStack: [
      { layer: "Frontend", detail: "Modern web UI (SPA)" },
      { layer: "Backend & Engine", detail: "Modular API with Data Science Engine (Statistical + ML toolkit)" },
      { layer: "AI Integration", detail: "Generative AI for automated interpretation & NL querying" },
      { layer: "Export Engines", detail: "Document export capabilities (PDF & Word)" },
    ],
    featuresTitle: "Core Modules & Features",
    featuresDesc: "A comprehensive toolkit spanning ingestion, cleaning, analysis, and visualization.",
    coreModules: [
      {
        icon: Upload, number: "01", title: "Smart Data Ingestion",
        description: "Drag-and-drop uploads for CSV, Excel, and JSON with auto-detection for delimiters and encoding.",
        screenshots: ["ingestion-upload-zone.png", "ingestion-delimiter-preview.png", "ingestion-browser-preview.png"],
      },
      {
        icon: Sparkles, number: "02", title: "Comprehensive Data Cleaning",
        description: "An intelligent data preparation hub featuring an AI-powered smart suggestions panel for one-click anomaly fixes, missing value handling, and smart type detection.",
        screenshots: ["cleaning-dashboard.png", "cleaning-ai-suggestions.png", "cleaning-manual-toolbox.png"],
      },
      {
        icon: BarChart3, number: "03", title: "Deep Statistical Analysis",
        description: "Equipped for Descriptive statistics, Hypothesis testing (ANOVA, t-tests), Regression analysis, and Advanced analytics (PCA, clustering like K-Means and DBSCAN).",
        screenshots: ["analysis-studio-overview.png", "analysis-correlation.png", "analysis-pivot-tables.png"],
      },
      {
        icon: PieChart, number: "04", title: "Interactive Visualizations",
        description: "Publication-ready charts (Heatmaps, Box plots, Violin, Scatter) with smart chart suggestions based on data types and advanced styling controls.",
        screenshots: ["visualization-grid.png", "visualization-builder.png"],
      },
    ],
    aiTitle: "AI-Powered Capabilities",
    aiDesc: "The Virtual Data Assistant — three intelligent modules that transform how you interact with data.",
    aiCapabilities: [
      {
        icon: UserCheck, title: "Executive Analyst",
        description: "Translates complex statistical outputs into plain-language, executive-friendly summaries that drive decision-making without requiring technical expertise.",
        screenshot: "aianalyst-compiled-widget.png",
      },
      {
        icon: ImageIcon, title: "Auto Canvas",
        description: "Curates visual storytelling by generating comprehensive infographics from key narratives, transforming raw data into compelling visual reports.",
        screenshot: "aicanvas-hub.png", screenshot2: "aicanvas-financial.png",
      },
      {
        icon: MessageSquare, title: "Chat with Data",
        description: "An interactive conversational interface allowing users to interrogate datasets using natural language, eliminating the need for complex SQL queries",
        screenshot: "aianalyst-chat-interface.png",
      },
    ],
    reportingTitle: "Automated Reporting",
    reportingSubtitle: "Drag-and-Drop Report Builder",
    reportingText: "A drag-and-drop report builder featuring live real-time previews, paginated document views, and high-quality PDF/Word generation with consistent typography.",
    reportingTags: ["Live Preview", "Paginated View", "PDF Export", "Word Export", "Consistent Typography"],
    roadmapTitle: "Upcoming Updates",
    roadmapDesc: "Pending deployment features on the roadmap.",
    upcomingFeatures: [
      { icon: Layers, title: "Multi-Sheet Support", description: "Handle complex Excel workbooks with multiple sheets seamlessly." },
      { icon: LayoutDashboard, title: "Unified Dashboard", description: "Seamless data flow across modules in a single, cohesive workspace." },
      { icon: Maximize, title: "Expanded Canvas", description: "Enhanced AI infographics with richer layouts and deeper data narratives." },
    ],
    ctaTitle: "Interested in learning more?",
    ctaDesc: "Get in touch to discuss this project or explore collaboration.",
    ctaContact: "Contact Me",
    ctaAll: "View All Projects",
  },
  ar: {
    back: "العودة للمشاريع",
    title: "PhonixPro",
    subtitle: "منصة برمجيات كخدمة لتحليل البيانات والتقارير مدعومة بالذكاء الاصطناعي",
    metrics: [
      { value: "70%", label: "تقليل وقت التحليل" },
      { value: "<50ms", label: "متوسط استجابة الاستعلام" },
      { value: "بدون قاعدة بيانات", label: "بنية معالجة في الذاكرة" },
    ],
    tocTitle: "في هذه الصفحة",
    tocSections: [
      { id: "overview", label: "نظرة عامة" },
      { id: "audience", label: "الجمهور المستهدف" },
      { id: "architecture", label: "البنية والتقنيات" },
      { id: "features", label: "الميزات الأساسية" },
      { id: "ai-capabilities", label: "قدرات الذكاء الاصطناعي" },
      { id: "reporting", label: "التقارير المؤتمتة" },
      { id: "roadmap", label: "التحديثات القادمة" },
    ],
    tags: ["البرمجيات كخدمة", "الذكاء الاصطناعي", "هندسة البيانات", "التحليلات", "تعلم الآلة"],
    overviewTitle: "نظرة عامة على المشروع",
    overviewText: "PhonixPro هي منصة SaaS حديثة عبر الويب مصممة لتحليل البيانات المتقدم، النمذجة الإحصائية، والرؤى المدعومة بالذكاء الاصطناعي. بعد الانتقال من تطبيق سطح مكتب محلي إلى خدمة سحابية قابلة للتوسع، تتميز ببنية معالجة عالية الأداء في الذاكرة بالكامل (In-Memory)، وتعمل بدون قاعدة بيانات خلفية دائمة لضمان خصوصية البيانات المطلقة وسرعات معالجة هائلة.",
    privacyTitle: "بنية قائمة على الخصوصية",
    privacyText: "تتم معالجة جميع البيانات في الذاكرة بصفر تخزين دائم - لا توجد قواعد بيانات، ولا احتفاظ بالبيانات. بياناتك تظل ملكك وحدك.",
    audienceTitle: "الجمهور المستهدف",
    audienceItems: [
      { icon: Briefcase, title: "محللو البيانات والأعمال", desc: "للتحليلات الروتينية والتقارير السريعة الجاهزة للعملاء." },
      { icon: GraduationCap, title: "الباحثون والأكاديميون", desc: "للاختبارات الإحصائية والنمذجة." },
      { icon: Users, title: "محترفو الأعمال", desc: "للوحات دعم القرار والتحليل التشغيلي." },
    ],
    techTitle: "البنية التحتية والتقنيات",
    techStack: [
      { layer: "الواجهة الأمامية", detail: "واجهة مستخدم ويب حديثة (تطبيق صفحة واحدة)" },
      { layer: "الخلفية والمحرك", detail: "واجهة برمجة تطبيقات معمارية مع محرك لعلوم البيانات (أدوات إحصائية + تعلم آلة)" },
      { layer: "تكامل الذكاء الاصطناعي", detail: "ذكاء اصطناعي توليدي للتفسير التلقائي والاستعلام باللغة الطبيعية" },
      { layer: "محركات التصدير", detail: "قدرات تصدير المستندات بأسلوب احترافي (PDF و Word)" },
    ],
    featuresTitle: "الوحدات والميزات الأساسية",
    featuresDesc: "مجموعة أدوات شاملة تغطي استيعاب البيانات، التنظيف، التحليل، والتصوير البصري.",
    coreModules: [
      {
        icon: Upload, number: "01", title: "استيعاب البيانات الذكي",
        description: "رفع عبر السحب والإفلات لملفات CSV، Excel، و JSON مع الكشف التلقائي عن الفواصل وتشفير الملفات.",
        screenshots: ["ingestion-upload-zone.png", "ingestion-delimiter-preview.png", "ingestion-browser-preview.png"],
      },
      {
        icon: Sparkles, number: "02", title: "تنظيف شامل للبيانات",
        description: "مركز ذكي لإعداد البيانات يتميز بلوحة اقتراحات مدعومة بالذكاء الاصطناعي لإصلاح الشذوذ بنقرة واحدة، ومعالجة القيم المفقودة، والاكتشاف الذكي لأنواع البيانات.",
        screenshots: ["cleaning-dashboard.png", "cleaning-ai-suggestions.png", "cleaning-manual-toolbox.png"],
      },
      {
        icon: BarChart3, number: "03", title: "تحليل إحصائي عميق",
        description: "مجهز للإحصاءات الوصفية، واختبار الفرضيات (ANOVA، اختبارات t)، وتحليل الانحدار، والتحليلات المتقدمة (مثل PCA، والتجميع الكتلوي K-Means و DBSCAN).",
        screenshots: ["analysis-studio-overview.png", "analysis-correlation.png", "analysis-pivot-tables.png"],
      },
      {
        icon: PieChart, number: "04", title: "تصورات بيانات تفاعلية",
        description: "رسوم بيانية جاهزة للنشر الأكاديمي مع اقتراحات ذكية للرسوم بناءً على أنواع البيانات وأدوات تحكم متقدمة بالتصميم.",
        screenshots: ["visualization-grid.png", "visualization-builder.png"],
      },
    ],
    aiTitle: "قدرات مدعومة بالذكاء الاصطناعي",
    aiDesc: "المساعد الافتراضي للبيانات - ثلاث وحدات ذكية تغير طريقة تفاعلك مع البيانات.",
    aiCapabilities: [
      {
        icon: UserCheck, title: "المحلل التنفيذي",
        description: "يترجم المخرجات الإحصائية المعقدة إلى ملخصات بلغة بسيطة ومناسبة للتنفيذيين، مما يسهل اتخاذ القرارات دون الحاجة لخبرة تقنية عميقة.",
        screenshot: "aianalyst-compiled-widget.png",
      },
      {
        icon: ImageIcon, title: "اللوحة التلقائية (Auto Canvas)",
        description: "ينسق سرد القصص البصرية من خلال إنشاء إنفوجرافيك شامل من الروايات الرئيسية، محولاً البيانات الخام إلى تقارير مرئية مقنعة.",
        screenshot: "aicanvas-hub.png", screenshot2: "aicanvas-financial.png",
      },
      {
        icon: MessageSquare, title: "المحادثة مع البيانات",
        description: "واجهة حوارية تفاعلية تتيح للمستخدمين استجواب مجموعات البيانات باستخدام اللغة الطبيعية، مما يقضي على الحاجة إلى استعلامات SQL المعقدة.",
        screenshot: "aianalyst-chat-interface.png",
      },
    ],
    reportingTitle: "التقارير المؤتمتة",
    reportingSubtitle: "منشئ تقارير بالسحب والإفلات",
    reportingText: "منشئ تقارير يعتمد على السحب والإفلات يتميز بمعاينات حية في الوقت الفعلي، وعروض المستندات المقسمة لصفحات، وإنشاء ملفات PDF/Word عالية الجودة مع طباعة متسقة.",
    reportingTags: ["معاينة حية", "عرض الصفحات", "تصدير PDF", "تصدير Word", "طباعة متسقة"],
    roadmapTitle: "التحديثات القادمة",
    roadmapDesc: "ميزات قيد التطوير والنشر قريباً.",
    upcomingFeatures: [
      { icon: Layers, title: "دعم الأوراق المتعددة", description: "التعامل مع ملفات Excel المعقدة ذات الأوراق المتعددة بسلاسة تامة." },
      { icon: LayoutDashboard, title: "لوحة تحكم موحدة", description: "تدفق سلس للبيانات عبر الوحدات في مساحة عمل واحدة ومتماسكة." },
      { icon: Maximize, title: "لوحة تصميم موسعة", description: "رسوم إنفوجرافيك محسّنة بالذكاء الاصطناعي بتخطيطات أغنى وسرد أعمق للبيانات." },
    ],
    ctaTitle: "مهتم بمعرفة المزيد؟",
    ctaDesc: "تواصل معي لمناقشة هذا المشروع أو استكشاف فرص التعاون.",
    ctaContact: "تواصل معي",
    ctaAll: "عرض كل المشاريع",
  }
};

/* ── Image base path ────────────────────────────────────────────────── */
const img = (name: string) => `/images/projects/phonixpro/${name}`;

/* ── Active section tracker ─────────────────────────────────────────── */
function useActiveSection(tocSections: { id: string; label: string }[]) {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
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
   PhonixPro Case Study Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function PhonixProCaseStudy() {
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
            {/* Tags */}
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
              {data.metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-5 sm:gap-8">
                  {i > 0 && <div className="h-8 w-px bg-slate-200 hidden sm:block" />}
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{metric.label}</p>
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
          {/* Sticky TOC sidebar — hidden on mobile */}
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

                {/* Login screenshot */}
                <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image src={img("auth-login.png")} alt="PhonixPro Login" width={1200} height={700} className="w-full h-auto" />
                </div>

                {/* Architecture callout */}
                <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {data.privacyTitle}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {data.privacyText}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </FadeIn>

            {/* ── Target Audience ───────────────────────────────────── */}
            <FadeIn>
              <section id="audience" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.audienceTitle}
                </h2>
                <div className="grid gap-4">
                  {data.audienceItems.map((persona) => (
                    <div
                      key={persona.title}
                      className="flex items-start gap-4 rounded-lg border border-slate-100 p-4 hover:border-slate-200 transition-colors"
                    >
                      <div className="h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <persona.icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{persona.title}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{persona.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Architecture & Stack ──────────────────────────────── */}
            <FadeIn>
              <section id="architecture" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.techTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.techStack.map((item) => (
                    <div
                      key={item.layer}
                      className="rounded-xl border border-slate-200 p-5 bg-white hover:shadow-sm transition-shadow"
                    >
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                        {item.layer}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Settings panel screenshot */}
                <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image src={img("settings-panel.png")} alt="Platform Settings Panel" width={1200} height={700} className="w-full h-auto" />
                </div>
              </section>
            </FadeIn>

            {/* ── Core Features ─────────────────────────────────────── */}
            <FadeIn>
              <section id="features" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                  {data.featuresTitle}
                </h2>
                <p className="text-slate-500 mb-10 text-[0.9375rem]">
                  {data.featuresDesc}
                </p>

                <div className="space-y-6">
                  {data.coreModules.map((mod, i) => (
                    <FadeIn key={mod.title} delay={i * 0.05}>
                      <div className="group flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-xl border border-slate-200 p-5 sm:p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                        {/* Icon + number */}
                        <div className="shrink-0 flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-accent/5 group-hover:border-accent/20 transition-colors">
                            <mod.icon className="h-4.5 w-4.5 text-slate-400 group-hover:text-accent transition-colors" />
                          </div>
                          <span className="text-[0.6875rem] font-bold text-slate-300 tracking-wider">
                            {mod.number}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-slate-900 mb-1.5">
                            {mod.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {mod.description}
                          </p>
                          {/* Screenshots gallery */}
                          {mod.screenshots.length > 0 && (
                            <div className={`mt-4 grid gap-2 ${mod.screenshots.length >= 3 ? "grid-cols-3" : mod.screenshots.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                              {mod.screenshots.map((s) => (
                                <div key={s} className="rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                                  <Image src={img(s)} alt={mod.title} width={400} height={240} className="w-full h-auto" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── AI-Powered Capabilities ───────────────────────────── */}
            <FadeIn>
              <section id="ai-capabilities" className="mb-12 sm:mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {data.aiTitle}
                  </h2>
                </div>
                <p className="text-slate-500 mb-10 text-[0.9375rem]">
                  {data.aiDesc}
                </p>

                <div className="space-y-5">
                  {data.aiCapabilities.map((cap: { title: string; description: string }, i: number) => (
                    <FadeIn key={cap.title} delay={i * 0.07}>
                      <div className="relative rounded-2xl border-2 border-accent/15 bg-gradient-to-br from-accent-muted/50 to-white p-5 sm:p-7 hover:border-accent/25 hover:shadow-md transition-all">
                        {/* Glow dot */}
                        <div className={`absolute top-5 ${lang === 'ar' ? 'left-5' : 'right-5'} h-2 w-2 rounded-full bg-accent/40 animate-pulse`} />

                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                          <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                            <cap.icon className="h-5 w-5 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-bold text-slate-900 mb-1.5">
                              {cap.title}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {cap.description}
                            </p>
                            {/* Screenshot(s) */}
                            <div className={`mt-4 grid gap-2 ${"screenshot2" in cap && cap.screenshot2 ? "grid-cols-2" : "grid-cols-1"}`}>
                              <div className="rounded-lg overflow-hidden border border-accent/10">
                                <Image src={img(cap.screenshot)} alt={cap.title} width={800} height={480} className="w-full h-auto" />
                              </div>
                              {"screenshot2" in cap && cap.screenshot2 && (
                                <div className="rounded-lg overflow-hidden border border-accent/10">
                                  <Image src={img(cap.screenshot2)} alt={`${cap.title} detail`} width={800} height={480} className="w-full h-auto" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Automated Reporting ───────────────────────────────── */}
            <FadeIn>
              <section id="reporting" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.reportingTitle}
                </h2>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-7">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {data.reportingSubtitle}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {data.reportingText}
                      </p>
                      {/* Report preview screenshot */}
                      <div className="mb-4 rounded-lg overflow-hidden border border-slate-200">
                        <Image src={img("reports-preview.png")} alt="Report Builder Preview" width={800} height={480} className="w-full h-auto" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {data.reportingTags.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs text-slate-400 bg-white border border-slate-200 rounded-full px-3 py-1"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </FadeIn>

            {/* ── Upcoming Updates ──────────────────────────────────── */}
            <FadeIn>
              <section id="roadmap" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <Rocket className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {data.roadmapTitle}
                  </h2>
                </div>
                <p className="text-slate-500 mb-8 text-[0.9375rem]">
                  {data.roadmapDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {data.upcomingFeatures.map((feature, i) => (
                    <FadeIn key={feature.title} delay={i * 0.06}>
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-5 text-center hover:border-accent/30 hover:bg-accent-muted/30 transition-all h-full">
                        <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3">
                          <feature.icon className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          {feature.title}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {feature.description}
                        </p>
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
