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
  const description = "Data Analyst & Data Engineer | محلل ومهندس بيانات 👨‍💻\nSpecializing in performance evaluation, data automation, and BI | متخصص في تقييم الأداء، أتمتة البيانات، وذكاء الأعمال 🚀";
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://abdulsalamalashwal.com',
      siteName: dict.site.name,
      images: [
        {
          url: '/images/profile.jpeg',
          width: 800,
          height: 800,
          alt: dict.site.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/profile.jpeg'],
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
