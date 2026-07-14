"use client";

import React, { useState } from "react";
import Image from "next/image";

type NavLink = { href: string; label: string };

export default function Navigation({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-brand-dark text-white text-xs">
        <div className="max-w-none mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <span>
            Open Everyday · 10am – 6pm · 2417 SE Hawthorne, Portland, OR 97214
          </span>
          <a
            href="tel:+15038035177"
            className="font-semibold hover:text-brand-cream"
          >
            Call (503) 803-5177
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-none mx-auto px-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Pacific Wonderland Collectibles & Antiques logo"
              width={200}
              height={200}
              priority
            />
            <span className="font-heading font-bold text-4xl leading-tight text-brand-dark hidden sm:block">
              Pacific Wonderland
              <br />
              <span style={{ fontSize: "0.82em" }}>
                Collectibles &amp; Antiques
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex flex-wrap items-center justify-end gap-x-7 gap-y-2 ml-auto font-heading font-medium text-[1.3125rem]">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-brand-dark hover:text-brand-red transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/vendor-application"
              className="bg-brand-red hover:bg-brand-reddark text-white text-[1.640625rem] px-5 py-2.5 rounded-md transition-colors"
            >
              Become A Vendor
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden ml-auto text-brand-dark"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-gray-100 bg-white">
          <div className="max-w-none mx-auto px-4 py-3 flex flex-col gap-1 font-heading font-medium">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-brand-dark hover:text-brand-red transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/vendor-application"
              className="mt-2 bg-brand-red hover:bg-brand-reddark text-white px-4 py-2 rounded-md text-center transition-colors"
              onClick={() => setOpen(false)}
            >
              Become A Vendor
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
