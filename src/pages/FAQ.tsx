import { useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { PlusIcon } from '../components/Icons';
import { faqItems } from '../data/content';
import { useSEO } from '../hooks/useSEO';

const FAQ_SCRIPT_ID = 'structured-data-faq-page';

export function FAQ() {
  useSEO({
    title: 'FAQ: Mural Painting Questions Answered | Mural House Co.',
    description:
      "Answers to the questions we're asked most about mural painting: paint safety, timelines, pricing and what to expect from your site visit.",
    path: '/faq',
  });

  // FAQPage structured data — lets Google show these Q&As as an expandable
  // rich result. Only valid while this page is showing, so it's added on
  // mount and removed on unmount (unlike the site-wide LocalBusiness data).
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    };
    const script = document.createElement('script');
    script.id = FAQ_SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <NavBar />

      <div className="container">
        <section className="page-header">
          <h1>Frequently asked questions</h1>
          <p>Answers to what we're asked most. For anything else, get in touch.</p>
        </section>

        <hr className="hr" />

        <section style={{ padding: '8px 0 56px' }}>
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                {item.question}
                <PlusIcon size={18} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}
