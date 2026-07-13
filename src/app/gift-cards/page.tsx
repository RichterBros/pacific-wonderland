export default function GiftCardsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-4xl font-bold text-brand-dark mb-4">Gift Cards</h1>
      <p className="text-gray-700 mb-8">
        The perfect gift for the treasure hunter in your life. Gift cards are
        available in any amount at our front desk, or contact us to arrange one.
      </p>
      <a
        href="/contact"
        className="inline-block bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
      >
        Contact Us
      </a>
    </div>
  )
}
