import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/utils/dictionary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: paramLang } = await params;
  const lang = paramLang as 'en' | 'ar';
  const dict = await getDictionary(lang);
  const title = dict.site.title ? `${dict.site.name} — ${dict.site.title}` : dict.site.name;
  const description = lang === 'ar'
    ? `${dict.site.name} — محلل بيانات ومهندس بيانات يعمل في تقييم الأداء، أتمتة البيانات، وذكاء الأعمال للمؤسسات التجارية والإنسانية.`
    : `${dict.site.name} — Data Analyst & Data Engineer working in performance evaluation, data automation, and business intelligence for commercial and humanitarian organizations.`;
  
  return {
    metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://abdulsalamalashwal.com'),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: dict.site.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: paramLang } = await params;
  const lang = paramLang as 'en' | 'ar';
  const dict = await getDictionary(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const fontClass = lang === 'ar' ? tajawal.variable : inter.variable;

  return (
    <html lang={lang} dir={dir} className={`${fontClass} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/profile-circle.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://abdulsalamalashwal.com/#person",
                  "name": "Abdulsalam Al-Ashwal",
                  "alternateName": "عبدالسلام الأشول",
                  "jobTitle": "Data Analyst & Data Engineer",
                  "url": "https://abdulsalamalashwal.com",
                  "email": "abdulsalamalashwal@outlook.com",
                  "telephone": "+967775032054",
                  "image": "https://abdulsalamalashwal.com/images/profile-circle.png",
                  "sameAs": [
                    "https://www.linkedin.com/in/abdulsalam-alashwal/"
                  ],
                  "knowsAbout": [
                    "Data Engineering",
                    "Data Analysis",
                    "Python",
                    "SQL",
                    "PostgreSQL",
                    "Power BI",
                    "SAP ERP",
                    "ETL Pipelines",
                    "Business Intelligence",
                    "Performance Evaluation",
                    "Monitoring & Evaluation"
                  ],
                  "worksFor": {
                    "@type": "Organization",
                    "name": "TNSC"
                  },
                  "alumniOf": [
                    {
                      "@type": "EducationalOrganization",
                      "name": "International University of Technology Twintech (IUTT)"
                    },
                    {
                      "@type": "EducationalOrganization",
                      "name": "Youth Leadership Development Foundation (YLDF)"
                    }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://abdulsalamalashwal.com/#website",
                  "url": "https://abdulsalamalashwal.com",
                  "name": "Abdulsalam Al-Ashwal — Portfolio",
                  "author": { "@id": "https://abdulsalamalashwal.com/#person" },
                  "inLanguage": ["en", "ar"]
                }
              ]
            })
          }}
        />
      </head>
      <body className={`min-h-screen flex flex-col font-sans text-foreground antialiased bg-background ${lang === 'ar' ? 'font-arabic' : ''}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar config={dict.site} lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer config={dict.site} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
