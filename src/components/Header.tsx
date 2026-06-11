"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/vehicules", label: "Nos véhicules" },
  { href: "/vendre", label: "Vendre ma voiture" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-night/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="TransakAuto — accueil">
          <Image
            src="/logo.png"
            alt="TransakAuto"
            width={896}
            height={278}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium tracking-wide transition-colors hover:text-magenta ${
                pathname === link.href ? "text-magenta" : "text-cream/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="rounded-full bg-magenta px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-magenta-dark"
          >
            {site.phone}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Ouvrir le menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-cream transition-transform ${open ? "-translate-y-3 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-night/95 px-5 pb-6 pt-2 backdrop-blur-md xl:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-lg font-medium ${
                pathname === link.href ? "text-magenta" : "text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="mt-3 block rounded-full bg-magenta px-5 py-3 text-center font-semibold text-white"
          >
            {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
