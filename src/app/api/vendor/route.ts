import nodemailer from 'nodemailer'

type VendorFormPayload = {
  fullName: string
  phone: string
  email: string
  vendorBefore: string
  vendorWhere: string
  itemsToSell: string
  social: string
  hearAbout: string
  aboutYou: string
  smsConsent: boolean
  token?: string | null
}

type RecaptchaVerifyResponse = {
  success: boolean
  score?: number
  action?: string
  'error-codes'?: string[]
}

async function verifyRecaptcha(
  token: string | null | undefined,
  remoteIp?: string | null
): Promise<{ ok: boolean; errors?: string[] }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    // reCAPTCHA not configured; allow (form still works)
    return { ok: true }
  }
  if (!token) return { ok: false, errors: ['missing-input-response'] }
  try {
    const params = new URLSearchParams()
    params.append('secret', secret)
    params.append('response', token)
    if (remoteIp) params.append('remoteip', remoteIp)
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = (await response.json()) as RecaptchaVerifyResponse
    return { ok: !!data.success, errors: data['error-codes'] }
  } catch {
    return { ok: false, errors: ['verification-exception'] }
  }
}

const esc = (s: string) => s.replace(/</g, '&lt;')

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as VendorFormPayload
    const {
      fullName,
      phone,
      email,
      vendorBefore,
      vendorWhere,
      itemsToSell,
      social,
      hearAbout,
      aboutYou,
      smsConsent,
      token,
    } = body

    if (
      !fullName ||
      !phone ||
      !email ||
      !vendorBefore ||
      !itemsToSell ||
      !social ||
      !hearAbout ||
      !aboutYou
    ) {
      return new Response(JSON.stringify({ error: 'Please fill in all required fields.' }), {
        status: 400,
      })
    }

    // reCAPTCHA (auto-bypassed on localhost or when not configured)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0]?.trim() : null
    const hostHeader = request.headers.get('host') || ''
    const isLocalhost = hostHeader.includes('localhost') || hostHeader.startsWith('127.0.0.1')
    const disableViaEnv = process.env.DISABLE_RECAPTCHA === 'true'
    const bypassRecaptcha = disableViaEnv || (process.env.NODE_ENV !== 'production' && isLocalhost)

    const recaptcha = bypassRecaptcha ? { ok: true } : await verifyRecaptcha(token, clientIp)
    if (!recaptcha.ok) {
      return new Response(JSON.stringify({ error: 'reCAPTCHA verification failed. Please try again.' }), {
        status: 400,
      })
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM || user
    const to = process.env.SMTP_TO || user

    if (!host || !user || !pass || !from || !to) {
      return new Response(
        JSON.stringify({
          error: 'Email is not configured on the server yet. Please call us at (503) 803-5177.',
        }),
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    const subject = `New vendor application from ${fullName}`
    const rows: [string, string][] = [
      ['Full Name', fullName],
      ['Phone', phone],
      ['Email', email],
      ['Been a vendor before?', vendorBefore],
      ['Where have they been a vendor', vendorWhere || 'N/A'],
      ['Items to sell', itemsToSell],
      ['Facebook / Instagram', social],
      ['Where did they hear about us', hearAbout],
      ['About them', aboutYou],
      ['SMS consent', smsConsent ? 'Yes' : 'No'],
    ]

    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
    const html = `
      <div>
        <h2>New vendor application</h2>
        ${rows
          .map(
            ([k, v]) =>
              `<p><strong>${k}:</strong><br /><span style="white-space:pre-wrap;">${esc(v)}</span></p>`
          )
          .join('')}
      </div>
    `

    await transporter.sendMail({ from, to, replyTo: email, subject, text, html })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to submit application. Please try again.' }), {
      status: 500,
    })
  }
}
