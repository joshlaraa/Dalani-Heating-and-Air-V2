import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dalani Heating & Air Conditioning serving San Diego'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ background: '#fff', color: '#2d2928', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '68px 76px', width: '100%' }}>
    <div style={{ color: '#f27059', display: 'flex', fontSize: 24, fontWeight: 700, letterSpacing: 3 }}>DALANI HEATING &amp; AIR CONDITIONING</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ color: '#786c68', fontSize: 24, letterSpacing: 2 }}>RESIDENTIAL HVAC · SAN DIEGO</div>
      <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05 }}>Reliable comfort,<br />all year.</div>
      <div style={{ color: '#786c68', fontSize: 28 }}>Owner-operated heating and air conditioning service.</div>
    </div>
    <div style={{ color: '#f27059', display: 'flex', fontSize: 24, fontWeight: 700 }}>Clear answers. Comfortable spaces.</div>
  </div>, { ...size })
}
