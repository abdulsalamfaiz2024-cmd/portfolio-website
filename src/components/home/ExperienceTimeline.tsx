"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import type { ExperienceEntry } from "@/types";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
  lang?: "en" | "ar";
}

export function ExperienceTimeline({ entries, lang = "en" }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
            {lang === 'ar' ? "الخبرات" : "Experience"}
          </h2>
          <p className="text-slate-500 mb-14 max-w-xl">
            {lang === 'ar' 
              ? "أدوار تشمل تحليلات المؤسسات، المراقبة الإنسانية، والاستشارات التجارية."
              : "Roles spanning enterprise analytics, humanitarian monitoring, and business consulting."}
          </p>
        </FadeIn>

        <div className="space-y-0">
          {entries.map((entry, i) => (
            <FadeIn key={entry.id} delay={i * 0.06}>
              <div className={`relative flex gap-8 md:gap-12 pb-12 ${i < entries.length - 1 ? "" : ""}`}>
                {/* Left column: period + line */}
                <div className="hidden md:flex flex-col items-end w-36 shrink-0 pt-1">
                  <p className="text-xs font-medium text-slate-400 whitespace-nowrap">
                    {entry.period}
                  </p>
                </div>

                {/* Timeline spine */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 mt-1.5" />
                  {i < entries.length - 1 && (
                    <div className="w-px flex-1 bg-slate-200" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <p className="text-xs font-medium text-slate-400 mb-1 md:hidden">
                    {entry.period}
                  </p>
                  <h3 className="text-base font-bold text-slate-900">{entry.role}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{entry.company} · {entry.location}</p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {entry.summary}
                  </p>

                  {/* Metrics — inline, not in boxes */}
                  {entry.metrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                      {entry.metrics.map((m) => (
                        <p key={m.label} className="text-sm">
                          <span className="font-bold text-slate-900">{m.value}</span>
                          <span className="text-slate-400 ml-1.5">{m.label}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Tags — small, muted */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-400 bg-slate-100 rounded px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Image Removed */}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
