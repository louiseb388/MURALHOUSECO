import type { CSSProperties } from 'react';
import { ChevronDownIcon } from './Icons';

type IntroMaskProps = {
  /** 0 = fully down (covering the hero), 1 = fully lifted off-screen. Driven
   *  1:1 by scroll position — this is a direct transform, not a timed
   *  animation, so it moves exactly as far and as fast as the user scrolls. */
  progress: number;
  imageSrc: string;
};

/**
 * Hero intro mask: "MURAL / HOUSE / CO." set huge, dead center, in the
 * wordmark face, background-clipped to a single hero photo so it shows
 * through the letters only. All three lines live in one element (line
 * breaks, not three separate ones) so the background is sized and
 * positioned exactly once — it reads as one continuous photo behind the
 * whole stack. (An earlier version gave each line its own background and
 * relied on background-attachment: fixed to fake this via the viewport,
 * but plenty of browsers — mobile Safari included — silently ignore fixed
 * attachment, so each line fell back to independently cover-cropping the
 * same photo and looked like three repeats of the same crop.)
 */
export function IntroMask({ progress, imageSrc }: IntroMaskProps) {
  const maskStyle: CSSProperties = { backgroundImage: `url(${imageSrc})` };

  return (
    <>
      {/* The hint below is `position: fixed` and needs to resolve against the
          true viewport, not this box — so it's a sibling, not a child: an
          inline `transform` (even at 0%) makes an element the containing
          block for fixed descendants, which would pin the hint to this
          moving box instead. */}
      <div
        className="intro-mask-overlay"
        style={{ transform: `translateY(${-progress * 100}%)` }}
        aria-hidden="true"
      >
        <div className="intro-mask">
          <div className="intro-mask__text wordmark" style={maskStyle}>
            Mural
            <br />
            House
            <br />
            Co.
          </div>
        </div>
      </div>
      <div className="intro-mask__hint" style={{ opacity: 1 - progress }} aria-hidden="true">
        <span>Scroll</span>
        <ChevronDownIcon />
      </div>
    </>
  );
}
