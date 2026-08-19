import { useState } from 'react';
import { sendContactMessage } from '../../api/api';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './Contact.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  // Show toast notification and auto-dismiss after 5 seconds
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Client-side validation checks
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await sendContactMessage(formData);
      showToast('success', 'Thank you! Your message has been sent successfully.');
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      showToast(
        'error',
        err.message || 'Failed to send message. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or looking for a full-stack engineer? Send me a message!
          </p>
        </div>

        {/* Floating Toast Notification */}
        {toast && (
          <div className={`toast-notification toast-${toast.type}`} role="status">
            {toast.type === 'success' ? (
              <CheckCircle2 size={20} className="toast-icon" />
            ) : (
              <AlertCircle size={20} className="toast-icon" />
            )}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Contact Form Card */}
        <form onSubmit={handleSubmit} className="contact-card" noValidate>
          <div className="form-grid">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                disabled={loading}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                disabled={loading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Freelance project / Full-time opportunity"
              className="form-input"
              disabled={loading}
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message <span className="required-star">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or role..."
              className={`form-input form-textarea ${
                errors.message ? 'input-error' : ''
              }`}
              disabled={loading}
            />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spinner" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}