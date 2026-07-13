'use client'

import React, { useState } from 'react'
import Image from 'next/image'

type NavLink = { href: string; label: string }

export default function Navigation({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-brand-dark text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <span>Open Everyday · 10am – 5pm · 919 Congress St, Portland, ME</span>
          <a href="tel:+12078748000" className="font-semibold hover:text-brand-cream">
            Call (207) 874-8000
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.webp"
              alt="The Portland Antiques Mall logo"
              width={54}
              height={57}
              priority
            />
            <span className="font-heading font-bold text-lg leading-tight text-brand-dark hidden sm:block">
              The Portland
              <br />
              Antiques Mall
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7 font-heading font-medium text-sm">
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
              className="bg-brand-red hover:bg-brand-reddark text-white px-4 py-2 rounded-md transition-colors"
            >
              Become A Vendor
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-brand-dark"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 font-heading font-medium">
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
  )
}
