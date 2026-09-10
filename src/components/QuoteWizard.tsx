import { useState } from 'react';
import { PRICE_PER_SQM } from '../data/content';
import { submitToWeb3Forms } from '../lib/web3forms';
import { XIcon } from './Icons';

type QuoteWizardProps = {
  open: boolean;
  onClose: () => void;
};

type Step = 1 | 2 | 4;
type SubmitStatus = 'idle' | 'sending' | 'error';

export function QuoteWizard({ open, onClose }: QuoteWizardProps) {
  const [step, setStep] = useState<Step>(1);
  const [wasOpen, setWasOpen] = useState(open);
  const [widthM, setWidthM] = useState('');
  const [heightM, setHeightM] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [brief, setBrief] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  // Every time the wizard is opened it restarts at step 1, but the form
  // fields themselves persist across an open/close cycle within a visit.
  // Adjusting state during render (React's recommended pattern for
  // "reset state when a prop changes") avoids an extra effect-triggered render.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setStep(1);
      setSubmitStatus('idle');
    }
  }

  const width = parseFloat(widthM) || 0;
  const height = parseFloat(heightM) || 0;
  const sqm = width * height;
  const price = Math.round(sqm * PRICE_PER_SQM);

  const next1Disabled = !(width > 0 && height > 0);
  const next2Disabled = !(name.trim() !== '' && email.includes('@') && brief.trim() !== '');
  const nameSuffix = name.trim() ? `, ${name.trim()}` : '';
  const stepNum = Math.min(step, 2);

  const handleSubmit = async () => {
    setSubmitStatus('sending');

    const ok = await submitToWeb3Forms(
      {
        subject: `New instant quote request from ${name} via Mural House website`,
        name,
        email,
        phone,
        postcode,
        wall_size: `${width}m × ${height}m (${sqm.toFixed(1)} m²)`,
        estimated_price: `£${price.toLocaleString('en-GB')}`,
        message: brief,
      },
      images,
    );

    if (ok) {
      setSubmitStatus('idle');
      setStep(4);
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div
      className={`dialog-backdrop${open ? '' : ' dialog-backdrop--closed'}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className="dialog"
        style={{ width: 'min(560px, 100%)', maxHeight: '88vh', overflow: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span className="dialog-kicker">Instant quote, step {stepNum} of 2</span>
          <button type="button" className="btn btn-secondary btn-icon" aria-label="Close" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="dialog-title">Your wall</div>
            <div style={{ display: 'grid', gap: 14, marginTop: 8 }}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="wall-width">Wall width (m)</label>
                  <input
                    className="input"
                    id="wall-width"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 3.2"
                    value={widthM}
                    onChange={(e) => setWidthM(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="wall-height">Wall height (m)</label>
                  <input
                    className="input"
                    id="wall-height"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 2.4"
                    value={heightM}
                    onChange={(e) => setHeightM(e.target.value)}
                  />
                </div>
              </div>
              <p style={{ fontSize: 14, margin: 0, opacity: 0.75 }}>
                Roughly {sqm > 0 ? sqm.toFixed(1) : '0'} m² to paint.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '14px 0',
                  borderTop: '2px solid var(--color-divider)',
                }}
              >
                <span style={{ fontSize: 14, opacity: 0.7 }}>Estimated price, subject to site visit*</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 26, color: 'var(--color-accent)' }}>
                  £{price.toLocaleString('en-GB')}
                </span>
              </div>
            </div>
            <div className="dialog-actions">
              <button type="button" className="btn btn-primary" disabled={next1Disabled} onClick={() => setStep(2)}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="dialog-title">Your details</div>
            <div style={{ display: 'grid', gap: 14, marginTop: 8 }}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="q-name">Name</label>
                  <input className="input" id="q-name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="q-email">Email</label>
                  <input
                    className="input"
                    id="q-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="q-phone">Phone (optional)</label>
                  <input className="input" id="q-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="q-postcode">Postcode (optional)</label>
                  <input
                    className="input"
                    id="q-postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="q-brief">What would you like painted?</label>
                <textarea
                  className="input"
                  id="q-brief"
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="q-images">Reference images (optional)</label>
                <input
                  className="input"
                  id="q-images"
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
              {submitStatus === 'error' && (
                <p style={{ fontSize: 13.5, margin: 0, color: '#b3261e' }}>
                  Something went wrong sending your request. Please try again.
                </p>
              )}
            </div>
            <div className="dialog-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={next2Disabled || submitStatus === 'sending'}
                onClick={handleSubmit}
              >
                {submitStatus === 'sending' ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="dialog-title" style={{ fontWeight: 400 }}>Message sent</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: '8px 0 0' }}>
              Thanks{nameSuffix} for your message. We'll be in touch within 2 business days.
            </p>
            <div className="dialog-actions">
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
