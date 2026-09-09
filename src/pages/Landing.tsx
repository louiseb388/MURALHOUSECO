import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { QuoteWizard } from '../components/QuoteWizard';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '../components/Icons';
import { banners, howItWorks, testimonials } from '../data/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Landing.css';

const BANNER_INTERVAL_MS = 5000;

export function Landing() {
  useDocumentTitle('Mural House: hand-painted wall murals');

  const [searchParams] = useSearchParams();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerPlaying, setBannerPlaying] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Read on mount only, matching the design's "?quote=1 auto-opens the wizard" behavior.
  useEffect(() => {
    if (searchParams.get('quote') === '1') setWizardOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bannerPlayingRef = useRef(bannerPlaying);
  bannerPlayingRef.current = bannerPlaying;

  useEffect(() => {
    const timer = setInterval(() => {
      if (bannerPlayingRef.current) {
        setBannerIndex((i) => (i + 1) % banners.length);
      }
    }, BANNER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => setBannerIndex((i) => (i + 1) % banners.length);
  const prevBanner = () => setBannerIndex((i) => (i - 1 + banners.length) % banners.length);
  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const activeTestimonial = testimonials[testimonialIndex];

  return (
    <>
      <NavBar onQuoteClick={() => setWizardOpen(true)} />

      <div className="hero">
        {banners.map((banner, i) => (
          <img
            key={banner.id}
            src={banner.src}
            alt=""
            className="hero__slide"
            style={{
              objectPosition: banner.objectPosition,
              transform: `scale(${banner.scale})`,
              transformOrigin: banner.transformOrigin,
              opacity: i === bannerIndex ? 1 : 0,
            }}
          />
        ))}

        <p className="hero__sub">Residential and commercial sites. Covering Surrey &amp; West Sussex.</p>

        <div className="hero__progress">
          {banners.map((banner, i) => (
            <button
              key={banner.id}
              type="button"
              aria-label="Go to image"
              className="hero__progress-seg"
              onClick={() => setBannerIndex(i)}
              style={{ background: i === bannerIndex ? 'var(--color-bg)' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>

        <div className="hero__controls">
          <button
            type="button"
            className="btn btn-secondary btn-icon btn-icon--on-dark"
            aria-label="Previous image"
            onClick={prevBanner}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-icon btn-icon--on-dark"
            aria-label="Next image"
            onClick={nextBanner}
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
