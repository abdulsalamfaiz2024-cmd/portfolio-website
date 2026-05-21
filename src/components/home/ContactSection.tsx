"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Mail, CheckCircle2, Phone } from "lucide-react";
import type { SiteConfig } from "@/types";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

interface ContactSectionProps {
  config: SiteConfig;
  lang?: "en" | "ar";
}

export function ContactSection({ config, lang = "en" }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-slate-50 py-32 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl mb-8 text-accent">
            <Mail className="h-6 w-6" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            {lang === 'ar' ? "تواصل معي" : "Get in Touch"}
          </h2>
          
          <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            {lang === 'ar' 
              ? "أنا منفتح لأدوار هندسة البيانات والمشاريع الاستشارية. إذا كان عندك مشروع أو فرصة، تواصل معي."
              : "I'm open to data engineering roles and consulting projects. If you have something in mind, I'd be glad to hear about it."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-12 text-slate-700">
            <a href={`mailto:${config.email}`} className="flex items-center gap-3 hover:text-accent transition-colors group">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <span className="font-medium">{config.email}</span>
            </a>
            <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 hover:text-accent transition-colors group">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <span className="font-medium" dir="ltr">{config.phone}</span>
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-bold text-white hover:bg-accent-hover transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              {copied ? (lang === 'ar' ? "تم نسخ البريد!" : "Email Copied!") : (lang === 'ar' ? "نسخ البريد" : "Copy Email")}
            </button>
            
            <a
              href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white hover:bg-[#128C7E] transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              {lang === 'ar' ? "واتساب" : "WhatsApp"}
            </a>
            
            <a
              href={config.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white border border-slate-200 px-8 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <LinkedinIcon className="h-4 w-4 text-[#0A66C2]" />
              LinkedIn
            </a>
            
            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-slate-900/20"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
