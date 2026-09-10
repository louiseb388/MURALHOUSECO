const STORAGE_KEY = 'mhc-cookie-consent';

export type Consent = 'accepted' | 'declined';

export function getStoredConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Private browsing etc. — banner just reappears next visit, which is fine.
  }
}
