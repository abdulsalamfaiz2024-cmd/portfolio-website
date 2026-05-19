"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { Download, ArrowRight } from "lucide-react";
import type { HeroData, SiteConfig } from "@/types";
import { ParticleNetwork } from "@/components/ui/ParticleNetwork";

interface HeroProps {
  data: HeroData;
  config: SiteConfig;
  lang?: "en" | "ar";
}

export function Hero({ data, config, lang = "en" }: HeroProps) {
  return (
    <section id="about" className="relative bg-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <ParticleNetwork />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Text content */}
          <FadeIn>
            <div className="flex-1 max-w-2xl">
              <p className="text-accent font-medium text-sm mb-4">
                {data.badge || config.title}
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                {data.headlineAccent}
                <span className="text-slate-400 font-semibold"> — </span>
                <span className="text-slate-600 font-bold">{data.headlineSuffix}</span>
              </h1>

              <p className="mt-6 text-slate-600 leading-relaxed">
                {data.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={config.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  {lang === 'ar' ? "تحميل السيرة الذاتية" : "Download Resume"}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {lang === 'ar' ? "تواصل معي" : "Get in Touch"}
                  <ArrowRight className={`h-3.5 w-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                <span>Python</span>
                <span className="text-slate-200">·</span>
                <span>SQL</span>
                <span className="text-slate-200">·</span>
                <span>Power BI</span>
                <span className="text-slate-200">·</span>
                <span>SAP ERP</span>
                <span className="text-slate-200">·</span>
                <span>Apache Spark</span>
                <span className="text-slate-200">·</span>
                <span>Tableau</span>
              </div>
            </div>
          </FadeIn>

          {/* Profile photo */}
          <FadeIn delay={0.1}>
            <div className="shrink-0 flex justify-center md:justify-end">
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm">
                <Image
                  src="/images/abdulsalam_hero.jpg"
                  alt={config.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Competencies Grid */}
        <FadeIn delay={0.2} className="mt-20 pt-16 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.competencies.map((comp, i) => {
              // Dynamically get the icon from lucide-react
              // using a hardcoded switch for the specific icons used in hero.json
              // to ensure compatibility with Next.js compiling
              const getIcon = (name: string) => {
                switch (name) {
                  case 'Database': return require('lucide-react').Database;
                  case 'BarChart3': return require('lucide-react').BarChart3;
                  case 'Globe': return require('lucide-react').Globe;
                  case 'BrainCircuit': return require('lucide-react').BrainCircuit;
                  default: return require('lucide-react').CheckCircle2;
                }
              };
              const Icon = getIcon(comp.icon);
              
              return (
                <div key={comp.label} className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{comp.label}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{comp.description}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
