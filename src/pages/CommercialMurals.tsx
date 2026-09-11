import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

export function CommercialMurals() {
  useSEO({
    title: 'Commercial Wall Murals | Mural House Co.',
    description:
      'Hand-painted commercial murals for offices, shops, restaurants and exhibitions across Surrey & West Sussex — branding, themed spaces and more.',
    path: '/commercial-wall-murals',
  });

  return (
    <>
      <NavBar />

      <div className="container">
        <section className="page-header">
          <h1>Commercial wall murals</h1>
          <p>
            Hand-painted murals for offices, shops, restaurants and events — working around your opening hours so you
            don't lose a day of trade.
          </p>
        </section>

        <hr className="hr" />

        <section className="grid-2" style={{ padding: '48px 0' }}>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Branding
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              Your logo and colours, on the wall
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 0 }}>
              Reception areas, offices and shopfronts painted in your brand's colours and identity — a logo wall, a
              feature graphic, or a full branded space that makes an impression the moment someone walks in.
            </p>
          </div>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Themed murals
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              A space with a story
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 0 }}>
              Cafés, restaurants, salons and play centres designed around a theme — from a full scene across every
              wall to a single statement piece that sets the tone for the room.
            </p>
          </div>
        </section>

        <hr className="hr" />

        <section className="grid-2" style={{ padding: '48px 0' }}>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Exhibitions &amp; events
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              Built to a deadline
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 0 }}>
              Pop-ups, exhibition stands and temporary installations painted to a fixed date, with the same care as a
              permanent mural — planned around your build schedule and opening day.
            </p>
          </div>
          <div>
            <span className="kicker" style={{ marginBottom: 16 }}>
              Working around you
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
              Minimal disruption
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 0 }}>
              We can paint out of hours, overnight, or in phases around a working site, so your business keeps running
              while the mural comes together.
            </p>
          </div>
        </section>

        <hr className="hr" />

        <section style={{ padding: '48px 0 56px', maxWidth: '58ch' }}>
          <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 30px)', margin: '0 0 16px', letterSpacing: '-0.015em' }}>
            Get a quote for your space
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 20 }}>
            Tell us about your site and we'll arrange a free visit to measure up, talk through the design and confirm
            a price.
          </p>
          <Link to="/?quote=1" className="btn btn-primary btn-cta">
            Quote me
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}
