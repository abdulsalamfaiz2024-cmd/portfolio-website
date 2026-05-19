"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  ArrowLeft,
  ArrowRight,
  CloudSun,
  TrendingUp,
  HeartPulse,
  GraduationCap,
  Timer,
  Database,
  Cpu,
  Globe,
  Radar,
  Thermometer,
  Wind,
  DollarSign,
  ShieldAlert,
  Activity,
  MapPin,
  BarChart3,
  Brain,
  Bell,
  Server,
  FileSearch,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ── Content ────────────────────────────────────────────────────────── */
const content = {
  en: {
    back: "Back to Projects",
    title: "Yemen Nexus Dashboard",
    codename: "Codename: Atmos-Alpha",
    subtitle: "Real-Time Multi-Sectoral Intelligence & Bio-Surveillance System",
    metrics: [
      { value: "5+", label: "Data sectors integrated" },
      { value: "Real-time", label: "Dashboard updates" },
      { value: "300s", label: "Telemetry refresh cycle" },
    ],
    tocTitle: "On this page",
    tocSections: [
      { id: "overview", label: "Overview" },
      { id: "weather", label: "Weather & Climate" },
      { id: "economic", label: "Economic Intelligence" },
      { id: "health", label: "Bio-Surveillance" },
      { id: "education", label: "Education & Crisis" },
      { id: "challenges", label: "Engineering Challenges" },
      { id: "roadmap", label: "Future Roadmap" },
    ],
    tags: ["Humanitarian Analytics", "Real-Time", "ETL", "GIS", "Python", "Power BI"],
    overviewTitle: "Project Overview",
    overviewText: "A strategic intelligence platform designed to aggregate, process, and visualize fragmented data from across Yemen's vital sectors — Economy, Health, Education, and Weather. The system transforms static, unstructured reports from international organizations and live APIs into a unified, interactive decision-making interface.",
    overviewCalloutTitle: "From Fragmentation to Foresight",
    overviewCalloutText: "Replaces dozens of static PDF bulletins and scattered Excel files from WHO, OCHA, and financial institutions with a single, live, queryable interface.",
    howItWorks: "How It Works",
    modules: {
      weather: {
        num: "Module 01",
        title: "Weather & Climate (Atmos-Alpha)",
        desc: "High-precision environmental monitoring for logistics and agriculture across Yemeni governorates.",
        steps: [
          { icon: Cpu, label: "Real-Time API", detail: "Connects to Open-Meteo API with a background job triggering every 300 seconds." },
          { icon: Radar, label: "Atmospheric Radar", detail: "Profiles Heat, UV Index, Wind Speed, and Cloud Density per governorate." },
          { icon: Thermometer, label: "Thermal Map", detail: "Dynamic heatmap of Yemeni governorates showing temperature distribution." }
        ]
      },
      economic: {
        num: "Module 02",
        title: "Economic Intelligence",
        desc: "Navigating Yemen's complex financial landscape by tracking the Exchange Rate Divergence between Sana'a and Aden.",
        steps: [
          { icon: DollarSign, label: "Exchange Rate Divergence", detail: "Tracks dual currency rates between Sana'a and Aden markets in real-time." },
          { icon: BarChart3, label: "Purchasing Power Index", detail: "Monitors Minimum Food Basket costs vs. salary coverage, GDP, and Inflation trends." },
          { icon: FileSearch, label: "PDF & Excel ETL", detail: "Custom Python scripts parse complex PDFs and Excel bulletins from financial institutions to calculate 'Delta' variances." }
        ]
      },
      health: {
        num: "Module 03",
        title: "Bio-Surveillance (Health Observatory)",
        desc: "Aggregates scattered humanitarian data into actionable epidemiological insights — including Cholera outbreak monitoring.",
        steps: [
          { icon: Activity, label: "Epidemiological Tracking", detail: "Converts static PDF reports into live disease outbreak dashboards (Cholera, Diphtheria)." },
          { icon: MapPin, label: "Facility Status Map", detail: "Categorizes hospital functionality (Fully / Partially / Non-Functional) based on WHO and Health Cluster data." },
          { icon: ShieldAlert, label: "Humanitarian Data Fusion", detail: "Fuses data from WHO, Health Cluster, and OCHA into a single epidemiological view." }
        ]
      },
      education: {
        num: "Module 04",
        title: "Education & Crisis Response",
        desc: "Assesses conflict impact on schooling using a proprietary \"Systemic Dropout Risk Index\" algorithm.",
        steps: [
          { icon: BarChart3, label: "Dropout Risk Index", detail: "Proprietary algorithm applies weighted metrics to economic and security data to predict dropout trends." },
          { icon: MapPin, label: "School Geocoding", detail: "Maps school operational status across governorates for geographic crisis assessment." },
          { icon: Wind, label: "Conflict Impact Modeling", detail: "Cross-references security incident data with enrollment figures to quantify conflict's educational toll." }
        ]
      }
    },
    challengesTitle: "Technical Challenges & Solutions",
    challenges: [
      {
        icon: Database, title: "Data Fragmentation",
        desc: "Developed robust ETL (Extract, Transform, Load) scripts to standardize inconsistent geographic and temporal data from international donors across multiple formats and languages."
      },
      {
        icon: Server, title: "Uptime Management",
        desc: "Implemented automated cron jobs and server monitoring to ensure seamless live telemetry ingestion despite cloud infrastructure constraints."
      }
    ],
    roadmapTitle: "Future Roadmap",
    roadmapDesc: "From monitoring to foresight — upcoming capabilities.",
    roadmap: [
      { icon: Brain, title: "AI Integration", desc: "Training predictive models on historical data to forecast currency trajectories and humanitarian needs." },
      { icon: Bell, title: "Smart Alerts", desc: "Risk-threshold notification system to alert decision-makers of pandemic outbreaks or sudden economic collapses." }
    ],
    ctaTitle: "Interested in learning more?",
    ctaDesc: "Get in touch to discuss this project or explore collaboration.",
    ctaContact: "Contact Me",
    ctaAll: "View All Projects"
  },
  ar: {
    back: "العودة للمشاريع",
    title: "لوحة معلومات يمن نيكسس",
    codename: "الاسم الرمزي: Atmos-Alpha",
    subtitle: "نظام استخباراتي متعدد القطاعات ومراقبة بيولوجية في الوقت الفعلي",
    metrics: [
      { value: "5+", label: "قطاعات بيانات مدمجة" },
      { value: "وقت فعلي", label: "تحديثات مستمرة" },
      { value: "300 ثانية", label: "دورة تحديث القياس" },
    ],
    tocTitle: "في هذه الصفحة",
    tocSections: [
      { id: "overview", label: "نظرة عامة" },
      { id: "weather", label: "الطقس والمناخ" },
      { id: "economic", label: "الاستخبارات الاقتصادية" },
      { id: "health", label: "المراقبة البيولوجية والصحية" },
      { id: "education", label: "التعليم والأزمات" },
      { id: "challenges", label: "التحديات الهندسية" },
      { id: "roadmap", label: "خارطة الطريق المستقبلية" },
    ],
    tags: ["تحليلات إنسانية", "الوقت الفعلي", "ETL", "نظم المعلومات الجغرافية", "بايثون", "Power BI"],
    overviewTitle: "نظرة عامة على المشروع",
    overviewText: "منصة استخبارات استراتيجية مصممة لتجميع ومعالجة وتصوير البيانات المجزأة من القطاعات الحيوية في اليمن — الاقتصاد، الصحة، التعليم، والطقس. يحول النظام التقارير غير المهيكلة والثابتة الصادرة عن المنظمات الدولية وواجهات برمجة التطبيقات الحية إلى واجهة تفاعلية موحدة لدعم اتخاذ القرارات.",
    overviewCalloutTitle: "من التشتت إلى الاستشراف",
    overviewCalloutText: "يستبدل العشرات من نشرات PDF الثابتة وملفات Excel المبعثرة من منظمة الصحة العالمية وأوتشا والمؤسسات المالية بواجهة واحدة حية وقابلة للاستعلام.",
    howItWorks: "آلية العمل",
    modules: {
      weather: {
        num: "الوحدة 01",
        title: "الطقس والمناخ (Atmos-Alpha)",
        desc: "مراقبة بيئية عالية الدقة لخدمة اللوجستيات والزراعة عبر المحافظات اليمنية.",
        steps: [
          { icon: Cpu, label: "ربط حي في الوقت الفعلي", detail: "يتصل بواجهة Open-Meteo مع مهمة مجدولة في الخلفية تُحدّث البيانات كل 300 ثانية." },
          { icon: Radar, label: "رادار الغلاف الجوي", detail: "يقدم ملفات تعريفية عن الحرارة، ومؤشر الأشعة فوق البنفسجية، وسرعة الرياح، وكثافة السحب لكل محافظة." },
          { icon: Thermometer, label: "خريطة حرارية", detail: "خريطة حرارية ديناميكية للمحافظات اليمنية توضح توزيع درجات الحرارة." }
        ]
      },
      economic: {
        num: "الوحدة 02",
        title: "الاستخبارات الاقتصادية",
        desc: "التنقل في المشهد المالي المعقد لليمن من خلال تتبع تباين أسعار الصرف بين أسواق صنعاء وعدن.",
        steps: [
          { icon: DollarSign, label: "تباين أسعار الصرف", detail: "تتبع أسعار العملات المزدوجة بين أسواق صنعاء وعدن في الوقت الفعلي." },
          { icon: BarChart3, label: "مؤشر القوة الشرائية", detail: "مراقبة تكاليف السلة الغذائية الأساسية مقابل تغطية الرواتب، واتجاهات الناتج المحلي والتضخم." },
          { icon: FileSearch, label: "استخراج وتحويل البيانات (ETL)", detail: "نصوص برمجية مخصصة ببايثون لتحليل ملفات PDF المعقدة والنشرات المالية واستخراج فروقات الأسعار." }
        ]
      },
      health: {
        num: "الوحدة 03",
        title: "المراقبة البيولوجية (المرصد الصحي)",
        desc: "تجميع البيانات الإنسانية المبعثرة وتحويلها إلى رؤى وبائية قابلة للتنفيذ — بما في ذلك مراقبة تفشي الكوليرا.",
        steps: [
          { icon: Activity, label: "التتبع الوبائي", detail: "تحويل التقارير الثابتة إلى لوحات معلومات حية لتفشي الأمراض (الكوليرا، الخناق)." },
          { icon: MapPin, label: "خريطة حالة المرافق", detail: "تصنيف وظائف المستشفيات (تعمل بالكامل / جزئياً / خارج الخدمة) بناءً على بيانات منظمة الصحة العالمية." },
          { icon: ShieldAlert, label: "دمج البيانات الإنسانية", detail: "دمج بيانات متعددة من منظمات الصحة والأوتشا في واجهة وبائية موحدة." }
        ]
      },
      education: {
        num: "الوحدة 04",
        title: "التعليم والاستجابة للأزمات",
        desc: "تقييم تأثير النزاع على التعليم باستخدام خوارزمية 'مؤشر مخاطر التسرب المنهجي' المطورة خصيصاً.",
        steps: [
          { icon: BarChart3, label: "مؤشر مخاطر التسرب", detail: "خوارزمية تطبق مقاييس موزونة على البيانات الاقتصادية والأمنية للتنبؤ باتجاهات التسرب المدرسي." },
          { icon: MapPin, label: "الترميز الجغرافي للمدارس", detail: "رسم خرائط للحالة التشغيلية للمدارس عبر المحافظات للتقييم الجغرافي للأزمات." },
          { icon: Wind, label: "نمذجة تأثير النزاع", detail: "مقارنة بيانات الحوادث الأمنية مع أرقام التسجيل لتحديد الأثر التعليمي للنزاعات." }
        ]
      }
    },
    challengesTitle: "التحديات التقنية والحلول",
    challenges: [
      {
        icon: Database, title: "تشتت البيانات وعدم تناسقها",
        desc: "تطوير نصوص برمجية قوية لاستخراج وتحويل وتحميل البيانات (ETL) لتوحيد البيانات الجغرافية والزمنية غير المتسقة من المانحين الدوليين عبر تنسيقات ولغات متعددة."
      },
      {
        icon: Server, title: "إدارة وقت التشغيل",
        desc: "تنفيذ مهام مجدولة آلية (Cron jobs) ومراقبة مستمرة للخوادم لضمان استيعاب البيانات الحية بسلاسة على الرغم من قيود البنية التحتية السحابية."
      }
    ],
    roadmapTitle: "خارطة الطريق المستقبلية",
    roadmapDesc: "من المراقبة إلى الاستشراف — قدرات قيد التطوير.",
    roadmap: [
      { icon: Brain, title: "دمج الذكاء الاصطناعي", desc: "تدريب النماذج التنبؤية على البيانات التاريخية لتوقع مسارات العملة والاحتياجات الإنسانية." },
      { icon: Bell, title: "التنبيهات الذكية", desc: "نظام إشعار بمستويات الخطر لتنبيه صانعي القرار باحتمالية تفشي الأوبئة أو الانهيارات الاقتصادية المفاجئة." }
    ],
    ctaTitle: "مهتم بمعرفة المزيد؟",
    ctaDesc: "تواصل معي لمناقشة هذا المشروع أو استكشاف فرص التعاون.",
    ctaContact: "تواصل معي",
    ctaAll: "عرض كل المشاريع"
  }
};

