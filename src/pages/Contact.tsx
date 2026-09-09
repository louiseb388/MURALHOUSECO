import { useState, type FormEvent } from 'react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { CONTACT_EMAIL, CONTACT_PHONE } from '../data/content';
import { useSEO } from '../hooks/useSEO';

export function Contact() {
  useSEO({
    title: 'Contact Us | Mural House Co.',
    description: 'Get in touch with Mural House Co. by phone, email, or our contact form. Covering Surrey & West Sussex.',
    path: '/contact',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

        <hr className="hr" />

        <section className="grid-2" style={{ padding: '48px 0 64px' }}>
          {submitted ? (
            <div>
              <h2 style={{ fontSize: 26, margin: '0 0 12px' }}>Message sent</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, maxWidth: '48ch' }}>
                Thanks{nameSuffix}, we'll reply within 2 business days.
              </p>
            </div>
          ) : (
            <form style={{ display: 'grid', gap: 14 }} onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-primary btn-block">
                Send message
              </button>
            </form>
          )}

          <div>
            <h2 style={{ fontSize: 26, margin: '0 0 16px' }}>Contact details</h2>
            <p style={{ fontSize: 15.5, margin: '0 0 8px' }}>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p style={{ fontSize: 15.5, margin: 0 }}>
              <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
