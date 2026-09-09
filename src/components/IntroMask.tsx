import type { CSSProperties } from 'react';

type IntroMaskProps = {
  lifted: boolean;
  imageSrc: string;
};

/**
 * Full-viewport, one-time hero intro: "MURAL / HOUSE / CO." set huge, dead
 * center, in the wordmark face, each line background-clipped to the hero's
 * first banner photo so the truck shows through the letters only. All three
 * lines share the same fixed-attachment, viewport-sized background so the
 * image reads as one continuous photo behind the stack, not three separate
 * crops. `lifted` slides the whole thing off the top of the screen.
 */
export function IntroMask({ lifted, imageSrc }: IntroMaskProps) {
  const maskStyle: CSSProperties = { backgroundImage: `url(${imageSrc})` };

  return (
    <div className={`intro-mask-overlay${lifted ? ' intro-mask-overlay--lifted' : ''}`} aria-hidden="true">
      <div className="intro-mask">
        <span className="intro-mask__line wordmark" style={maskStyle}>
          Mural
        </span>
        <span className="intro-mask__line wordmark" style={maskStyle}>
          House
        </span>
        <span className="intro-mask__line wordmark" style={maskStyle}>
          Co.
        </span>
      </div>
    </div>
  );
}
