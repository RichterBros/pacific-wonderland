'use client'

import React, { useState, useEffect } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const HEAR_ABOUT_OPTIONS = [
  'Google Search',
  'Facebook',
  'Instagram',
  'Friend or Word of Mouth',
  'Drove By / Walk-in',
  'Other',
]

export default function VendorApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    vendorBefore: '',
    vendorWhere: '',
    itemsToSell: '',
    social: '',
    hearAbout: '',
    aboutYou: '',
  })
  const [smsConsent, setSmsConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const isRecaptchaEnabled = !!RECAPTCHA_SITE_KEY

  useEffect(() => {
    if (!isRecaptchaEnabled) {
      setRecaptchaLoaded(false)
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.grecaptcha && typeof window.grecaptcha.ready === 'function') {
        window.grecaptcha.ready(() => setRecaptchaLoaded(true))
      } else {
        setRecaptchaLoaded(true)
      }
    }
    script.onerror = () => setRecaptchaLoaded(false)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [RECAPTCHA_SITE_KEY, isRecaptchaEnabled])

  const getRecaptchaToken = (): Promise<string | null> =>
    new Promise((resolve) => {
      if (!isRecaptchaEnabled) return resolve(null)
      if (!window.grecaptcha || typeof window.grecaptcha.ready !== 'function') {
        return resolve(null)
      }
      const siteKey = String(RECAPTCHA_SITE_KEY)
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, { action: 'vendor_application' })
          .then((t) => resolve(t))
          .catch(() => resolve(null))
      })
    })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      let token: string | null = null
      if (isRecaptchaEnabled) {
        if (!recaptchaLoaded) {
          throw new Error('reCAPTCHA is not ready yet. Please try again in a moment.')
        }
        token = await getRecaptchaToken()
        if (!token) {
          throw new Error('reCAPTCHA could not be verified. Please reload the page and try again.')
        }
      }

      const response = await fetch('/api/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, smsConsent, token }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}) as any)
        throw new Error(data?.error || 'Failed to submit application')
      }

      setStatus({
        ok: true,
        text: "Thank you! Your vendor application has been sent — we'll be in touch soon.",
      })
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        vendorBefore: '',
        vendorWhere: '',
        itemsToSell: '',
        social: '',
        hearAbout: '',
        aboutYou: '',
      })
      setSmsConsent(false)
    } catch (error: any) {
      setStatus({
        ok: false,
        text: typeof error?.message === 'string' ? error.message : 'There was an error. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors text-gray-900'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-2'

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16">
        <div className="max-w-none mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Vendor Application</h1>
        </div>
      </div>

      {/* Vendor pitch */}
      <div className="max-w-3xl mx-auto px-4 pt-16">
        <p className="font-heading uppercase tracking-widest text-brand-red text-sm mb-3">
          Set up your space. Join a trusted team. Be part of something big.
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-4">
          Become a Vendor at Pacific Wonderland Collectibles &amp; Antiques
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Pacific Wonderland Collectibles &amp; Antiques is one of the most exciting antique
          destinations in the Pacific Northwest, located right on SE Hawthorne in the heart of
          Portland, Oregon. Whether you&apos;re an experienced dealer or just starting to grow
          your vintage business, this is your chance to reach thousands of shoppers every month.
        </p>
        <ul className="space-y-2 text-gray-700 mb-8">
          {[
            'Spacious antiques booths',
            'Our team helps you get set up quickly and easily.',
            'Consistent shoppers year-round',
            'Booth size adjusted to your needs',
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-red font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="#apply"
          className="inline-block bg-brand-red hover:bg-brand-reddark text-white font-heading font-medium px-8 py-3 rounded-md transition-colors"
        >
          Join Us
        </a>
      </div>

      {/* Pricing */}
      <div className="max-w-3xl mx-auto px-4 pt-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-8">
          Vendor Space Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Booth spaces */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-brand-dark mb-4">Booth Spaces</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Main Floor</span>
                <span className="font-semibold text-brand-dark">$4.25/sqft</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Lower Level</span>
                <span className="font-semibold text-brand-dark">$3.75/sqft</span>
              </li>
            </ul>
            <p className="text-gray-600 text-sm mt-4">Booth size is fully adjustable to your needs.</p>
            <p className="text-brand-red font-semibold text-sm mt-2">
              First two months with us for HALF price!
            </p>
          </div>

          {/* Glass display cases */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-brand-dark mb-4">
              Glass Display Cases
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Per shelf</span>
                <span className="font-semibold text-brand-dark">$50/mo</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Full display case</span>
                <span className="font-semibold text-brand-dark">$180/mo</span>
              </li>
            </ul>
            <p className="text-gray-600 text-sm mt-4">Attract ALL the foot traffic passing by!</p>
            <p className="text-brand-red font-semibold text-sm mt-2">
              First two months with us for HALF price!
            </p>
          </div>
        </div>
      </div>

      <div id="apply" className="max-w-3xl mx-auto px-4 py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className={inputClass}
              placeholder="Full Name"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone <span className="text-brand-red">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={inputClass}
              placeholder="Phone"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-brand-red">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={inputClass}
              placeholder="Email"
            />
          </div>

          {/* Been a vendor before */}
          <div>
            <label htmlFor="vendorBefore" className={labelClass}>
              Been A Vendor Before? <span className="text-brand-red">*</span>
            </label>
            <select
              id="vendorBefore"
              name="vendorBefore"
              value={formData.vendorBefore}
              onChange={handleInputChange}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Where have you been a vendor */}
          <div>
            <label htmlFor="vendorWhere" className={labelClass}>
              Where Have You Been A Vendor
            </label>
            <input
              type="text"
              id="vendorWhere"
              name="vendorWhere"
              value={formData.vendorWhere}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Please fill out if applicable"
            />
          </div>

          {/* Items to sell */}
          <div>
            <label htmlFor="itemsToSell" className={labelClass}>
              What Items Do You Intend To Sell? <span className="text-brand-red">*</span>
            </label>
            <textarea
              id="itemsToSell"
              name="itemsToSell"
              value={formData.itemsToSell}
              onChange={handleInputChange}
              required
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Example: Wooden Furniture, Collectables, Jewelry, Etc"
            />
          </div>

          {/* Social */}
          <div>
            <label htmlFor="social" className={labelClass}>
              Facebook or Instagram Page <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              id="social"
              name="social"
              value={formData.social}
              onChange={handleInputChange}
              required
              className={inputClass}
              placeholder="Enter your Facebook or Instagram Page Here"
            />
          </div>

          {/* Where did you hear about us */}
          <div>
            <label htmlFor="hearAbout" className={labelClass}>
              Where Did You Hear About Us? <span className="text-brand-red">*</span>
            </label>
            <select
              id="hearAbout"
              name="hearAbout"
              value={formData.hearAbout}
              onChange={handleInputChange}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Select an option
              </option>
              {HEAR_ABOUT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* About you */}
          <div>
            <label htmlFor="aboutYou" className={labelClass}>
              Tell Us About Yourself <span className="text-brand-red">*</span>
            </label>
            <textarea
              id="aboutYou"
              name="aboutYou"
              value={formData.aboutYou}
              onChange={handleInputChange}
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Tell us a little more about yourself!"
            />
          </div>

          {/* SMS consent */}
          <div className="flex gap-3 items-start">
            <input
              type="checkbox"
              id="smsConsent"
              checked={smsConsent}
              onChange={(e) => setSmsConsent(e.target.checked)}
              className="mt-1 h-4 w-4 flex-shrink-0 accent-brand-red"
            />
            <label htmlFor="smsConsent" className="text-xs text-gray-500 leading-relaxed">
              By selecting this box, you agree to receive account marketing notifications,
              updates, and reminders from Pacific Wonderland Collectibles &amp; Antiques via SMS.
              Message frequency will vary based on your account activity and engagement. Text HELP
              to (503) 803-5177 for assistance. Message and data rates may apply. Text STOP to
              opt-out at any time. Consent is not a condition of service.
            </label>
          </div>

          {status && (
            <p className={`text-sm ${status.ok ? 'text-green-700' : 'text-red-600'}`} role="status">
              {status.text}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting || (isRecaptchaEnabled && !recaptchaLoaded)}
              className={`font-heading font-medium py-3 px-8 rounded-md text-white bg-brand-red hover:bg-brand-reddark transition-colors ${
                isSubmitting || (isRecaptchaEnabled && !recaptchaLoaded)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>

          {isRecaptchaEnabled && (
            <p className="text-xs text-gray-500">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" className="text-brand-red hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms" className="text-brand-red hover:underline">
                Terms of Service
              </a>{' '}
              apply.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
