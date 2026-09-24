"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#models", label: "Models" },
  { href: "/create", label: "Studio" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#07060c] md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <div className="glass-nav mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 md:px-5">
          <Link href="/" className="flex items-center gap-2.5" aria-label="DreamFrame home" onClick={() => setOpen(false)}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[11px] font-semibold tracking-[0.14em] text-white">
              DF
            </span>
            <span className="font-headline text-[13px] font-semibold tracking-[0.22em] text-white/90">
              DREAMFRAME
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] text-white/70 md:flex" aria-label="Primary">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="cta-orb hidden rounded-full px-4 py-2 text-[13px] font-semibold text-white md:inline-flex"
            >
              Start Creating
            </Link>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="block h-3.5 w-4">
                <span className="mb-1 block h-px w-full bg-white" />
                <span className="mb-1 block h-px w-full bg-white" />
                <span className="block h-px w-full bg-white" />
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="mx-auto mt-2 flex max-w-6xl flex-col gap-5 rounded-[28px] border border-white/10 bg-[#100e18] px-6 py-6 text-base text-white md:hidden"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-1">
                {link.label}
              </Link>
            ))}
            <Link
              href="/create"
              onClick={() => setOpen(false)}
              className="cta-orb mt-1 inline-flex justify-center rounded-full px-4 py-3 font-semibold text-white"
            >
              Start Creating
            </Link>
          </nav>
        ) : null}
      </header>
    </>
  );
}
