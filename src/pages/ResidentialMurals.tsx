import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

export function ResidentialMurals() {
  useSEO({
    title: 'Residential Wall Murals | Mural House Co.',
    description:
      "Hand-painted residential murals for kids' bedrooms, adult bedrooms and family living spaces across Surrey & West Sussex.",
    path: '/residential-murals',
  });

  return (
    <>
      <NavBar />

      <div className="container">
        <section className="page-header">
          <h1>Residential murals</h1>
          <p>
            Hand-painted murals for bedrooms, playrooms and living spaces, designed around your family and painted
            directly onto your walls.
          </p>
        </section>

        <hr className="hr" />

        <section className="grid-2" style={{ padding: '48px 0' }}>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Kids' bedrooms
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              A room they don't want to grow out of
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 0 }}>
              Most of our work is kids' bedrooms — everything from a monster truck scaling one wall to a full
              woodland scene wrapping the room. We paint in low-VOC, water-based acrylics with a washable matte
              finish, so it's safe once dry and holds up to daily life.
            </p>
          </div>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Adult &amp; family spaces
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              Beyond the nursery
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 0 }}>
              We also paint adult bedrooms, home offices, playrooms, hallways and living spaces — a feature wall, a
              statement piece, or something that fills the whole room. If you can describe it, we can design it.
            </p>
          </div>
        </section>

        <hr className="hr" />

        <section style={{ padding: '48px 0 56px', maxWidth: '58ch' }}>
          <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
            How it starts
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 20 }}>
            A free site visit, an instant estimate based on your wall size, and a design agreed with you before we
            paint a thing. Most bedroom murals take one to three days on site.
          </p>
          <Link to="/?quote=1" className="btn btn-primary btn-cta">
            Get started
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}
