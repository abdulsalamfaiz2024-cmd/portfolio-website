import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getExcelProjects, type ExcelLocale } from "@/data/excelProjects";

export function ExcelProjectsSection({ lang }: { lang: ExcelLocale }) {
  const arabic = lang === "ar";
  const projects = getExcelProjects(lang);

  return (
    <section id="excel-projects" className="relative scroll-mt-20 bg-slate-50 py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-7 max-w-3xl md:mb-9">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
              {arabic ? "مشاريع Excel" : "Excel projects"}
            </span>
            <h2 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
              {arabic ? "نماذج أعمالي في الإكسل" : "My Excel Work Samples"}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              {arabic
                ? "نماذج عملية لتحليل المبيعات وتدقيق الأسعار، مع دراسات حالة وملفات Excel قابلة للتنزيل."
                : "Practical sales analysis and pricing audit examples, with case studies and downloadable Excel workbooks."}
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-blue-200 sm:flex-row">
                <Link
                  href={"/" + lang + "/projects/excel/" + project.slug}
                  className="relative block h-36 w-full shrink-0 overflow-hidden border-b border-slate-100 bg-white sm:h-auto sm:w-[37%] sm:border-b-0 sm:border-e"
                  aria-label={project.title}
                >
                  <Image
                    src={project.preview}
                    alt={project.previewAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 35vw, 20vw"
                    className="object-contain p-2.5 transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                  <p className="mb-1 text-[11px] font-bold text-blue-700">{project.category}</p>
                  <h3 className="mb-2 text-base font-extrabold leading-snug text-slate-900 sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-xs leading-5 text-slate-600 sm:text-sm">
                    {project.summary}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <span key={metric.label}>
                        <strong className="font-extrabold text-slate-800" dir="ltr">{metric.value}</strong>
                        {" "}{metric.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                    <Link
                      href={"/" + lang + "/projects/excel/" + project.slug}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      {arabic ? "دراسة الحالة" : "Case study"}
                      <ArrowRight className={"h-3.5 w-3.5 " + (arabic ? "rotate-180" : "")} aria-hidden="true" />
                    </Link>
                    <a
                      href={project.download}
                      download
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                      aria-label={arabic ? "تحميل ملف Excel: " + project.title : "Download Excel workbook: " + project.title}
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      {arabic ? "تحميل Excel" : "Excel file"}
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden="true" />
          {arabic
            ? "نماذج مبنية على بيانات تدريبية؛ لا تتضمن بيانات عملاء أو معلومات تشغيلية سرية."
            : "Sample datasets only; no confidential client or operational records."}
        </p>
      </div>
    </section>
  );
}
