import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { BLOG_POSTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Blog — Raavon Group',
  description:
    'Ideas, insights, and stories from the Raavon Group — on building companies, African innovation, and the future of business.',
}

const CATEGORY_COLORS: Record<string, string> = {
  Fintech: '#C19A6B',
  Culture: '#D2B48C',
  Ventures: '#4E2C20',
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS

  return (
    <>
      <Navbar />

      <main className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>

        {/* Header */}
        <section
          className="px-6 md:px-12 pt-36 pb-20"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-dm text-xs tracking-widest uppercase mb-10 transition-opacity hover:opacity-70"
              style={{ color: '#C19A6B' }}
            >
              <ArrowLeft size={13} />
              Back to Raavon
            </Link>

            <p className="font-dm text-xs tracking-[0.25em] uppercase mb-5" style={{ color: '#C19A6B' }}>
              The Raavon Journal
            </p>

            <h1
              className="font-jakarta font-extrabold leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', color: 'var(--text)' }}
            >
              Ideas worth<br />
              <span
                className="font-fraunces italic font-light"
                style={{ color: '#C19A6B' }}
              >
                writing down.
              </span>
            </h1>

            <p className="font-dm max-w-lg" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
              On building companies, African innovation, and what it takes to turn an idea into a legacy.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section className="px-6 md:px-12 py-16" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-6xl mx-auto">
            <p className="font-dm text-xs tracking-widest uppercase mb-8" style={{ color: 'var(--muted)' }}>
              Featured
            </p>

            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start">
                <div className="flex flex-col gap-4">
                  <span
                    className="font-dm text-xs tracking-widest uppercase inline-block"
                    style={{ color: CATEGORY_COLORS[featured.category] ?? '#C19A6B' }}
                  >
                    {featured.category}
                  </span>

                  <h2
                    className="font-jakarta font-bold leading-tight group-hover:text-caramel transition-colors duration-200"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--text)' }}
                  >
                    {featured.title}
                  </h2>

                  <p className="font-dm leading-relaxed" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-dm text-xs" style={{ color: 'var(--muted)' }}>{featured.date}</span>
                    <span style={{ color: 'var(--border)' }}>·</span>
                    <span className="font-dm text-xs" style={{ color: 'var(--muted)' }}>{featured.readTime}</span>
                  </div>
                </div>

                <div
                  className="hidden md:flex items-center justify-center w-14 h-14 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ border: '1px solid rgba(193,154,107,0.3)', color: '#C19A6B' }}
                >
                  <ArrowRight size={18} />
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* Post grid */}
        <section className="px-6 md:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article
                    className="flex flex-col gap-4 p-8 h-full transition-all duration-300"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span
                      className="font-dm text-xs tracking-widest uppercase"
                      style={{ color: CATEGORY_COLORS[post.category] ?? '#C19A6B' }}
                    >
                      {post.category}
                    </span>

                    <h2
                      className="font-jakarta font-bold text-xl leading-snug transition-colors duration-200"
                      style={{ color: 'var(--text)' }}
                    >
                      {post.title}
                    </h2>

                    <p className="font-dm text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-3">
                        <span className="font-dm text-xs" style={{ color: 'var(--muted)' }}>{post.date}</span>
                        <span style={{ color: 'var(--border)' }}>·</span>
                        <span className="font-dm text-xs" style={{ color: 'var(--muted)' }}>{post.readTime}</span>
                      </div>
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: '#C19A6B' }}
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="px-6 md:px-12 py-20 text-center"
          style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
        >
          <div className="max-w-xl mx-auto flex flex-col gap-6 items-center">
            <p className="font-fraunces italic text-xl" style={{ color: '#D2B48C' }}>
              &ldquo;Every empire started as an idea someone wrote down.&rdquo;
            </p>
            <Link href="/#contact" className="btn-primary font-dm">
              Work with us
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
