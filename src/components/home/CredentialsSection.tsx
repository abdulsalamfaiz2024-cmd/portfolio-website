"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircle2 } from "lucide-react";
import type { CredentialsData } from "@/types";

interface CredentialsSectionProps {
  data: CredentialsData;
  lang?: "en" | "ar";
}

export function CredentialsSection({ data, lang = "en" }: CredentialsSectionProps) {
  return (
    <section id="credentials" className="bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
            {lang === 'ar' ? "الشهادات" : "Credentials"}
          </h2>
          <p className="text-slate-500 mb-14 max-w-xl">
            {lang === 'ar' ? "الشهادات، التعليم، والأدوات التي أعمل بها يومياً." : "Certifications, education, and the tools I work with daily."}
          </p>
        </FadeIn>

        {/* Certifications and Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
          <FadeIn>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                {lang === 'ar' ? "الشهادات" : "Certifications"}
              </h3>
              <div className="space-y-5">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-4">
                    <div className="mt-0.5 h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-accent shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{cert.title}</p>
                      <p className="text-sm text-slate-500">
                        {cert.issuer} · {cert.date}
                        {cert.credentialUrl && (
                          <>
                            {" · "}
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:text-accent-hover transition-colors font-medium"
                            >
                              {lang === 'ar' ? "تحقق ↖" : "Verify ↗"}
                            </a>
                          </>
                        )}
                      </p>
                      {cert.description && (
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-lg">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="h-full flex flex-col justify-center">
              <div className="relative w-full rounded-xl overflow-hidden shadow-sm mx-auto lg:mx-0 bg-slate-900 flex items-center justify-center">
                <video
                  src="/videos/VID-20250715-WA0001.mp4"
                  controls
                  className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <FadeIn delay={0.05}>
            <div className="mb-14">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                {lang === 'ar' ? "التعليم" : "Education"}
              </h3>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex items-start gap-4">
                    <div className="mt-0.5 h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 text-xs font-bold">
                      🎓
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{edu.degree} — {edu.field}</p>
                      <p className="text-sm text-slate-500">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Skills — 3 columns, minimal */}
        <FadeIn delay={0.1}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
            {lang === 'ar' ? "المهارات التقنية" : "Technical Skills"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.skillCategories.map((cat) => (
              <div key={cat.id}>
                <p className="text-sm font-bold text-slate-900 mb-3">{cat.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs text-slate-500 bg-white border border-slate-200 rounded px-2.5 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
