'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'

// ============== Types ==============

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  inquiryType: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

interface ContactInfo {
  icon: string
  title: string
  content: string
  subcontent?: string
  action: string
  link: string
}

interface FAQ {
  id: number
  question: string
  answer: string
}

// ============== Constants ==============

const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'product', label: 'Product Information' },
  { value: 'order', label: 'Order Status' },
  { value: 'returns', label: 'Returns & Refunds' },
  { value: 'custom', label: 'Custom Design' },
]

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: '📍',
    title: 'Visit Us',
    content: '123 Jewelry Street, New York, NY 10001',
    action: 'Get Directions',
    link: 'https://maps.google.com'
  },
  {
    icon: '📞',
    title: 'Call Us',
    content: '+1 (234) 567-8900',
    subcontent: 'Mon-Sat: 10AM-8PM',
    action: 'Call Now',
    link: 'tel:+12345678900'
  },
  {
    icon: '✉️',
    title: 'Email Us',
    content: 'support@jweelary.com',
    subcontent: '24/7 Support',
    action: 'Send Email',
    link: 'mailto:support@jweelary.com'
  },
  {
    icon: '💬',
    title: 'Live Chat',
    content: 'Instant Messaging',
    subcontent: 'Response: < 5 min',
    action: 'Start Chat',
    link: '#'
  }
]

const FAQS: FAQ[] = [
  {
    id: 1,
    question: 'What are your store hours?',
    answer: 'We are open Monday to Saturday from 10:00 AM to 8:00 PM, and Sunday from 12:00 PM to 6:00 PM.'
  },
  {
    id: 2,
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide! International shipping typically takes 5-10 business days.'
  },
  {
    id: 3,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all unused items in original packaging.'
  },
  {
    id: 4,
    question: 'Do you provide jewelry certification?',
    answer: 'Yes, all our diamond jewelry comes with GIA certification.'
  }
]

// ============== Main Component ==============

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormErrors]
        return newErrors
      })
    }
  }

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 1000) {
      errors.message = 'Message must not exceed 1000 characters'
    }

    return errors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
    } catch {
      setSubmitError('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFaq = (id: number): void => {
    setActiveFaq(activeFaq === id ? null : id)
  }

  // Success State
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6">✨</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Message Sent!
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Thank you for contacting us. We&apos;ll get back to you within 24 hours.
          </p>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl mb-8">
            <p className="text-green-400 font-semibold mb-2">✓ Successfully delivered</p>
            <p className="text-gray-400 text-sm">Confirmation sent to {formData.email}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-full hover:scale-105 transition-transform">
              Return Home
            </Link>
            <Link href="/shop" className="px-8 py-3 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Main Render
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl mb-6">
            <span className="text-4xl">📞</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get in touch with our team for any questions or concerns
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CONTACT_INFO.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group"
            >
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-1">{item.content}</p>
              {item.subcontent && (
                <p className="text-gray-500 text-xs mb-3">{item.subcontent}</p>
              )}
              <Link
                href={item.link}
                className="inline-flex items-center text-yellow-400 hover:text-yellow-500 text-sm font-semibold"
              >
                <span>{item.action}</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
              <p className="text-gray-400 mb-8">We&apos;ll respond within 24 hours</p>

              {submitError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-sm">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 text-white ${
                        formErrors.name
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                      }`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 text-white ${
                        formErrors.email
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Inquiry Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white"
                    >
                      {INQUIRY_TYPES.map(type => (
                        <option key={type.value} value={type.value} className="bg-gray-900">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 text-white ${
                      formErrors.subject
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                    }`}
                    placeholder="How can we help you?"
                  />
                  {formErrors.subject && (
                    <p className="text-red-400 text-xs mt-1">{formErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 text-white resize-none ${
                      formErrors.message
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                    }`}
                    placeholder="Please describe your inquiry..."
                  />
                  <div className="flex justify-between mt-1">
                    {formErrors.message ? (
                      <p className="text-red-400 text-xs">{formErrors.message}</p>
                    ) : (
                      <p className="text-gray-500 text-xs">
                        {formData.message.length}/1000 characters
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our{' '}
                  <Link href="/privacy" className="text-yellow-400 hover:text-yellow-500">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Business Hours */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mon - Fri</span>
                  <span className="text-white">10AM - 8PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white">10AM - 8PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-white">12PM - 6PM</span>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Response</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-green-400">&lt; 4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-green-400">&lt; 2 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chat</span>
                  <span className="text-green-400">&lt; 30 sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  <span className={`text-yellow-400 transition-transform duration-300 ${
                    activeFaq === faq.id ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                {activeFaq === faq.id && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 text-sm border-t border-white/10 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}