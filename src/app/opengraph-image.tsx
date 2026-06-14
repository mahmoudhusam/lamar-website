import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/site'

export const alt = SITE_NAME
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #14181D 0%, #1A6B60 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: '#2ABFA8',
            }}
          />
          <div
            style={{
              fontSize: 30,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: '#2ABFA8',
              fontWeight: 700,
            }}
          >
            Lamar
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.05 }}>
            Stukadoor &amp;
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.05 }}>
            Onderhoud
          </div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.75)', marginTop: 28, maxWidth: 820 }}>
            Stucwerk · Interieurafwerking · Woningrenovatie — door heel Nederland
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
          200+ projecten voltooid · Kwaliteit die spreekt voor zich
        </div>
      </div>
    ),
    { ...size }
  )
}
