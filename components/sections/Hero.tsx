import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10"
      aria-label="Hero"
    >
      {/* Ambient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: "clamp(400px, 55vw, 800px)",
          height: "clamp(400px, 55vw, 800px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(78,44,32,0.14) 0%, transparent 70%)",
          bottom: "-10%",
          left: "-15%",
          animation: "drift-reverse 22s ease-in-out infinite alternate",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(193,154,107,0.07) 0%, transparent 70%)",
          top: "-5%",
          right: "-10%",
          animation: "drift 18s ease-in-out infinite alternate",
          filter: "blur(90px)",
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Pill badge */}
        <ScrollReveal>
          <div className="inline-flex items-center mb-15">
            <span
              className="font-dm text-xs tracking-[0.2em] uppercase px-4 py-1.5"
              style={{
                border: "1px solid rgba(193,154,107,0.45)",
                color: "#C19A6B",
                background: "rgba(193,154,107,0.06)",
                borderRadius: "999px",
              }}
            >
              Raavon Group &nbsp;·&nbsp; Est. 2026
            </span>
          </div>
        </ScrollReveal>

        <h1
          className="font-jakarta font-extrabold leading-[1.2] mb-8 w-screen"
          style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", color: "var(--text)" }}
        >
          <ScrollReveal delay={0.05}>
            <span className="">We bring </span>

            <span
              className=" font-fraunces italic font-light"
              style={{
                color: "#C19A6B",
                fontSize: "clamp(3.8rem, 9.5vw, 9.8rem)",
              }}
            >
              ideas
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <span className="block">
              to life{" "}
              <span
                style={{
                  color: "#C19A6B",
                  fontSize: "clamp(3.8rem, 9.5vw, 9.8rem)",
                }}
              >
                .
              </span>
            </span>
          </ScrollReveal>
        </h1>

        <ScrollReveal delay={0.35}>
          <p
            className="font-dm text-base md:text-lg max-w-md mb-12 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            One holding company. Many ventures. Built for the world.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <a href="#ventures" className="btn-primary font-dm">
              Our Ventures
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="font-dm text-sm tracking-wide flex items-center gap-2"
              style={{ color: "var(--muted)" }}
            >
              Get in Touch
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

        {/* Inline stats */}
        <ScrollReveal delay={0.55}>
          <div
            className="flex flex-wrap justify-center gap-10 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {[
              { value: "2026", label: "Founded" },
              { value: "∞", label: "Industries" },
              { value: "Global", label: "Reach" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className="font-jakarta font-bold text-2xl"
                  style={{ color: "var(--text)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-dm text-xs tracking-widest uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-0 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, rgba(193,154,107,0.6), transparent)",
            animation: "scrollBounce 2s ease-in-out infinite",
          }}
        />
        <span
          className="font-dm text-xs tracking-[0.2em] uppercase"
          style={{ color: "rgba(193,154,107,0.45)" }}
        >
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
