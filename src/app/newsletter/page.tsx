export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-4xl font-bold text-brand-dark mb-4">Email Newsletter</h1>
      <p className="text-gray-700 mb-8">
        Sign up to get early announcements on new inventory, special events, and
        exclusive offers. Send us your email and we&apos;ll add you to the list.
      </p>
      <a
        href="/contact"
        className="inline-block bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
      >
        Join the List
      </a>
    </div>
  )
}
