import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'

export const alt = 'RaaVon. Ambitious ideas. Thoughtfully built.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Social card: Noir, the official rosette cropped at the right edge, one clear message. */
export default async function Image() {
  const rosette = await readFile(join(process.cwd(), 'public/brand/rosette.png'))
  const src = `data:image/png;base64,${rosette.toString('base64')}`
  const logo = await readFile(join(process.cwd(), 'public/brand/raavon-logo-on-dark.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0B0B0E',
          position: 'relative',
          overflow: 'hidden',
          padding: '72px 80px',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={860} height={860} alt="" style={{ position: 'absolute', right: -430, top: -115 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={256} height={46} alt="RaaVon" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 600, color: '#E6C989', letterSpacing: 3, textTransform: 'uppercase' }}>
            The spirit behind every brand.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24, fontSize: 84, fontWeight: 800, color: '#ECE6D8', lineHeight: 1 }}>
            <span>Ambitious ideas.</span>
            <span>Thoughtfully built.</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
