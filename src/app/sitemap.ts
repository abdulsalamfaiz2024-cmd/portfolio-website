import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://abdulsalamalashwal.com';

  const lastModified = new Date();

  return [
    // English pages
    { url: `${baseUrl}/en`, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/en/projects/phonixpro`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/projects/yemen-nexus`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/projects/podcast-etl`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/projects/tnsc-database`, lastModified, changeFrequency: 'monthly', priority: 0.8 },

    // Arabic pages
    { url: `${baseUrl}/ar`, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/ar/projects/phonixpro`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ar/projects/yemen-nexus`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ar/projects/podcast-etl`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ar/projects/tnsc-database`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
