import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { QuoteWizard } from '../components/QuoteWizard';
import { IntroMask } from '../components/IntroMask';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '../components/Icons';
import { banners, howItWorks, testimonials } from '../data/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Landing.css';

const CAROUSEL_INTERVAL_MS = 5000;
const CAROUSEL_TRANSITION_MS = 800;
const INTRO_DWELL_MS = 2000;
const INTRO_LIFT_MS = 900;

type SlideState = { active: number; exiting: number | null };

export function Landing() {
  useDocumentTitle('Mural House: hand-painted wall murals');

  const [searchParams] = useSearchParams();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [introPhase, setIntroPhase] = useState<'mask' | 'lifting' | 'done'>('mask');
  const [slideState, setSlideState] = useState<SlideState>({ active: 0, exiting: null });
  const [bannerPlaying, setBannerPlaying] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Read on mount only, matching the design's "?quote=1 auto-opens the wizard" behavior.
  useEffect(() => {
    if (searchParams.get('quote') === '1') setWizardOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // One-time intro: dwell on the giant masked wordmark, then lift it away.
  // Skipped for reduced-motion users, who land straight on the full hero.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroPhase('done');
      return;
    }
    const liftTimer = setTimeout(() => setIntroPhase('lifting'), INTRO_DWELL_MS);
    return () => clearTimeout(liftTimer);
  }, []);

  useEffect(() => {
    if (introPhase !== 'lifting') return;
    const doneTimer = setTimeout(() => setIntroPhase('done'), INTRO_LIFT_MS);
    return () => clearTimeout(doneTimer);
  }, [introPhase]);

  // Steps the carousel by `step` slides, sliding the outgoing image up to
  // reveal the next one (already sitting static underneath). Ignored while a
  // transition is already in flight.
  const advance = (step: number) => {
    setSlideState((s) => {
      if (s.exiting !== null) return s;
      const next = (s.active + step + banners.length) % banners.length;
      return { active: next, exiting: s.active };
    });
  };
  const goToBanner = (index: number) => {
    setSlideState((s) => (s.exiting !== null || s.active === index ? s : { active: index, exiting: s.active }));
  };

  // Clears the exiting slide once its slide-up transition has finished.
  useEffect(() => {
    if (slideState.exiting === null) return;
    const t = setTimeout(() => {
      setSlideState((s) => ({ ...s, exiting: null }));
    }, CAROUSEL_TRANSITION_MS);
    return () => clearTimeout(t);
  }, [slideState.exiting]);

  const bannerPlayingRef = useRef(bannerPlaying);
  bannerPlayingRef.current = bannerPlaying;

  // Autoplay only starts once the intro has finished handing off to the full hero.
  useEffect(() => {
    if (introPhase !== 'done') return;
    const timer = setInterval(() => {
      if (bannerPlayingRef.current) advance(1);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introPhase]);

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const activeTestimonial = testimonials[testimonialIndex];

  return (
    <>
      <NavBar onQuoteClick={() => setWizardOpen(true)} />

      {introPhase !== 'done' && <IntroMask lifted={introPhase === 'lifting'} imageSrc={banners[0].src} />}

      <div className="hero">
        {banners.map((banner, i) => {
          const isExiting = i === slideState.exiting;
          const isActive = i === slideState.active;
          return (
            <div
              key={banner.id}
              className="hero__slide-layer"
              style={{
                zIndex: isExiting ? 3 : isActive ? 2 : 1,
                transform: `translateY(${isExiting ? '-100%' : '0%'})`,
                transitionDuration: `${CAROUSEL_TRANSITION_MS}ms`,
              }}
            >
              <img
                src={banner.src}
                alt=""
                className="hero__slide"
                style={{
                  objectPosition: banner.objectPosition,
                  transform: `scale(${banner.scale})`,
                  transformOrigin: banner.transformOrigin,
                }}
              />
            </div>
          );
        })}

        <p className="hero__sub">Residential and commercial sites. Covering Surrey &amp; West Sussex.</p>

        <div className="hero__progress">
          {banners.map((banner, i) => (
            <button
              key={banner.id}
              type="button"
              aria-label="Go to image"
              className="hero__progress-seg"
              onClick={() => goToBanner(i)}
              style={{ background: i === slideState.active ? 'var(--color-bg)' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>

        <div className="hero__controls">
          <button
            type="button"
            className="btn btn-secondary btn-icon btn-icon--on-dark"
            aria-label="Previous image"
            onClick={() => advance(-1)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-icon btn-icon--on-dark"
            aria-label="Next image"
            onClick={() => advance(1)}
          >
            <ChevronRightIcon />
          </button>
          {bannerPlaying ? (
            <button
              type="button"
              className="btn btn-secondary btn-icon btn-icon--on-dark"
              aria-label="Pause slideshow"
              onClick={() => setBannerPlaying(false)}
            >
              <PauseIcon />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-icon btn-icon--on-dark"
              aria-label="Play slideshow"
              onClick={() => setBannerPlaying(true)}
            >
              <PlayIcon />
            </button>
          )}
        </div>

        <div className="hero__scrim" />

        <div className="hero__content">
          <h1 className="hero__heading">
            <span>Wall murals,</span>
            <span>hand-painted.</span>
          </h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary btn-cta" onClick={() => setWizardOpen(true)}>
              Get instant quote
            </button>
          </div>
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
          {howItWorks.map((step, i) => (
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
