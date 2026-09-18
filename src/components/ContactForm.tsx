import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  recipientEmail?: string;
}

export function ContactForm({ recipientEmail = 'contact@gdeep.in' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
          _template: 'box',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success !== 'false') {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Could not send message. Please try sending directly to the email above.');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      // Fallback: If network / CORS prevents ajax, we can provide direct mailto or clear error
      setStatus('error');
      setErrorMessage('Network error during dispatch. You can also write directly to ' + recipientEmail);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800">
      <h3 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 mb-4 font-mono">
        Send a Message
      </h3>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xs flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-stone-900 dark:text-white shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-stone-950 dark:text-white">Message sent</p>
              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                Thank you for reaching out. Your message has been forwarded to {recipientEmail}.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-3 text-xs font-medium text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white border-b border-stone-400 dark:border-stone-600 transition-colors cursor-pointer"
              >
                Send another note
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md font-sans"
          >
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="contact-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Elena Rostova"
                className="w-full text-base sm:text-sm px-3.5 py-2.5 bg-stone-50/50 dark:bg-stone-900/40 border border-stone-300 dark:border-stone-700 focus:border-stone-950 dark:focus:border-stone-100 focus:ring-1 focus:ring-stone-950 dark:focus:ring-stone-100 outline-none text-stone-950 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-500 rounded-xs transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="contact-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full text-base sm:text-sm px-3.5 py-2.5 bg-stone-50/50 dark:bg-stone-900/40 border border-stone-300 dark:border-stone-700 focus:border-stone-950 dark:focus:border-stone-100 focus:ring-1 focus:ring-stone-950 dark:focus:ring-stone-100 outline-none text-stone-950 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-500 rounded-xs transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Thoughts, collaboration ideas, or inquiries..."
                className="w-full text-base sm:text-sm px-3.5 py-2.5 bg-stone-50/50 dark:bg-stone-900/40 border border-stone-300 dark:border-stone-700 focus:border-stone-950 dark:focus:border-stone-100 focus:ring-1 focus:ring-stone-950 dark:focus:ring-stone-100 outline-none text-stone-950 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-500 rounded-xs transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs font-medium text-red-600 dark:text-red-400">{errorMessage}</p>
            )}

            <motion.button
              type="submit"
              id="contact-submit-btn"
              disabled={status === 'submitting'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[44px] text-xs uppercase tracking-widest font-bold text-white dark:text-stone-950 bg-stone-950 dark:bg-stone-50 hover:bg-stone-800 dark:hover:bg-white transition-colors rounded-xs disabled:opacity-50 w-full sm:w-auto cursor-pointer shadow-xs"
            >
              {status === 'submitting' ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Note</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
