"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NAV_LEFT, NAV_RIGHT, NAV_ALL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        {/* Desktop — three-column: left nav | center logo | right nav */}
        <div className="hidden md:grid grid-cols-3 items-center h-full px-10">
          {/* Left nav */}
          <nav className="flex items-center gap-7" aria-label="Left navigation">
            {NAV_LEFT.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link font-dm text-sm tracking-wide"
                style={{ color: "var(--muted)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Center logo */}
          <div className="flex justify-center">
            <Link href="/" aria-label="Raavon home">
              <Logo size="lg" />
            </Link>
          </div>

          {/* Right nav */}
          <nav
            className="flex items-center justify-end gap-6"
            aria-label="Right navigation"
          >
            {NAV_RIGHT.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link font-dm text-sm tracking-wide"
                  style={{ color: "var(--muted)" }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link font-dm text-sm tracking-wide"
                  style={{ color: "var(--muted)" }}
                >
                  {link.label}
                </a>
              ),
            )}
            <ThemeToggle />
            <a
              href="#contact"
              className="font-dm text-xs tracking-wide px-4 py-2 transition-colors duration-200"
              style={{
                border: "1px solid rgba(193,154,107,0.45)",
                color: "#C19A6B",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(193,154,107,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              Get in touch
            </a>
          </nav>
        </div>

        {/* Mobile — logo left, hamburger right */}
        <div className="flex md:hidden items-center justify-between h-full px-6">
          <Link href="/" aria-label="Raavon home">
            <Logo size="sm" />
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="w-9 h-9 flex items-center justify-center"
            style={{ color: "var(--text)" }}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "#0A0A0A" }}
        >
          <div className="flex items-center justify-between px-6 h-16">
            <Logo size="sm" />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ color: "var(--text)" }}
            >
              <X size={22} />
            </button>
          </div>

          <nav
            className="flex flex-col items-center justify-center flex-1 gap-9"
            aria-label="Mobile navigation"
          >
            {NAV_ALL.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-jakarta font-bold text-4xl"
                  style={{ color: "var(--text)" }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-jakarta font-bold text-4xl"
                  style={{ color: "var(--text)" }}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="flex justify-center pb-12">
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
