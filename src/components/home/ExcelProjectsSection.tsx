import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getExcelProjects, type ExcelLocale } from "@/data/excelProjects";

export function ExcelProjectsSection({ lang }: { lang: ExcelLocale }) {
  const arabic = lang === "ar";
  const projects = getExcelProjects(lang);

  return (
    <section id="excel-projects" className="relative bg-slate-50 py-24 md:py-32 scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-12 max-w-3xl md:mb-16">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wide text-blue-700">
              <FileSpreadsheet className="h-4 w-4" />
              {arabic ? "مشاريع Excel التطبيقية" : "PRACTICAL EXCEL CASE STUDIES"}
            </span>
            <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              {arabic ? "التحليل التجاري والتدقيق المالي" : "Commercial analytics & financial controls"}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {arabic
                ? "دراستان تطبيقيتان توضحان كيف أحوّل سجلات المبيعات والأسعار إلى مؤشرات قابلة للفحص، واستثناءات واضحة، ونتائج تساعد على اتخاذ القرار. يمكنك تصفح المنهجية والحصول على مصنفات Excel نفسها."
                : "Two hands-on cases showing how I turn sales and pricing records into auditable metrics, clear exceptions and actionable findings. Explore the methodology and download the original Excel workbooks."}
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.1} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_38px_-22px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_55px_-22px_rgba(15,23,42,0.25)]">
                <Link href={`/${lang}/projects/excel/${project.slug}`} className="block" aria-label={project.title}>
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100 bg-white">
                    <Image
                      src={project.preview}
                      alt={project.previewAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="mb-3 text-xs font-bold tracking-wide text-blue-700">{project.category}</p>
                  <h3 className="mb-3 text-2xl font-extrabold leading-snug text-slate-900">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-sm leading-7 text-slate-600">{project.summary}</p>
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <span className="block text-xl font-extrabold text-slate-900" dir="ltr">{metric.value}</span>
                        <span className="mt-1 block text-xs text-slate-500">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                    <Link
                      href={`/${lang}/projects/excel/${project.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                    >
                      {arabic ? "استعراض دراسة الحالة" : "Explore the case"}
                      <ArrowRight className={`h-4 w-4 ${arabic ? "rotate-180" : ""}`} />
                    </Link>
                    <a
                      href={project.download}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
                      aria-label={arabic ? `تحميل ملف Excel: ${project.title}` : `Download Excel workbook: ${project.title}`}
                    >
                      <Download className="h-4 w-4" />
                      {arabic ? "تحميل ملف Excel" : "Download Excel"}
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-white/70 p-4 text-sm leading-7 text-slate-600">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
          <p>
            {arabic
              ? "جميع الأرقام تخص مجموعات بيانات تدريبية ومعرض أعمال، وليست بيانات عملاء أو معلومات تشغيلية سرية. تتضمن ملفات Excel أوراقًا للتدقيق والمطابقة."
              : "All figures come from sample portfolio datasets, not confidential client records. The downloadable workbooks include audit and reconciliation sheets."}
          </p>
        </div>
      </div>
    </section>
  );
}
