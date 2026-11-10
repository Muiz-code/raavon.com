import { Fraunces, IBM_Plex_Mono, Inter, Nunito, Playfair_Display, Source_Sans_3, Space_Grotesk } from 'next/font/google'

/**
 * Fonts for the Studio preview only. Imported by app/(site)/studio/page.tsx,
 * so no other page downloads them. Bricolage Grotesque comes from the root
 * layout (--font-bricolage). Preloading is off: a font only downloads once a
 * visitor picks a pairing that uses it.
 */
const fraunces = Fraunces({ subsets: ['latin'], variable: '--studio-fraunces', display: 'swap', preload: false })
const inter = Inter({ subsets: ['latin'], variable: '--studio-inter', display: 'swap', preload: false })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--studio-space', display: 'swap', preload: false })
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--studio-plex-mono',
  display: 'swap',
  preload: false,
})
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--studio-playfair', display: 'swap', preload: false })
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--studio-source', display: 'swap', preload: false })
const nunito = Nunito({ subsets: ['latin'], variable: '--studio-nunito', display: 'swap', preload: false })

export const studioFontVariables = [fraunces, inter, spaceGrotesk, plexMono, playfair, sourceSans, nunito]
  .map((f) => f.variable)
  .join(' ')
