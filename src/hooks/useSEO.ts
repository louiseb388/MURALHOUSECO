import { useEffect } from 'react';
import ogImage from '../assets/truck-mural-cutout.jpg';

type SEOOptions = {
  title: string;
  description: string;
  /** Route path, e.g. '/process' — used to build the canonical URL and og:url. */
  path: string;
};

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets title, meta description, canonical URL, and Open Graph/Twitter Card
 * tags for the current route. This is a client-side SPA, so these updates
 * only help crawlers that execute JS (Google does; some others don't) — see
 * the README for the SSR/prerendering caveat.
 */
export function useSEO({ title, description, path }: SEOOptions) {
  useEffect(() => {
    document.title = title;
    setMetaTag('name', 'description', description);

    const url = `${window.location.origin}${path}`;
    const image = `${window.location.origin}${ogImage}`;

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', 'Mural House Co.');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, path]);
}
