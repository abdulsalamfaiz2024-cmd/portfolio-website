import { ImageResponse } from 'next/og';
import { getDictionary } from '@/utils/dictionary';

export const alt = 'Abdulsalam Al-Ashwal - Data Analyst & Data Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { lang: 'en' | 'ar' } }) {
  const dict = await getDictionary(params.lang);
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right bottom, #0f172a, #1e293b, #0284c7)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '80px',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '160px',
          height: '160px',
          borderRadius: '80px',
          background: 'rgba(255,255,255,0.1)',
          marginBottom: '50px',
          border: '4px solid rgba(255,255,255,0.3)',
          boxShadow: '0 0 40px rgba(14, 165, 233, 0.5)',
        }}>
          <span style={{ fontSize: '80px', fontWeight: 'bold', color: '#38bdf8' }}>A</span>
        </div>
        
        <h1 style={{ 
          fontSize: '72px', 
          fontWeight: 900, 
          marginBottom: '20px', 
          letterSpacing: '-0.02em', 
          textShadow: '0 4px 10px rgba(0,0,0,0.5)' 
        }}>
          {dict.site.name}
        </h1>
        
        <p style={{ 
          fontSize: '36px', 
          color: '#bae6fd', 
          fontWeight: 500, 
          letterSpacing: '0.05em' 
        }}>
          {dict.site.title}
        </p>
        
        <div style={{
          display: 'flex',
          marginTop: '60px',
          borderTop: '2px solid rgba(255,255,255,0.1)',
          paddingTop: '40px',
          fontSize: '24px',
          color: '#e2e8f0',
          fontWeight: 600
        }}>
          {params.lang === 'ar' ? 'اكتشف مشاريعي وخبراتي' : 'Explore my projects and experience'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
