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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const isRecaptchaEnabled = !!RECAPTCHA_SITE_KEY

  // Load reCAPTCHA v3 script if configured
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
          .execute(siteKey, { action: 'contact_form' })
          .then((t) => resolve(t))
          .catch(() => resolve(null))
      })
    })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, token }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}) as any)
        throw new Error(data?.error || 'Failed to send message')
      }

      setStatus({ ok: true, text: "Thank you! Your message has been sent — we'll be in touch soon." })
      setFormData({ name: '', phone: '', email: '', message: '' })
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

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Questions about a piece, a booth, or a visit? Send us a note and
            we&apos;ll get right back to you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info + map */}
        <div className="space-y-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-brand-dark mb-4">
              Pacific Wonderland Collectibles &amp; Antiques
            </h2>
            <div className="space-y-2 text-gray-800">
              <p>
                <span className="font-semibold">Address:</span> 2417 SE Hawthorne, Portland, OR 97214
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{' '}
                <a href="tel:+15038035177" className="text-brand-red hover:underline">
                  (503) 803-5177
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:jwruecker@gmail.com" className="text-brand-red hover:underline">
                  jwruecker@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Hours:</span> Open Everyday, 10am – 6pm
              </p>
            </div>
          </div>

          <div className="relative w-full h-72 rounded-lg overflow-hidden shadow">
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

        {/* Form */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-brand-dark mb-6">Send Us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={inputClass}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Your phone number (optional)"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={inputClass}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="How can we help?"
              />
            </div>

            {status && (
              <p
                className={`text-sm ${status.ok ? 'text-green-700' : 'text-red-600'}`}
                role="status"
              >
                {status.text}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || (isRecaptchaEnabled && !recaptchaLoaded)}
                className={`font-heading font-medium py-3 px-8 rounded-md text-white bg-brand-red hover:bg-brand-reddark transition-colors ${
                  isSubmitting || (isRecaptchaEnabled && !recaptchaLoaded)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isSubmitting ? 'Sending…' : 'Submit'}
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
    </div>
  )
}
