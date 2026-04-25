import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Ventures from '@/components/sections/Ventures'
import Philosophy from '@/components/sections/Philosophy'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Ventures />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
