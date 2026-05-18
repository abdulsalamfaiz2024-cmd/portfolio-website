"use client";

import Link from "next/link";
import { Download, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import type { SiteConfig } from "@/types";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
  config: SiteConfig;
  lang?: "en" | "ar";
}

export function Navbar({ config, lang = "en" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = lang === 'ar' ? [
    { href: `/${lang}#about`, label: "نبذة" },
    { href: `/${lang}#experience`, label: "الخبرة" },
    { href: `/${lang}#gallery`, label: "في العمل" },
    { href: `/${lang}#projects`, label: "المشاريع" },
    { href: `/${lang}#credentials`, label: "الشهادات" },
    { href: `/${lang}#contact`, label: "تواصل معي" },
  ] : [
    { href: `/${lang}#about`, label: "About" },
    { href: `/${lang}#experience`, label: "Experience" },
    { href: `/${lang}#gallery`, label: "In Action" },
    { href: `/${lang}#projects`, label: "Projects" },
    { href: `/${lang}#credentials`, label: "Credentials" },
    { href: `/${lang}#contact`, label: "Contact" },
  ];

  const toggleLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'العربية' : 'English';

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] flex items-center justify-between">
        {/* Logo / Name */}
        <Link href={`/${lang}`} className="flex items-baseline gap-2.5">
          <span className="font-extrabold text-lg tracking-tight text-slate-900">
            {config.name}
          </span>
          <span className="hidden sm:inline text-sm text-slate-500 font-normal">
            {config.title}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>

          <ThemeToggle />

          <a
            href={`/${toggleLang}`}
            className="flex items-center gap-1.5 text-[0.8125rem] font-bold text-accent hover:text-accent-hover transition-colors"
            dir="ltr"
          >
            <Globe className="h-3.5 w-3.5" />
            {langLabel}
          </a>

          <a
            href={config.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-100 px-4 py-2 text-[0.8125rem] font-medium text-white dark:text-slate-900 transition-all duration-200 hover:bg-slate-800 dark:hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Download className="h-3.5 w-3.5" />
            {lang === 'ar' ? 'تحميل السيرة الذاتية' : 'Resume'}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <a
            href={`/${toggleLang}`}
            className="flex items-center gap-1.5 text-[0.8125rem] font-bold text-accent hover:text-accent-hover transition-colors px-2"
            dir="ltr"
          >
            <Globe className="h-4 w-4" />
            {langLabel}
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-900 dark:text-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8 pb-6 pt-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={config.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white w-full justify-center"
          >
            <Download className="h-4 w-4" />
            {lang === 'ar' ? 'تحميل السيرة الذاتية' : 'Download Resume'}
          </a>
        </div>
      )}
    </header>
  );
}
