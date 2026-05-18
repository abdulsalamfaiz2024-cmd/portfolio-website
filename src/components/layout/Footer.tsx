import { Mail } from "lucide-react";
import type { SiteConfig } from "@/types";

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} {config.name}</p>
          <div className="flex items-center gap-5">
            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">LinkedIn</a>
            <a href={config.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">GitHub</a>
            <a href={`mailto:${config.email}`} className="hover:text-slate-600 transition-colors">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
