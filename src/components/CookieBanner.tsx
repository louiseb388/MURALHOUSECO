import { useLayoutEffect, useRef, useState } from 'react';
import { getStoredConsent, setStoredConsent, type Consent } from '../lib/cookieConsent';

type CookieBannerProps = {
  onChoose: (consent: Consent) => void;
};

export function CookieBanner({ onChoose }: CookieBannerProps) {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);
  const ref = useRef<HTMLDivElement>(null);

  // Reserves space at the bottom of the page equal to the banner's own
  // height, so a short page's footer ends up above it instead of underneath
  // it — otherwise the fixed banner can sit on top of the footer links and
  // swallow their clicks.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!visible || !el) {
      document.body.style.removeProperty('padding-bottom');
      return;
    }

    const updatePadding = () => {
      document.body.style.paddingBottom = `${el.offsetHeight + 32}px`;
    };
    updatePadding();

    const observer = new ResizeObserver(updatePadding);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.style.removeProperty('padding-bottom');
    };
  }, [visible]);

  const choose = (consent: Consent) => {
    setStoredConsent(consent);
    onChoose(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div ref={ref} className="cookie-banner" role="dialog" aria-label="Cookie notice">
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
