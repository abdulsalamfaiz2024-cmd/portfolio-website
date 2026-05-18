import 'server-only';

export const getDictionary = async (locale: 'en' | 'ar') => {
  if (locale === 'ar') {
    return {
      site: (await import('@/data/ar/site.json')).default,
      hero: (await import('@/data/ar/hero.json')).default,
      experience: (await import('@/data/ar/experience.json')).default,
      projects: (await import('@/data/ar/projects.json')).default,
      credentials: (await import('@/data/ar/credentials.json')).default,
    };
  }
  return {
    site: (await import('@/data/en/site.json')).default,
    hero: (await import('@/data/en/hero.json')).default,
    experience: (await import('@/data/en/experience.json')).default,
    projects: (await import('@/data/en/projects.json')).default,
    credentials: (await import('@/data/en/credentials.json')).default,
  };
};
