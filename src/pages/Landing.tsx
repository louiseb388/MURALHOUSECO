import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { QuoteWizard } from '../components/QuoteWizard';
import { IntroMask } from '../components/IntroMask';
import { CalendarCheckIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon, PaintRollerIcon, PencilIcon } from '../components/Icons';
import { banners, howItWorks, testimonials } from '../data/content';
import { useSEO } from '../hooks/useSEO';
import './Landing.css';

// One icon per howItWorks entry, in order (site visit, booked in, design agreed, painted on site).
const HOW_IT_WORKS_ICONS = [MapPinIcon, CalendarCheckIcon, PencilIcon, PaintRollerIcon];

// How long each hero photo (and its matching headline) stays on screen
// before the carousel flicks to the next one. Runs on its own clock from
// mount, independent of scroll, and loops forever.
const CAROUSEL_INTERVAL_MS = 1000;

export function Landing() {
  useSEO({
    title: 'Hand-Painted Wall Murals in Surrey & West Sussex | Mural House Co.',
    description:
      "Hand-painted wall murals for kids' bedrooms, homes and commercial spaces across Surrey & West Sussex. Get an instant, no-obligation quote in under a minute.",
    path: '/',
  });

  const [searchParams] = useSearchParams();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // which banner the carousel is currently showing
  const [maskProgress, setMaskProgress] = useState(0); // 0 = mask fully covers hero, 1 = fully lifted off
  const heroScrollRef = useRef<HTMLDivElement>(null);

  // Read on mount only, matching the design's "?quote=1 auto-opens the wizard" behavior.
  useEffect(() => {
    if (searchParams.get('quote') === '1') setWizardOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The photo/headline carousel: advances on its own clock, not tied to
  // scroll, so it's already cycling behind the mask before the user does
  // anything, and keeps looping once revealed.
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % banners.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Scroll only ever does one thing here: lift the mask off the hero, from
  // 0 (fully down) to 1 (fully off). See .hero-scroll's height in
  // Landing.css, which owns the 100vh of scroll room this expects.
  useEffect(() => {
    const wrapper = heroScrollRef.current;
    if (!wrapper) return;
    let raf = 0;
    const measure = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      setMaskProgress(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const activeBanner = banners[activeIndex];

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const activeTestimonial = testimonials[testimonialIndex];

  return (
    <>
      <NavBar onQuoteClick={() => setWizardOpen(true)} />

      <div ref={heroScrollRef} className="hero-scroll">
        <div className="hero">
          {banners.map((banner, i) => (
            <img
              key={banner.id}
              src={banner.src}
              alt={banner.alt}
              aria-hidden={i !== activeIndex}
              className="hero__slide"
              // The truck (i === 0) is the LCP candidate — it's what paints
              // first, before any scroll or carousel movement.
              fetchPriority={i === 0 ? 'high' : 'auto'}
              style={{
                opacity: i === activeIndex ? 1 : 0,
                zIndex: i === activeIndex ? 2 : 1,
                objectPosition: banner.objectPosition,
                transform: `scale(${banner.scale})`,
                transformOrigin: banner.transformOrigin,
              }}
            />
          ))}

          <div className="hero__scrim" />

          <div className="hero__content">
            {/* Keyed on the active banner so each swap remounts the heading,
                retriggering its fade-in animation — see @keyframes
                heroHeadlineIn in Landing.css. Only one h1 ever exists at a
                time, so the page keeps a single, unambiguous h1. */}
            <h1 key={activeBanner.id} className="hero__step-heading">
              {activeBanner.headline}
            </h1>
            <button type="button" className="btn btn-primary btn-cta" onClick={() => setWizardOpen(true)}>
              Get started
            </button>
          </div>

          <p className="hero__sub">Residential and commercial sites. Covering Surrey &amp; West Sussex.</p>

          <div className="hero__progress">
            {banners.map((banner, i) => (
              <div
                key={banner.id}
                className="hero__progress-seg"
                style={{ background: i === activeIndex ? 'var(--color-bg)' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </div>

          {/* Fixed on the first banner, not activeBanner — the mask is a
              single static image behind all three words, independent of the
              carousel ticking away underneath it. */}
          <IntroMask progress={maskProgress} imageSrc={banners[0].src} />
        </div>
      </div>

      <div className="ticker">
        <span>Free site visit, no obligation</span>
        <span>Instant quote in under a minute</span>
      </div>

      <div className="container">
        <hr className="hr" />

        <section id="how" style={{ padding: '48px 0 32px' }}>
          <h2 className="kicker" style={{ marginBottom: 24 }}>
            How it works
          </h2>
          <div className="how-it-works">
            {howItWorks.map((step, i) => {
              const StepIcon = HOW_IT_WORKS_ICONS[i];
              return (
                <div className="how-it-works__item" key={step.title}>
                  <div className="how-it-works__icon">
                    <StepIcon size={26} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <hr className="hr" />

        <section style={{ padding: '48px 0' }}>
          <h2 className="kicker" style={{ marginBottom: 20 }}>
            What clients say
          </h2>
          <blockquote className="testimonial-quote">{activeTestimonial.quote}</blockquote>
          <p className="testimonial-caption">{activeTestimonial.name}</p>
          <div className="testimonial-controls">
            <button type="button" className="btn btn-secondary btn-icon" aria-label="Previous testimonial" onClick={prevTestimonial}>
              <ChevronLeftIcon />
            </button>
            <div className="testimonial-dots">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label="Go to testimonial"
                  className="testimonial-dot"
                  onClick={() => setTestimonialIndex(i)}
                  style={{ background: i === testimonialIndex ? 'var(--color-accent)' : 'var(--color-divider)' }}
                />
              ))}
            </div>
            <button type="button" className="btn btn-secondary btn-icon" aria-label="Next testimonial" onClick={nextTestimonial}>
              <ChevronRightIcon />
            </button>
          </div>
        </section>
      </div>

      <section className="cta-band">
        <div className="cta-band__inner">
          <h2>Want to get started?</h2>
          <button
            type="button"
            className="btn btn-ghost btn-cta"
            style={{ color: 'var(--color-bg)', borderColor: 'var(--color-bg)' }}
            onClick={() => setWizardOpen(true)}
          >
            Get started
          </button>
        </div>
      </section>

      <Footer noTopDivider />

      <QuoteWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </>
  );
}
