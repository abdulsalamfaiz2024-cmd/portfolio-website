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

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.site.title ? `${dict.site.name} — ${dict.site.title}` : dict.site.name,
    description: dict.site.description,
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
  params: Promise<{ lang: 'en' | 'ar' }>;
}>) {
  const { lang } = await params;
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
