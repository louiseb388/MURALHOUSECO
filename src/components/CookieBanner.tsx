import { useState } from 'react';
import { getStoredConsent, setStoredConsent, type Consent } from '../lib/cookieConsent';

type CookieBannerProps = {
  onChoose: (consent: Consent) => void;
};

export function CookieBanner({ onChoose }: CookieBannerProps) {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  const choose = (consent: Consent) => {
    setStoredConsent(consent);
    onChoose(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p>We use cookies for basic, anonymous site analytics. Nothing is loaded until you choose.</p>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn-secondary" onClick={() => choose('declined')}>
          Decline
        </button>
        <button type="button" className="btn btn-primary" onClick={() => choose('accepted')}>
          Accept
        </button>
      </div>
    </div>
  );
}
