import type { Metadata } from 'next'
import { Rubik, Karla } from 'next/font/google'
import './globals.css'
import React from 'react'
import Navigation from './components/Navigation'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-rubik',
})
const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-karla',
})

export const metadata: Metadata = {
  title: 'Antiques Shopping in Portland Oregon | Pacific Wonderland Collectibles & Antiques',
  description:
    "Portland, Oregon's largest antiques destination. Shop with 75+ quality antique dealers — furniture, vintage signs, curated clothing and more. Open every day 10am–6pm.",
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/newsletter', label: 'Email Newsletter' },
  { href: '/vendor-application', label: 'Vendor Application' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/gift-cards', label: 'Gift Cards' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${karla.variable} font-body bg-white text-[#222222]`}
      >
        <Navigation links={NAV_LINKS} />

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-brand-dark text-white">
          <div className="max-w-none mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-heading text-lg font-bold mb-3">
                Pacific Wonderland Collectibles &amp; Antiques
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Portland, Oregon&apos;s largest antiques destination. Come shop
                with our 75+ quality antique dealers where we have EVERYTHING,
                for EVERYONE!
              </p>
              <p className="text-sm text-gray-300 mt-4 italic">
                &ldquo;If you want it to last, shop in the past!&rdquo;
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-3">Visit Us</h3>
              <address className="not-italic text-sm text-gray-300 space-y-2">
                <p>2417 SE Hawthorne, Portland, OR 97214</p>
                <p>
                  <a href="tel:+15038035177" className="hover:text-white transition-colors">
                    (503) 803-5177
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:jwruecker@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    jwruecker@gmail.com
                  </a>
                </p>
                <p className="pt-2 font-semibold text-white">Open Everyday 10am – 6pm</p>
              </address>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="max-w-none mx-auto px-4 py-5 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Pacific Wonderland Collectibles &amp; Antiques. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
