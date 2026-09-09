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

// Hero steps: 0 = masked wordmark intro, 1..banners.length = one per banner
// photo. Each step owns one viewport-height of scroll — see .hero-scroll's
// height in Landing.css, which must stay at HERO_STEPS * 100vh.
const HERO_STEPS = banners.length + 1;

// How much of each step's scroll range is spent crossfading into the next
// banner (the rest is a plateau at full opacity, comfortable for reading).
const CROSSFADE_WIDTH = 0.35;
// How close to a step boundary (in banner-index units) the headline dips
// out/in when it swaps — a quick cross-dissolve synced to the swap itself,
// not a lingering overlap of two headlines.
const TEXT_FADE_WIDTH = 0.12;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

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

  // Continuous position in banner-index space (0 = truck .. banners.length-1
  // = motorbike), driving a scroll-scrubbed crossfade instead of a jump cut.
  const bannerPos = Math.max(0, heroProgress - 1);
  const bannerOpacity = (i: number) =>
    i === 0 ? 1 : clamp01((bannerPos - (i - CROSSFADE_WIDTH)) / CROSSFADE_WIDTH);

  // Headline swaps at the midpoint of the image crossfade window (not the
  // midpoint of the whole step — that window only occupies the last
  // CROSSFADE_WIDTH of each step), with a brief dip so it never overlaps
  // illegibly with the outgoing headline.
  const shiftedPos = bannerPos + CROSSFADE_WIDTH / 2;
  const textStep = Math.min(banners.length, Math.floor(shiftedPos) + 1);
  const activeBanner = textStep >= 1 ? banners[textStep - 1] : null;
  const distFromTextSwap = Math.abs(shiftedPos - Math.round(shiftedPos));
  const textOpacity = heroStep === 0 ? 0 : clamp01(distFromTextSwap / TEXT_FADE_WIDTH);

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
              className="hero__slide"
              // The truck (i === 0) is the LCP candidate — it's what paints
              // first, before any scroll. The other two are already needed
              // early in the scroll sequence, so still eager, just not
              // fetch-prioritized over the first paint.
              fetchPriority={i === 0 ? 'high' : 'auto'}
              style={{
                opacity: bannerOpacity(i),
                zIndex: i + 1,
                objectPosition: banner.objectPosition,
                transform: `scale(${banner.scale})`,
                transformOrigin: banner.transformOrigin,
              }}
            />
          ))}

          <div className="hero__scrim" />

          {activeBanner && (
            <div className="hero__content" style={{ opacity: textOpacity }}>
              <h1 className="hero__step-heading">{activeBanner.headline}</h1>
              <button type="button" className="btn btn-primary btn-cta" onClick={() => setWizardOpen(true)}>
                Get started
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
