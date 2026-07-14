import Image from 'next/image'

const IMAGES = [
  '/images/gallery-1.webp',
  '/images/gallery-2.webp',
  '/images/gallery-3.webp',
  '/images/cat-1.webp',
  '/images/cat-2.webp',
  '/images/cat-3.webp',
]

export default function GalleryPage() {
  return (
    <div className="max-w-none mx-auto px-4 py-20">
      <h1 className="font-heading text-4xl font-bold text-brand-dark text-center mb-12">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {IMAGES.map((src) => (
          <div key={src} className="relative h-64 rounded-lg overflow-hidden shadow-md">
            <Image src={src} alt="Antiques at Pacific Wonderland Collectibles & Antiques" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
