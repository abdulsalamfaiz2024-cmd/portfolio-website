"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Table2,
  Shield,
  Search,
  GitBranch,
  FileCode2,
  BarChart3,
  Layers,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ── Content ────────────────────────────────────────────────────────── */
const content = {
  en: {
    back: "Back to Projects",
    title: "Enterprise Database Architecture",
    subtitle: "Normalized relational database for an NGO consulting firm — replacing scattered spreadsheets with a structured, auditable data layer.",
    metrics: [
      { value: "36", label: "Tables designed" },
      { value: "3NF", label: "Normalization level" },
      { value: "6", label: "Reporting views" },
    ],
    tocTitle: "On this page",
    tocSections: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "The Problem" },
      { id: "design", label: "Schema Design" },
      { id: "highlights", label: "Technical Highlights" },
      { id: "views", label: "Reporting Views" },
      { id: "stack", label: "Tech Stack" },
    ],
    tags: ["PostgreSQL", "Database Design", "SQL", "Data Engineering", "ERD"],

    overviewTitle: "Project Overview",
    overviewText: "Designed a full relational database for a consulting company that helps local NGOs with monitoring & evaluation, data management, and capacity building. The database replaced ad-hoc Excel workflows with a normalized schema covering the full consulting lifecycle: client organizations, engagements, deliverables, grants, projects, beneficiary tracking, M&E indicators, and financial operations.",
    confidentialTitle: "Confidentiality Note",
    confidentialText: "All schemas shown here are generalized reference designs. No proprietary data, client names, or internal business logic from any organization is included.",

    problemTitle: "The Problem",
    problemItems: [
      "Data lived in dozens of disconnected spreadsheets with no referential integrity.",
      "Reporting required manual copy-paste from multiple files, taking hours each week.",
      "No audit trail — changes to records were untraceable.",
      "Beneficiary counts were duplicated across sheets with no deduplication logic.",
      "Budget tracking and invoice reconciliation happened in separate, unlinked files.",
    ],

    designTitle: "Schema Design",
    designSubtitle: "The database is organized into 8 logical modules, each handling a distinct part of the consulting operation.",
    modules: [
      {
        icon: Database,
        number: "01",
        title: "Organizations & Locations",
        tables: "sectors · governorates · districts · organizations · contacts",
        description: "Central registry of all external entities — NGO clients, donors, UN agencies, and government bodies — with humanitarian sector tagging and Yemeni administrative divisions.",
      },
      {
        icon: Table2,
        number: "02",
        title: "Staff & Competencies",
        tables: "departments · staff · competency_areas · staff_competencies",
        description: "TNSC team management with department hierarchy, employment types, daily rates, and a skill matrix with 1–5 proficiency levels.",
      },
      {
        icon: GitBranch,
        number: "03",
        title: "Consulting Engagements",
        tables: "engagements · deliverables · engagement_staff · timesheets",
        description: "Full contract lifecycle — from draft to completed. Tracks deliverable status, staff assignments with allocated days, and daily timesheet entries per engagement.",
      },
      {
        icon: Layers,
        number: "04",
        title: "Grants & Funding",
        tables: "grants · grant_budget_lines · disbursements",
        description: "Donor funding management: grant awards with multi-sector and multi-location tagging, budget allocation by category, and tranche-based disbursement tracking.",
      },
      {
        icon: BarChart3,
        number: "05",
        title: "Projects & Beneficiaries",
        tables: "projects · activities · beneficiary_groups · beneficiary_records",
        description: "NGO project tracking with activity breakdowns, geographic locations, and monthly beneficiary counts disaggregated by sex and age group.",
      },
      {
        icon: Search,
        number: "06",
        title: "Monitoring & Evaluation",
        tables: "indicator_frameworks · indicators · targets · results · reports",
        description: "Logframe-style M&E: versioned indicator frameworks, baseline values, period-based targets, verified actuals, and donor report submission tracking.",
      },
      {
        icon: FileCode2,
        number: "07",
        title: "Financial Operations",
        tables: "invoices · invoice_lines · payments · expenses",
        description: "TNSC billing with generated columns for tax and totals, line-item detail, payment reconciliation, and expense tracking with approval workflows.",
      },
      {
        icon: Shield,
        number: "08",
        title: "Indexes & Views",
        tables: "25+ indexes · 6 reporting views",
        description: "Partial indexes on status columns, composite indexes for common joins, and pre-built views for engagement dashboards, grant utilization, and overdue item alerts.",
      },
    ],

    highlightsTitle: "Technical Highlights",
    highlights: [
      { title: "UUID Primary Keys", desc: "Business entities use UUIDs for safe distribution and API readiness. Lookup tables use serial IDs for simplicity." },
      { title: "Generated Columns", desc: "Invoice tax_amount and total_amount are computed at the database level using GENERATED ALWAYS AS — no application drift." },
      { title: "Partial Indexes", desc: "Indexes filtered by status (e.g., only active engagements, only unpaid invoices) keep query plans fast on the rows that get queried." },
      { title: "CHECK Constraints", desc: "Business rules enforced at the database level: date ordering, positive amounts, proficiency ranges (1–5), and party validation." },
      { title: "Bilingual Columns", desc: "User-facing reference data includes name and name_ar columns — matching the Arabic-first operational context." },
      { title: "Soft Deletes", desc: "is_active flags instead of DELETE — preserving full audit history for donor compliance." },
    ],

    viewsTitle: "Reporting Views",
    viewsSubtitle: "Pre-built SQL views that power dashboards and periodic reporting.",
    views: [
      { name: "v_engagement_summary", desc: "One row per engagement: deliverable progress, hours logged, revenue billed, and payments received." },
      { name: "v_grant_utilization", desc: "Disbursement tracking per grant with utilization percentage and remaining balance." },
      { name: "v_staff_utilization", desc: "Monthly hours per consultant split by billable vs non-billable, with engagement count." },
      { name: "v_indicator_achievement", desc: "Target vs actual for each M&E indicator with achievement percentage." },
      { name: "v_beneficiary_reach", desc: "Beneficiary totals per project per period, disaggregated by sex and group." },
      { name: "v_overdue_items", desc: "Combined list of overdue deliverables and unpaid invoices, sorted by urgency." },
    ],

    stackTitle: "Tech Stack",
    stackItems: [
      { layer: "Database", detail: "PostgreSQL 15+ — uuid-ossp, pgcrypto, generated columns, partial indexes" },
      { layer: "Visualization", detail: "Power BI (DirectQuery / Import mode)" },
      { layer: "Application Layer", detail: "Python (psycopg2 / SQLAlchemy)" },
      { layer: "Version Control", detail: "Numbered migration scripts (00–08)" },
    ],

    ctaTitle: "Interested in learning more?",
    ctaDesc: "Get in touch to discuss this project or explore collaboration.",
    ctaContact: "Contact Me",
    ctaAll: "View All Projects",
  },
  ar: {
    back: "العودة للمشاريع",
    title: "معمارية قواعد بيانات المؤسسات",
    subtitle: "قاعدة بيانات علائقية منظمة لشركة استشارات تخدم المنظمات غير الحكومية — استبدال الجداول الإلكترونية المتفرقة بطبقة بيانات منظمة وقابلة للمراجعة.",
    metrics: [
      { value: "36", label: "جدول تم تصميمه" },
      { value: "3NF", label: "مستوى التطبيع" },
      { value: "6", label: "عروض تقارير" },
    ],
    tocTitle: "في هذه الصفحة",
    tocSections: [
      { id: "overview", label: "نظرة عامة" },
      { id: "problem", label: "المشكلة" },
      { id: "design", label: "تصميم المخطط" },
      { id: "highlights", label: "أبرز النقاط التقنية" },
      { id: "views", label: "عروض التقارير" },
      { id: "stack", label: "التقنيات المستخدمة" },
    ],
    tags: ["PostgreSQL", "تصميم قواعد البيانات", "SQL", "هندسة البيانات", "ERD"],

    overviewTitle: "نظرة عامة على المشروع",
    overviewText: "تصميم قاعدة بيانات علائقية كاملة لشركة استشارات تساعد المنظمات غير الحكومية المحلية في المتابعة والتقييم وإدارة البيانات وبناء القدرات. استبدلت قاعدة البيانات سير عمل Excel العشوائي بمخطط منظم يغطي دورة الاستشارات الكاملة: المنظمات العميلة، العقود، المخرجات، المنح، المشاريع، تتبع المستفيدين، مؤشرات المتابعة والتقييم، والعمليات المالية.",
    confidentialTitle: "ملاحظة حول السرية",
    confidentialText: "جميع المخططات المعروضة هنا تصاميم مرجعية عامة. لا تتضمن أي بيانات خاصة أو أسماء عملاء أو منطق أعمال داخلي لأي مؤسسة.",

    problemTitle: "المشكلة",
    problemItems: [
      "البيانات كانت موزعة في عشرات الجداول الإلكترونية المنفصلة بدون سلامة مرجعية.",
      "إعداد التقارير كان يتطلب نسخ ولصق يدوي من ملفات متعددة، ويستغرق ساعات أسبوعياً.",
      "لا يوجد سجل مراجعة — التغييرات على السجلات كانت غير قابلة للتتبع.",
      "أعداد المستفيدين كانت مكررة عبر الجداول بدون منطق لإزالة التكرار.",
      "تتبع الميزانية ومطابقة الفواتير كان يتم في ملفات منفصلة وغير مرتبطة.",
    ],

    designTitle: "تصميم المخطط",
    designSubtitle: "قاعدة البيانات منظمة في 8 وحدات منطقية، كل واحدة تتعامل مع جزء مختلف من عمليات الاستشارات.",
    modules: [
      {
        icon: Database,
        number: "01",
        title: "المنظمات والمواقع",
        tables: "sectors · governorates · districts · organizations · contacts",
        description: "سجل مركزي لجميع الجهات الخارجية — منظمات غير حكومية، مانحين، وكالات أممية، وجهات حكومية — مع تصنيف القطاعات الإنسانية والتقسيمات الإدارية اليمنية.",
      },
      {
        icon: Table2,
        number: "02",
        title: "الموظفون والكفاءات",
        tables: "departments · staff · competency_areas · staff_competencies",
        description: "إدارة فريق العمل مع التسلسل الإداري وأنواع التوظيف والمعدلات اليومية ومصفوفة مهارات بمستويات كفاءة من 1 إلى 5.",
      },
      {
        icon: GitBranch,
        number: "03",
        title: "عقود الاستشارات",
        tables: "engagements · deliverables · engagement_staff · timesheets",
        description: "دورة العقد الكاملة — من المسودة إلى الإنجاز. تتبع حالة المخرجات، تعيينات الموظفين بالأيام المخصصة، وسجلات ساعات العمل اليومية.",
      },
      {
        icon: Layers,
        number: "04",
        title: "المنح والتمويل",
        tables: "grants · grant_budget_lines · disbursements",
        description: "إدارة تمويل المانحين: منح مع تصنيف متعدد القطاعات والمواقع، توزيع الميزانية حسب الفئة، وتتبع صرف الدفعات.",
      },
      {
        icon: BarChart3,
        number: "05",
        title: "المشاريع والمستفيدون",
        tables: "projects · activities · beneficiary_groups · beneficiary_records",
        description: "تتبع مشاريع المنظمات مع تفاصيل الأنشطة، المواقع الجغرافية، وأعداد المستفيدين الشهرية مصنفة حسب الجنس والفئة العمرية.",
      },
      {
        icon: Search,
        number: "06",
        title: "المتابعة والتقييم",
        tables: "indicator_frameworks · indicators · targets · results · reports",
        description: "متابعة وتقييم بأسلوب الإطار المنطقي: أطر مؤشرات مع إصدارات، قيم أساسية، أهداف دورية، نتائج فعلية موثقة، وتتبع تقديم التقارير للمانحين.",
      },
      {
        icon: FileCode2,
        number: "07",
        title: "العمليات المالية",
        tables: "invoices · invoice_lines · payments · expenses",
        description: "فوترة مع أعمدة محسوبة للضريبة والإجمالي، تفاصيل بنود الفاتورة، مطابقة المدفوعات، وتتبع المصروفات مع سير عمل الموافقة.",
      },
      {
        icon: Shield,
        number: "08",
        title: "الفهارس والعروض",
        tables: "25+ فهارس · 6 عروض تقارير",
        description: "فهارس جزئية على أعمدة الحالة، فهارس مركبة للربط، وعروض جاهزة للوحات تحكم العقود واستخدام المنح وتنبيهات العناصر المتأخرة.",
      },
    ],

    highlightsTitle: "أبرز النقاط التقنية",
    highlights: [
      { title: "مفاتيح أساسية UUID", desc: "الكيانات التجارية تستخدم UUID للتوزيع الآمن وجاهزية API. جداول المراجع تستخدم معرفات تسلسلية للبساطة." },
      { title: "أعمدة محسوبة", desc: "مبلغ الضريبة والإجمالي في الفواتير يُحسبان على مستوى قاعدة البيانات باستخدام GENERATED ALWAYS AS — لا انحراف في التطبيق." },
      { title: "فهارس جزئية", desc: "فهارس مفلترة حسب الحالة (مثلاً: العقود النشطة فقط، الفواتير غير المدفوعة فقط) تحافظ على سرعة الاستعلام." },
      { title: "قيود CHECK", desc: "قواعد العمل مفروضة على مستوى قاعدة البيانات: ترتيب التواريخ، المبالغ الموجبة، نطاقات الكفاءة (1-5)." },
      { title: "أعمدة ثنائية اللغة", desc: "البيانات المرجعية تتضمن عمود name و name_ar — مطابقة للسياق التشغيلي العربي." },
      { title: "حذف ناعم", desc: "علامات is_active بدلاً من DELETE — للحفاظ على سجل مراجعة كامل لامتثال المانحين." },
    ],

    viewsTitle: "عروض التقارير",
    viewsSubtitle: "عروض SQL جاهزة تشغّل لوحات التحكم والتقارير الدورية.",
    views: [
      { name: "v_engagement_summary", desc: "صف واحد لكل عقد: تقدم المخرجات، الساعات المسجلة، الإيرادات المفوترة، والمدفوعات المستلمة." },
      { name: "v_grant_utilization", desc: "تتبع صرف المنح مع نسبة الاستخدام والرصيد المتبقي." },
      { name: "v_staff_utilization", desc: "ساعات شهرية لكل مستشار مقسمة بين قابلة للفوترة وغير قابلة، مع عدد العقود." },
      { name: "v_indicator_achievement", desc: "المستهدف مقابل الفعلي لكل مؤشر متابعة وتقييم مع نسبة الإنجاز." },
      { name: "v_beneficiary_reach", desc: "إجمالي المستفيدين لكل مشروع لكل فترة، مصنف حسب الجنس والفئة." },
      { name: "v_overdue_items", desc: "قائمة مجمعة للمخرجات المتأخرة والفواتير غير المدفوعة، مرتبة حسب الأولوية." },
    ],

    stackTitle: "التقنيات المستخدمة",
    stackItems: [
      { layer: "قاعدة البيانات", detail: "PostgreSQL 15+ — uuid-ossp, pgcrypto, أعمدة محسوبة, فهارس جزئية" },
      { layer: "التصور", detail: "Power BI (DirectQuery / Import)" },
      { layer: "طبقة التطبيق", detail: "Python (psycopg2 / SQLAlchemy)" },
      { layer: "التحكم بالإصدارات", detail: "ملفات ترحيل مرقمة (00-08)" },
    ],

    ctaTitle: "مهتم بمعرفة المزيد؟",
    ctaDesc: "تواصل معي لمناقشة هذا المشروع أو استكشاف فرص التعاون.",
    ctaContact: "تواصل معي",
    ctaAll: "عرض كل المشاريع",
  },
};

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
   TNSC Database Architecture — Case Study Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function TNSCDatabaseCaseStudy() {
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
            {lang === "ar" ? (
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
                      className={`block text-[0.8125rem] py-1.5 px-3 ${lang === "ar" ? "border-r-2" : "border-l-2"} transition-all duration-200 ${
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

                {/* Confidentiality callout */}
                <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {data.confidentialTitle}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {data.confidentialText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project image */}
                <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image
                    src="/images/Enterprise Database Architecture.png"
                    alt="Enterprise Database Architecture Diagram"
                    width={1200}
                    height={700}
                    className="w-full h-auto"
                  />
                </div>
              </section>
            </FadeIn>

            {/* ── The Problem ───────────────────────────────────────── */}
            <FadeIn>
              <section id="problem" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.problemTitle}
                </h2>
                <div className="space-y-3">
                  {data.problemItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-slate-600 text-[0.9375rem]">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Schema Design (modules) ───────────────────────────── */}
            <FadeIn>
              <section id="design" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                  {data.designTitle}
                </h2>
                <p className="text-slate-500 mb-10 text-[0.9375rem]">
                  {data.designSubtitle}
                </p>

                <div className="space-y-4">
                  {data.modules.map((mod, i) => (
                    <FadeIn key={mod.title} delay={i * 0.04}>
                      <div className="group flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-xl border border-slate-200 p-5 sm:p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                        <div className="shrink-0 flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-accent/5 group-hover:border-accent/20 transition-colors">
                            <mod.icon className="h-4.5 w-4.5 text-slate-400 group-hover:text-accent transition-colors" />
                          </div>
                          <span className="text-[0.6875rem] font-bold text-slate-300 tracking-wider">
                            {mod.number}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-slate-900 mb-1">
                            {mod.title}
                          </h3>
                          <p className="text-xs font-mono text-accent/70 mb-2">{mod.tables}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {mod.description}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Technical Highlights ──────────────────────────────── */}
            <FadeIn>
              <section id="highlights" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-8">
                  {data.highlightsTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.highlights.map((h) => (
                    <div
                      key={h.title}
                      className="rounded-xl border border-slate-200 p-5 bg-white hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <p className="text-sm font-bold text-slate-900">{h.title}</p>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Reporting Views ───────────────────────────────────── */}
            <FadeIn>
              <section id="views" className="mb-12 sm:mb-20 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                  {data.viewsTitle}
                </h2>
                <p className="text-slate-500 mb-8 text-[0.9375rem]">{data.viewsSubtitle}</p>
                <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                  {data.views.map((v) => (
                    <div key={v.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-4 hover:bg-slate-50/50 transition-colors">
                      <code className="text-xs font-mono font-bold text-accent shrink-0 min-w-[200px]">
                        {v.name}
                      </code>
                      <p className="text-sm text-slate-500">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* ── Tech Stack ────────────────────────────────────────── */}
            <FadeIn>
              <section id="stack" className="mb-16 scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
                  {data.stackTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.stackItems.map((item) => (
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
              </section>
            </FadeIn>

            {/* ── Bottom CTA ────────────────────────────────────────── */}
            <FadeIn>
              <div className="border-t border-slate-100 pt-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{data.ctaTitle}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{data.ctaDesc}</p>
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