/* ── Image helper ───────────────────────────────────────────────────── */
const img = (name: string) => `/images/projects/yemen-nexus/${name}`;

/* ── Reusable "How it Works" step component ─────────────────────────── */
function StepRow({
  icon: Icon,
  label,
  detail,
}: {
  icon: React.ElementType;
  label: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

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
   Yemen Nexus Case Study Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function YemenNexusCaseStudy() {
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
            <p className="mt-2 text-base text-slate-400 font-medium">{data.codename}</p>
            <p className="mt-3 text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
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
              <section id="overview" className="mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.overviewTitle}
                </h2>
                <p className="text-slate-600 leading-relaxed text-[0.9375rem]">
                  {data.overviewText}
                </p>

                {/* Home overview screenshot */}
                <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image src={img("home-overview.png")} alt="Yemen Nexus Home Overview" width={1200} height={700} className="w-full h-auto" />
                </div>

                {/* Callout */}
                <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Globe className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {data.overviewCalloutTitle}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {data.overviewCalloutText}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </FadeIn>

            {/* ══════════════════════════════════════════════════════════
                TACTICAL MODULES
               ══════════════════════════════════════════════════════════ */}

            {/* ── Module 1: Weather & Climate ───────────────────────── */}
            <FadeIn>
              <section id="weather" className="mb-12 sm:mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
                    <CloudSun className="h-4.5 w-4.5 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider">{data.modules.weather.num}</p>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                      {data.modules.weather.title}
                    </h2>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[0.9375rem] mt-4 mb-6">
                  {data.modules.weather.desc}
                </p>

                {/* Screenshots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("weather-dashboard.png")} alt="Weather Dashboard" width={600} height={400} className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("weather-radar.png")} alt="Atmospheric Radar" width={600} height={400} className="w-full h-auto" />
                  </div>
                </div>

                {/* How it works */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{data.howItWorks}</p>
                  {data.modules.weather.steps.map((step, idx) => (
                    <StepRow key={idx} icon={step.icon} label={step.label} detail={step.detail} />
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Module 2: Economic Intelligence ───────────────────── */}
            <FadeIn>
              <section id="economic" className="mb-12 sm:mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">{data.modules.economic.num}</p>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                      {data.modules.economic.title}
                    </h2>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[0.9375rem] mt-4 mb-6">
                  {data.modules.economic.desc}
                </p>

                {/* Screenshots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("economic-dashboard.png")} alt="Economic Dashboard" width={600} height={400} className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("economic-metrics.png")} alt="Economic Metrics" width={600} height={400} className="w-full h-auto" />
                  </div>
                </div>

                {/* How it works */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{data.howItWorks}</p>
                  {data.modules.economic.steps.map((step, idx) => (
                    <StepRow key={idx} icon={step.icon} label={step.label} detail={step.detail} />
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Module 3: Bio-Surveillance ────────────────────────── */}
            <FadeIn>
              <section id="health" className="mb-12 sm:mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center">
                    <HeartPulse className="h-4.5 w-4.5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider">{data.modules.health.num}</p>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                      {data.modules.health.title}
                    </h2>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[0.9375rem] mt-4 mb-6">
                  {data.modules.health.desc}
                </p>

                {/* Screenshots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("health-observatory.png")} alt="Health Observatory" width={600} height={400} className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("health-facility-map.png")} alt="Facility Status Map" width={600} height={400} className="w-full h-auto" />
                  </div>
                </div>

                {/* How it works */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{data.howItWorks}</p>
                  {data.modules.health.steps.map((step, idx) => (
                    <StepRow key={idx} icon={step.icon} label={step.label} detail={step.detail} />
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Module 4: Education & Crisis ──────────────────────── */}
            <FadeIn>
              <section id="education" className="mb-12 sm:mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <GraduationCap className="h-4.5 w-4.5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider">{data.modules.education.num}</p>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                      {data.modules.education.title}
                    </h2>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[0.9375rem] mt-4 mb-6">
                  {data.modules.education.desc}
                </p>

                {/* Screenshots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("education-dashboard.png")} alt="Education Dashboard" width={600} height={400} className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={img("education-risk-index.png")} alt="Dropout Risk Index" width={600} height={400} className="w-full h-auto" />
                  </div>
                </div>

                {/* How it works */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{data.howItWorks}</p>
                  {data.modules.education.steps.map((step, idx) => (
                    <StepRow key={idx} icon={step.icon} label={step.label} detail={step.detail} />
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Engineering Challenges ────────────────────────────── */}
            <FadeIn>
              <section id="challenges" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.challengesTitle}
                </h2>
                <div className="space-y-4">
                  {data.challenges.map((challenge, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 p-6 bg-white hover:shadow-sm transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          <challenge.icon className="h-5 w-5 text-slate-400" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 mb-1">
                            {challenge.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {challenge.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Future Roadmap ────────────────────────────────────── */}
            <FadeIn>
              <section id="roadmap" className="mb-16 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                  {data.roadmapTitle}
                </h2>
                <p className="text-slate-500 mb-8 text-[0.9375rem]">
                  {data.roadmapDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.roadmap.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-6 hover:border-accent/30 hover:bg-accent-muted/30 transition-all">
                      <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3">
                        <item.icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">{item.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
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
