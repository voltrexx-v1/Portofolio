import React, { useState, useRef, useCallback } from 'react';
import { Mail, Code, Briefcase, Send, Loader2, ShieldCheck } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import './Contact.css';

// Configurable constants for external URLs
const SOCIAL_LINKS = {
  EMAIL: 'mailto:weatherdark5@gmail.com',
  GITHUB: 'https://github.com/voltrexx-v1',
  LINKEDIN: 'www.linkedin.com/in/muhammad-arief-nur-azziz',
  PORTFOLIO: 'https://voltrexx-v1.github.io/Portofolio/',
};

// Turnstile Placeholder (Ready for @marsidev/react-turnstile)
const TurnstilePlaceholder = () => (
  <div className="turnstile-placeholder" aria-label="Security Check Placeholder">
    <ShieldCheck size={16} aria-hidden="true" />
    <span>Protected by Cloudflare Turnstile</span>
  </div>
);

// HTTP Status mapper for robust error handling
const getErrorMessage = (status) => {
  switch (status) {
    case 400: return 'Invalid request. Please check your inputs.';
    case 401:
    case 403: return 'Unauthorized. Security policy blocked this request.';
    case 404: return 'API endpoint not found. Please contact support.';
    case 429: return 'Too many requests. Please slow down and try again later.';
    case 500: return 'Internal server error. Our engineers have been notified.';
    default: return 'An unexpected error occurred. Please try again.';
  }
};

// Glassmorphism Modern Toast Configuration
const toastOptions = {
  className: 'modern-toast',
  duration: 5000,
  style: {
    background: 'rgba(20, 20, 20, 0.85)',
    color: '#fff',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: '12px',
    padding: '16px 20px',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  success: {
    iconTheme: { primary: '#10b981', secondary: '#fff' },
    style: { border: '1px solid rgba(16, 185, 129, 0.2)' },
  },
  error: {
    iconTheme: { primary: '#ef4444', secondary: '#fff' },
    style: { border: '1px solid rgba(239, 68, 68, 0.2)' },
  },
};

export default function Contact({ t }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref for focus management (Accessibility & UX)
  const nameInputRef = useRef(null);

  // useCallback to prevent unnecessary re-renders of input components
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Form Validation & Sanitization before sending to backend
  const validateForm = () => {
    const sanitizedName = formData.name.trim();
    const sanitizedEmail = formData.email.trim();
    const sanitizedMessage = formData.message.trim();

    if (sanitizedName.length < 3) {
      toast.error('Name must be at least 3 characters long.');
      return null;
    }


    if (sanitizedMessage.length < 20) {
      toast.error('Message must be at least 20 characters long.');
      return null;
    }

    if (sanitizedMessage.length > 1000) {
      toast.error('Message cannot exceed 1000 characters.');
      return null;
    }

    return { sanitizedName, sanitizedEmail, sanitizedMessage };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    const validatedData = validateForm();
    if (!validatedData) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: validatedData.sanitizedName,
        email: validatedData.sanitizedEmail,
        message: validatedData.sanitizedMessage,
      };

      // AbortController for network timeout handling (10 seconds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://portfolio-contact-api.weatherdark5.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Prepared for CSRF and Auth tokens in the future:
          // 'X-CSRF-Token': window.csrfToken,
          // 'Authorization': `Bearer ${window.jwtToken}`
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Gracefully attempt to parse JSON if the worker returns it, even on error.
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const responseData = isJson ? await response.json() : null;

      if (!response.ok) {
        const errorMsg = responseData?.error || getErrorMessage(response.status);
        throw new Error(errorMsg);
      }

      toast.success('Message sent successfully!', { icon: '🚀' });

      // Reset form fields
      setFormData({ name: '', email: '', message: '' });

      // Accessibility UX improvement: focus back to first input
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } catch (error) {
      console.error('Contact form error:', error);

      // Specialized Network / Timeout error trapping
      if (error.name === 'AbortError') {
        toast.error('Request timed out. Please check your connection.');
      } else if (error.message === 'Failed to fetch') {
        toast.error('Network error. Please check your internet connection.');
      } else {
        toast.error(error.message || 'Failed to send message.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section scroll-reveal">
      <Toaster position="bottom-right" toastOptions={toastOptions} />

      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">06.</span> {t.title}
        </h2>
        <p className="contact-subtitle">{t.subtitle}</p>

        <div className="contact-content glass-panel">
          <div className="contact-info">
            <h3 className="contact-heading">{t.heading}</h3>
            <p className="contact-text">
              {t.text}
            </p>

            <div className="social-links">
              <a href={SOCIAL_LINKS.EMAIL} className="social-link" title="Email" aria-label="Send an email" target="_blank" rel="noopener noreferrer">
                <Mail size={24} aria-hidden="true" />
              </a>
              <a href={SOCIAL_LINKS.GITHUB} className="social-link" title="GitHub" aria-label="Visit GitHub Profile" target="_blank" rel="noopener noreferrer">
                <Code size={24} aria-hidden="true" />
              </a>
              <a href={SOCIAL_LINKS.LINKEDIN} className="social-link" title="LinkedIn" aria-label="Visit LinkedIn Profile" target="_blank" rel="noopener noreferrer">
                <Briefcase size={24} aria-hidden="true" />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                ref={nameInputRef}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                disabled={isSubmitting}
                autoComplete="name"
                aria-label={t.name}
                aria-invalid={formData.name.trim().length > 0 && formData.name.trim().length < 3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                disabled={isSubmitting}
                autoComplete="email"
                aria-label={t.email}
                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Hello..."
                required
                disabled={isSubmitting}
                aria-label={t.message}
                aria-invalid={formData.message.trim().length > 0 && (formData.message.trim().length < 20 || formData.message.trim().length > 1000)}
              ></textarea>
            </div>

            <TurnstilePlaceholder />

            <button
              type="submit"
              className={`btn btn-primary submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} aria-hidden="true" />
                  <span>{t.send}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
