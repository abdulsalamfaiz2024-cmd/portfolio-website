import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Download, FileSpreadsheet, Layers3, ShieldCheck, Target } from "lucide-react";
import { getExcelProject, getExcelProjects, type ExcelLocale } from "@/data/excelProjects";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return (["ar", "en"] as const).flatMap((lang) =>
    getExcelProjects(lang).map((project) => ({ lang, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "ar" && lang !== "en") return {};
  const project = getExcelProject(lang, slug);
  if (!project) return {};
  return {
    title: `${project.title} — Abdulsalam Al-Ashwal`,
    description: project.summary,
    alternates: {
      languages: {
        ar: `/ar/projects/excel/${slug}`,
        en: `/en/projects/excel/${slug}`,
      },
    },
  };
}

export default async function ExcelProjectPage({ params }: Props) {
  const { lang: paramLang, slug } = await params;
  if (paramLang !== "ar" && paramLang !== "en") notFound();
  const lang: ExcelLocale = paramLang as ExcelLocale;
  const project = getExcelProject(lang, slug);
  if (!project) notFound();
  const ar = lang === "ar";

  const labels = ar
    ? {
        home: "الصفحة الرئيسية", back: "مشاريع Excel", case: "دراسة حالة",
        challenge: "التحدي", solution: "منهجية الحل", methodology: "مراحل التنفيذ",
        findings: "أبرز النتائج", controls: "التحقق وضوابط الجودة",
        gallery: "داخل المصنف", download: "تنزيل مصنف Excel الأصلي",
        source: "حول مصدر البيانات", next: "مشروع آخر",
      }
    : {
        home: "Home", back: "Excel projects", case: "Case study",
        challenge: "The challenge", solution: "The approach", methodology: "How it works",
        findings: "Key findings", controls: "Validation and data controls",
        gallery: "Inside the workbook", download: "Download the original Excel workbook",
        source: "About the source data", next: "Explore another project",
      };

  const otherProject = getExcelProjects(lang).find((item) => item.slug !== project.slug);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="border-b border-slate-100 bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label={ar ? "مسار التصفح" : "Breadcrumb"} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
            <Link href={`/${lang}`} className="hover:text-blue-700">{labels.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${lang}#excel-projects`} className="hover:text-blue-700">{labels.back}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-800">{project.title}</span>
          </nav>
        </div>
      </div>

      <article>
        <header className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-24 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
            <FileSpreadsheet className="h-4 w-4" />
            {project.category}
          </div>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.download}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              <Download className="h-4 w-4" /> {labels.download}
            </a>
            <Link
              href={`/${lang}#excel-projects`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700"
            >
              <ArrowRight className={`h-4 w-4 ${ar ? "" : "rotate-180"}`} /> {labels.back}
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_22px_65px_-32px_rgba(15,23,42,0.25)]">
            <div className="relative aspect-[16/10] bg-white">
              <Image src={project.preview} alt={project.previewAlt} fill priority sizes="(max-width: 1200px) 100vw, 1152px" className="object-contain p-2 md:p-6" />
            </div>
          </figure>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 md:px-6">
                <p className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl" dir="ltr">{metric.value}</p>
                <p className="mt-2 text-xs font-semibold text-slate-500 md:text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-slate-100 bg-slate-50/70 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
            <section>
              <div className="mb-4 flex items-center gap-2 text-blue-700"><Target className="h-5 w-5" /><h2 className="text-sm font-bold">{labels.challenge}</h2></div>
              <p className="text-base leading-8 text-slate-700">{project.challenge}</p>
            </section>
            <section>
              <div className="mb-4 flex items-center gap-2 text-blue-700"><Layers3 className="h-5 w-5" /><h2 className="text-sm font-bold">{labels.solution}</h2></div>
              <p className="text-base leading-8 text-slate-700">{project.solution}</p>
            </section>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <h2 className="mb-10 text-3xl font-extrabold text-slate-900">{labels.methodology}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mb-3 text-lg font-extrabold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-slate-100 bg-slate-50/70 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <section>
              <h2 className="mb-8 text-2xl font-extrabold text-slate-900 md:text-3xl">{labels.findings}</h2>
              <div className="space-y-5">
                {project.findings.map((finding) => (
                  <div key={finding} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                    <p className="text-sm leading-7 text-slate-700">{finding}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-8 flex items-center gap-3 text-2xl font-extrabold text-slate-900 md:text-3xl">
                <ShieldCheck className="h-7 w-7 text-blue-700" />{labels.controls}
              </h2>
              <div className="space-y-5">
                {project.controls.map((control) => (
                  <div key={control} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700" />
                    <p className="text-sm leading-7 text-slate-700">{control}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {project.gallery.length > 0 && (
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <h2 className="mb-9 text-3xl font-extrabold text-slate-900">{labels.gallery}</h2>
            <div className={`grid gap-7 ${project.gallery.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
              {project.gallery.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="relative aspect-[16/10] bg-white">
                    <Image src={image.src} alt={image.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-3" />
                  </div>
                  <figcaption className="border-t border-slate-100 px-5 py-4">
                    <strong className="block text-sm text-slate-900">{image.title}</strong>
                    <span className="mt-1 block text-sm leading-6 text-slate-500">{image.description}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="mb-3 text-base font-bold text-slate-900">{labels.source}</h2>
            <p className="max-w-4xl text-sm leading-7 text-slate-600">{project.datasetNote}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={project.download} download className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">
                <Download className="h-4 w-4" />{labels.download}
              </a>
              {otherProject && (
                <Link href={`/${lang}/projects/excel/${otherProject.slug}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:text-blue-700">
                  {labels.next}: {otherProject.title}
                  <ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
