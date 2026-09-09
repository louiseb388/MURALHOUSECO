import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { CONTACT_EMAIL } from '../data/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Contact() {
  useDocumentTitle('Contact: Mural House');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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
          <p>
            Already know roughly what you want? Use the <Link to="/?quote=1">instant quote</Link> tool instead. For
            anything else, send us a message.
          </p>
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
              <button type="submit" className="btn btn-primary btn-block">
                Send message
              </button>
            </form>
          )}

          <div>
            <h2 style={{ fontSize: 26, margin: '0 0 12px' }}>Prefer email?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, margin: '0 0 20px', maxWidth: '48ch' }}>
              Write to us directly and we'll get back to you within 2 business days.
            </p>
            <p style={{ fontSize: 15.5, margin: 0 }}>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
