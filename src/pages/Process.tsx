import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { processSteps } from '../data/content';
import { useSEO } from '../hooks/useSEO';

export function Process() {
  useSEO({
    title: 'How a Mural Gets Painted: Our Process | Mural House Co.',
    description:
      'From site visit to the final brushstroke: how Mural House plans, prices and paints every mural, with low-VOC paint and a 50% deposit on booking.',
    path: '/process',
  });

  return (
    <>
      <NavBar />

      <div className="container">
        <section className="page-header">
          <h1>How a mural gets painted</h1>
          <p>From the first visit to the last brushstroke: what to expect, what we paint with, and how payment works.</p>
        </section>

        <hr className="hr" />

        <section style={{ padding: '48px 0 32px' }}>
          <h2 className="kicker" style={{ marginBottom: 24 }}>
            The process
          </h2>
          {processSteps.map((step, i) => (
            <div className="step-row" key={step.title}>
              <p className="step-row__num">{String(i + 1).padStart(2, '0')}</p>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </section>

        <hr className="hr" />

        <section className="grid-2" style={{ padding: '48px 0' }}>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Paint &amp; materials
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              Low-VOC, water-based, and safe once dry
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 12 }}>
              Every mural is painted in low-VOC, water-based acrylics with a washable matte finish, the same category
              of paint used on the rest of the room, so it's safe for kids' bedrooms once it's dry.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 0 }}>
              Because it's brush and roller work straight onto your existing wall, there's no lamination or backing
              to peel, fade or bubble over time.
            </p>
          </div>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Pricing &amp; payment
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              £120 per square metre, for most designs
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 12 }}>
              Price is based on the wall area to be painted. Exceptionally large or highly detailed murals may be
              quoted individually after the site visit.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 20 }}>
              A 50% deposit is taken upfront to cover materials, with the remaining balance due on completion.
            </p>
            <Link to="/?quote=1" className="btn btn-primary btn-cta">
              Get started
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
