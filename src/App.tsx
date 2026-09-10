import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { StructuredData } from './components/StructuredData';
import { CookieBanner } from './components/CookieBanner';
import { getStoredConsent } from './lib/cookieConsent';
import { Landing } from './pages/Landing';
import { Process } from './pages/Process';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';

export default function App() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => getStoredConsent() === 'accepted');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <StructuredData />
      {analyticsEnabled && <Analytics />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/process" element={<Process />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <CookieBanner onChoose={(consent) => setAnalyticsEnabled(consent === 'accepted')} />
    </BrowserRouter>
  );
}
