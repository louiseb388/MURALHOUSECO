import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { QuoteWizard } from '../components/QuoteWizard';
import { IntroMask } from '../components/IntroMask';
import { CalendarCheckIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon, PaintRollerIcon, PencilIcon } from '../components/Icons';
import { banners, howItWorks, testimonials } from '../data/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Landing.css';

// One icon per howItWorks entry, in order (site visit, booked in, design agreed, painted on site).
const HOW_IT_WORKS_ICONS = [MapPinIcon, CalendarCheckIcon, PencilIcon, PaintRollerIcon];

// Hero steps: 0 = masked wordmark intro, 1..banners.length = one per banner
// photo. Each step owns one viewport-height of scroll — see .hero-scroll's
// height in Landing.css, which must stay at HERO_STEPS * 100vh.
const HERO_STEPS = banners.length + 1;

export function Landing() {
  useDocumentTitle('Mural House: hand-painted wall murals');

  const [searchParams] = useSearchParams();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0); // continuous, 0..HERO_STEPS
  const heroScrollRef = useRef<HTMLDivElement>(null);

  // Read on mount only, matching the design's "?quote=1 auto-opens the wizard" behavior.
  useEffect(() => {
    if (searchParams.get('quote') === '1') setWizardOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drives the whole hero sequence: how far the user has scrolled through
  // the tall .hero-scroll wrapper, expressed as a continuous value from 0
  // (top, mask fully down) to HERO_STEPS (past the last banner). The mask
  // scrubs 1:1 with this within step 0; steps 1+ just read off the floor.
  useEffect(() => {
    const wrapper = heroScrollRef.current;
    if (!wrapper) return;
    let raf = 0;
    const measure = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      setHeroProgress(total > 0 ? (scrolled / total) * HERO_STEPS : 0);
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

  const heroStep = Math.min(HERO_STEPS - 1, Math.floor(heroProgress));
  const maskProgress = Math.min(1, heroProgress);
  const activeBanner = heroStep >= 1 ? banners[heroStep - 1] : null;

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const activeTestimonial = testimonials[testimonialIndex];

  return (
    <>
      <NavBar onQuoteClick={() => setWizardOpen(true)} />

      <div ref={heroScrollRef} className="hero-scroll">
        <div className="hero">
          {banners.map((banner) => (
            <img
              key={banner.id}
              src={banner.src}
              alt=""
              className="hero__slide"
              style={{
                display: activeBanner === banner ? 'block' : 'none',
                objectPosition: banner.objectPosition,
                transform: `scale(${banner.scale})`,
                transformOrigin: banner.transformOrigin,
              }}
            />
          ))}

          <div className="hero__scrim" />

          {activeBanner && (
            <div className="hero__content">
              <h1 className="hero__step-heading">
                <span>{activeBanner.headline.line1}</span>
                <span>{activeBanner.headline.line2}</span>
              </h1>
              <button type="button" className="btn btn-primary btn-cta" onClick={() => setWizardOpen(true)}>
                Get instant quote
              </button>
            </div>
          )}

          <p className="hero__sub">Residential and commercial sites. Covering Surrey &amp; West Sussex.</p>

          <div className="hero__progress">
            {Array.from({ length: HERO_STEPS }, (_, i) => (
              <div
                key={i}
                className="hero__progress-seg"
                style={{ background: i === heroStep ? 'var(--color-bg)' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </div>

          {heroStep === 0 && <IntroMask progress={maskProgress} imageSrc={banners[0].src} />}
        </div>
      </div>

      <div className="ticker">
        <span>Free site visit, no obligation</span>
        <span>Instant quote in under a minute</span>
      </div>

      <div className="container">
        <hr className="hr" />

        <section id="how" style={{ padding: '48px 0 32px' }}>
          <span className="kicker" style={{ marginBottom: 24 }}>
            How it works
          </span>
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
          <span className="kicker" style={{ marginBottom: 20 }}>
            What clients say
          </span>
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
          <h3>Want to get started?</h3>
          <button
            type="button"
            className="btn btn-ghost btn-cta"
            style={{ color: 'var(--color-bg)', borderColor: 'var(--color-bg)' }}
            onClick={() => setWizardOpen(true)}
          >
            Get instant quote
          </button>
        </div>
      </section>

      <Footer noTopDivider />

      <QuoteWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </>
  );
}
