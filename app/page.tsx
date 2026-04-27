import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Products from '@/components/sections/Products'
import Philosophy from '@/components/sections/Philosophy'
import Stats from '@/components/sections/Stats'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Products />
        <Philosophy />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
