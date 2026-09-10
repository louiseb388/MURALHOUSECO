import { useState, type FormEvent } from 'react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

// Web3Forms relays submissions straight to the business's inbox — this site
// has no backend of its own to send mail from. The access key is meant to
// be used client-side like this (it's not a secret; Web3Forms's own docs
// embed it directly in a plain HTML form), so there's nothing to hide here.
const WEB3FORMS_ACCESS_KEY = '7f8f15db-eaef-4644-8fa0-b5af2d4b06d0';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  useSEO({
    title: 'Contact Us | Mural House Co.',
    description: 'Get in touch with Mural House Co. through our contact form. Covering Surrey & West Sussex.',
    path: '/contact',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `New enquiry from ${name} via Mural House website`);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    images.forEach((file) => formData.append('attachment', file));

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const result = await res.json();
      setStatus(result.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const nameSuffix = name.trim() ? `, ${name.trim()}` : '';

  return (
    <>
      <NavBar />

      <div className="container">
        <section className="page-header">
          <h1>Get in touch</h1>
          <p>We usually reply within 2 business days.</p>
        </section>

        <section style={{ padding: '56px 0 64px', maxWidth: 480 }}>
          {status === 'sent' ? (
            <div>
              <h2 style={{ fontSize: 26, margin: '0 0 12px' }}>Message sent</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, maxWidth: '48ch' }}>
                Thanks{nameSuffix}, we'll reply within 2 business days.
              </p>
            </div>
          ) : (
            <form className="contact-form" style={{ display: 'grid', gap: 14 }} onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input className="input" id="c-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  className="input"
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-message">Message</label>
                <textarea
                  className="input"
                  id="c-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-images">Attach images (optional)</label>
                <input
                  className="input"
                  id="c-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages(Array.from(e.target.files ?? []))}
                />
                {images.length > 0 && (
                  <p style={{ fontSize: 13, margin: '6px 0 0', opacity: 0.7 }}>
                    {images.length} {images.length === 1 ? 'image' : 'images'} attached
                  </p>
                )}
              </div>
              {status === 'error' && (
                <p style={{ fontSize: 13.5, margin: 0, color: '#b3261e' }}>
                  Something went wrong sending your message. Please try again.
                </p>
              )}
              <button type="submit" className="btn btn-primary btn-cta" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
