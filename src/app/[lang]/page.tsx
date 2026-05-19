import { Hero } from "@/components/home/Hero";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { getDictionary } from "@/utils/dictionary";

import type { ExperienceEntry, ProjectEntry, CredentialsData, HeroData, SiteConfig } from "@/types";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang = paramLang as 'en' | 'ar';
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero
        data={dict.hero as HeroData}
        config={dict.site as SiteConfig}
        lang={lang}
      />
      <ExperienceTimeline entries={dict.experience as ExperienceEntry[]} lang={lang} />
      <PhotoGallery lang={lang} />
      <ProjectsGrid projects={dict.projects as ProjectEntry[]} lang={lang} />
      <CredentialsSection data={dict.credentials as CredentialsData} lang={lang} />
      <ContactSection config={dict.site as SiteConfig} lang={lang} />
    </>
  );
}
