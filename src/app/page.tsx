import Image from 'next/image'

const CATEGORIES = [
  {
    img: '/images/cat-1.webp',
    title: 'Antique Furniture',
    text: 'From farmhouse tables to mid-century finds — quality pieces built to last generations.',
  },
  {
    img: '/images/cat-2.webp',
    title: 'Vintage Signs',
    text: 'Original advertising, tin signs, and nostalgic décor to give any space character.',
  },
  {
    img: '/images/cat-3.webp',
    title: 'Curated Clothing',
    text: 'Hand-picked vintage apparel and accessories for collectors and everyday style.',
  },
]

const WHY_US = [
  { title: 'Unmatched Selection', text: '75+ dealers under one roof means something new around every corner.' },
  { title: 'Quality You Can Trust', text: 'Curated, genuine antiques — not reproductions.' },
  { title: 'Friendly, Knowledgeable Staff', text: 'Our team is happy to help you find exactly what you want.' },
  { title: 'Clean & Welcoming', text: 'A bright, organized space that makes browsing a pleasure.' },
  { title: 'Fresh Inventory', text: 'Our stock turns over constantly, so it always pays to come back.' },
  { title: 'Prime Location', text: 'Right on SE Hawthorne in the heart of Portland, Oregon.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.webp"
            alt="Inside Pacific Wonderland Collectibles & Antiques"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/70" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-28 md:py-36 text-center text-white fade-up">
          <p className="font-heading uppercase tracking-widest text-brand-cream text-sm mb-4">
            If you want it to last, shop in the past!
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
            Portland, Oregon&apos;s Largest
            <br className="hidden md:block" /> Antiques Destination
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Come shop with our 75+ quality antique dealers where we have
            EVERYTHING, for EVERYONE!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/vendor-application"
              className="bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
            >
              Become A Vendor
            </a>
            <a
              href="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/40 text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
            >
              Visit Us
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Pacific Wonderland Collectibles &amp; Antiques brings together dozens of independent
            dealers in one welcoming space in the heart of Portland, Oregon.
            We&apos;ve built a destination where collectors, decorators, and
            first-time treasure hunters can all find something special — from
            fine furniture and vintage signage to jewelry, glassware, and
            one-of-a-kind curiosities.
          </p>
        </div>
      </section>

      {/* Vendor recruitment */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Set up your space. Join a trusted team.
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Turn your passion for antiques into a business. Our booths put your
              inventory in front of thousands of shoppers every month, with a
              friendly staff handling the sales floor so you can focus on
              sourcing great pieces.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Flexible booth sizes to fit your inventory</li>
              <li>• High-traffic SE Hawthorne location</li>
              <li>• Supportive, experienced management</li>
            </ul>
            <a
              href="/vendor-application"
              className="inline-block bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
            >
              Join Us
            </a>
          </div>
          <div className="relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image src="/images/gallery-1.webp" alt="Vendor booth space" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark text-center mb-12">
            What You&apos;ll Find
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.map((c) => (
              <div key={c.title} className="rounded-lg overflow-hidden shadow-md bg-white">
                <div className="relative h-56">
                  <Image src={c.img} alt={c.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-dark mb-2">{c.title}</h3>
                  <p className="text-gray-600">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-dark text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join Our Email Newsletter
          </h2>
          <p className="text-gray-300 mb-8">
            Be the first to know — get early announcements on new inventory,
            special events, and exclusive offers straight to your inbox.
          </p>
          <a
            href="/newsletter"
            className="inline-block bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
          >
            Join Now
          </a>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((w) => (
              <div key={w.title} className="border-l-4 border-brand-red pl-5">
                <h3 className="font-heading text-lg font-bold text-brand-dark mb-1">{w.title}</h3>
                <p className="text-gray-600">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / map */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Come Visit
            </h2>
            <p className="text-gray-700 mb-2">2417 SE Hawthorne, Portland, OR 97214</p>
            <p className="text-gray-700 mb-2">
              <a href="tel:+15038035177" className="text-brand-red hover:underline">
                (503) 803-5177
              </a>
            </p>
            <p className="text-gray-700 mb-6">Open Everyday · 10am – 6pm</p>
            <a
              href="/contact"
              className="inline-block bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
          <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=2417+SE+Hawthorne,+Portland,+OR+97214&hl=en&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map to 2417 SE Hawthorne, Portland, OR"
            />
          </div>
        </div>
      </section>
    </>
  )
}
