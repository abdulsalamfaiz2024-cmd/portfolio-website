import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Abdulsalam Al-Ashwal - Data Analyst & Data Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Read local profile image safely
  const imagePath = join(process.cwd(), 'public', 'images', 'profile.jpeg');
  const imageBuffer = readFileSync(imagePath);
  const imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0284c7)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '80px 100px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            textShadow: '0 4px 10px rgba(0,0,0,0.5)' 
          }}>
            Abdulsalam Al-Ashwal
          </h1>
          
          <p style={{ 
            fontSize: '36px', 
            color: '#bae6fd', 
            fontWeight: 500,
            marginBottom: '40px'
          }}>
            Data Analyst & Data Engineer
          </p>
          
          <p style={{ 
            fontSize: '28px', 
            color: '#e2e8f0',
            lineHeight: 1.4
          }}>
            Specializing in performance evaluation, data automation, and business intelligence.
          </p>
          <p style={{ 
            fontSize: '28px', 
            color: '#e2e8f0',
            lineHeight: 1.4,
            marginTop: '20px'
          }}>
            متخصص في تقييم الأداء، أتمتة البيانات، وذكاء الأعمال.
          </p>
        </div>
        
        <div style={{ display: 'flex', width: '40%', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={imageBase64}
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '160px',
              border: '8px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 40px rgba(14, 165, 233, 0.5)',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
