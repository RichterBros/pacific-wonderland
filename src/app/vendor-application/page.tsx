export default function VendorApplicationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-4xl font-bold text-brand-dark mb-4">Vendor Application</h1>
      <p className="text-gray-700 mb-8">
        Interested in setting up a booth at The Portland Antiques Mall? We&apos;d love to
        hear from you. Reach out and our team will walk you through availability and pricing.
      </p>
      <a
        href="/contact"
        className="inline-block bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
      >
        Contact Us to Apply
      </a>
    </div>
  )
}
