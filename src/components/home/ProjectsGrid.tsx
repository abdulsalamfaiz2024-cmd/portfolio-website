"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ProjectEntry } from "@/types";

interface ProjectsGridProps {
  projects: ProjectEntry[];
  lang?: "en" | "ar";
}

export function ProjectsGrid({ projects, lang = "en" }: ProjectsGridProps) {
  return (
    <section id="projects" className="bg-white py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              {lang === 'ar' ? "أعمال مختارة" : "Selected Works"}
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              {lang === 'ar' ? "هندسة البيانات والذكاء الاصطناعي" : "Engineering Data & AI"}
            </h3>
            <p className="text-lg text-slate-500 leading-relaxed">
              {lang === 'ar' 
                ? "مجموعة من المنصات، مسارات البيانات، ولوحات التحكم التي تحل مشاكل معقدة وتحقق تأثيراً ملموساً."
                : "A collection of platforms, pipelines, and dashboards that solve complex problems and drive measurable impact."}
            </p>
          </div>
        </FadeIn>

        <div className="space-y-32 md:space-y-48">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            const hasImage = !!project.image;

            return (
              <FadeIn key={project.id} delay={0.1}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                  {/* Image Column */}
                  {hasImage ? (
                    <div className="w-full lg:w-[55%] group">
                      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 bg-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent z-10" />
                        <Image
                          src={project.image!}
                          alt={project.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full lg:w-[55%]">
                      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/40 via-slate-900 to-slate-900" />
                        <div className="relative z-10">
                          <p className="text-accent-light font-mono text-sm mb-4">{"{ architecture_design }"}</p>
                          <h4 className="text-3xl font-bold mb-4">{project.title}</h4>
                          <p className="text-slate-400 max-w-md mx-auto">{lang === 'ar' ? "نماذج بيانات وبنية تحتية خلفية على مستوى المؤسسات." : "Enterprise-grade data models and backend infrastructure."}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Text Column */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {project.category}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                       <p className="text-slate-600 leading-relaxed text-[1.05rem]">
                         <strong className="text-slate-900 font-semibold">{lang === 'ar' ? "التحدي: " : "The Challenge: "}</strong> 
                         {project.objective}
                       </p>
                       {project.solution && (
                         <p className="text-slate-600 leading-relaxed text-[1.05rem]">
                           <strong className="text-slate-900 font-semibold">{lang === 'ar' ? "الحل: " : "The Solution: "}</strong> 
                           {project.solution}
                         </p>
                       )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.techStack.map((t) => (
                        <span key={t} className="text-xs font-semibold text-slate-600 bg-slate-100/80 border border-slate-200/60 rounded-full px-3 py-1.5 shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10 pt-8 border-t border-slate-100">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-3xl font-black text-accent mb-1">{m.value}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Case study link */}
                    {(project.id === "phonixpro" || project.id === "yemen-nexus" || project.id === "podcast-extractor") && (
                      <div>
                        <Link
                          href={`/${lang}/projects/${project.id === "podcast-extractor" ? "podcast-etl" : project.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group"
                        >
                          {lang === 'ar' ? "تصفح دراسة الحالة" : "Explore Case Study"}
                          <ArrowRight className={`h-4 w-4 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
