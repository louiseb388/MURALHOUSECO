import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { PlusIcon } from '../components/Icons';
import { faqItems } from '../data/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function FAQ() {
  useDocumentTitle('FAQ: Mural House');

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
