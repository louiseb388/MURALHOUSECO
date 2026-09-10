import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { surreyTowns, westSussexTowns } from '../data/content';
import { useSEO } from '../hooks/useSEO';

export function Locations() {
  useSEO({
    title: 'Wall Murals in Surrey & West Sussex | Mural House Co.',
    description:
      'Hand-painted wall murals across Surrey and West Sussex, covering Guildford, Woking, Chichester, Horsham and towns throughout both counties.',
    path: '/wall-murals-surrey-west-sussex',
  });

  return (
    <>
      <NavBar />

      <div className="container">
        <section className="page-header">
          <h1>Wall murals across Surrey &amp; West Sussex</h1>
          <p>
            We paint hand-finished murals in homes and businesses throughout Surrey and West Sussex. Here's where we
            regularly work.
          </p>
        </section>

        <hr className="hr" />

        <section className="grid-2" style={{ padding: '48px 0' }}>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Surrey
            </span>
            <ul className="town-list">
              {surreyTowns.map((town) => (
                <li key={town}>{town}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              West Sussex
            </span>
            <ul className="town-list">
              {westSussexTowns.map((town) => (
                <li key={town}>{town}</li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="hr" />

        <section style={{ padding: '48px 0 56px', maxWidth: '58ch' }}>
          <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
            Not seeing your town?
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 20 }}>
            This isn't an exhaustive list — we're happy to travel further afield across the South East for the right
            project. Get in touch and let us know where you are.
          </p>
          <Link to="/contact" className="btn btn-primary btn-cta">
            Contact us
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}
