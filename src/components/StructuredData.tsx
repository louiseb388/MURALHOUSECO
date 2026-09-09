import { useEffect } from 'react';
import ogImage from '../assets/truck-mural-cutout.jpg';

const SCRIPT_ID = 'structured-data-local-business';

/**
 * Injects LocalBusiness JSON-LD once per session. Same business info on
 * every page, so unlike useSEO this doesn't need to re-run per route.
 * window.location.origin (rather than a hardcoded domain) so this stays
 * correct wherever the site actually ends up deployed.
 */
export function StructuredData() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const origin = window.location.origin;
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': origin,
      name: 'Mural House Co.',
      url: origin,
      image: `${origin}${ogImage}`,
      description:
        "Hand-painted wall murals for kids' bedrooms, homes and commercial spaces across Surrey & West Sussex.",
      telephone: '+441234567890',
      email: 'hello@studiomural.co.uk',
      priceRange: '££',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Surrey' },
        { '@type': 'AdministrativeArea', name: 'West Sussex' },
      ],
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }, []);

  return null;
}
