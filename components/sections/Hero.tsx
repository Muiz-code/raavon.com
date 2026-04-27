"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const WORDS = ["ideas", "ventures", "brands", "impact", "value"];
const INTERVAL = 2600;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 380);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 "
      aria-label="Hero"
      style={{
        backgroundImage: "url('/herobg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay so text stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "rgba(10,10,8,0.72)" }}
      />

      {/* Ambient orbs */}
      {/* <div
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
      /> */}

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-start md:items-center text-start md:text-center px-10 pr-4 mx-auto">
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
          className="font-jakarta font-extrabold leading-[1.2] mb-8 w-full text-start md:text-center"
          style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", color: "var(--text)" }}
        >
          <ScrollReveal delay={0.05}>
            <span>We bring </span>
            {/* Fixed-width container prevents layout shift when word length changes */}
            <span
              className="font-fraunces italic font-light"
              style={{
                color: "#C19A6B",
                fontSize: "clamp(3.8rem, 9.5vw, 9.8rem)",
                display: "inline-grid",
                verticalAlign: "bottom",
              }}
            >
              {/* Invisible longest word holds the width */}
              <span style={{ visibility: "hidden", gridArea: "1/1" }}>
                ventures
              </span>
              {/* Animated word overlaid on top */}
              <span
                style={{
                  gridArea: "1/1",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-10px)",
                  transition: "opacity 0.32s ease, transform 0.32s ease",
                  textAlign: "start",
                }}
              >
                {WORDS[index]}
              </span>
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
            className="font-dm text-base md:text-lg w-full mb-12 leading-relaxed"
            style={{ color: "var(--text)" }}
          >
            One holding company. Many products. Built for the world.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <a href="#products" className="btn-primary font-dm">
              Our Products
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
        <ScrollReveal delay={0.55} className="w-full">
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
          50%       { opacity: 1;   transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
