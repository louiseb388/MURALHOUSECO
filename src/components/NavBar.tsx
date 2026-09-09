import { Link } from 'react-router-dom';
import { CONTACT_PHONE } from '../data/content';

type NavBarProps = {
  /** Present on Landing, where the CTA opens the wizard directly. Absent elsewhere,
   *  where the CTA links to Landing with ?quote=1 so the wizard auto-opens there. */
  onQuoteClick?: () => void;
};

export function NavBar({ onQuoteClick }: NavBarProps) {
  return (
    <nav className="nav">
      <div className="container nav__row">
        <Link to="/" className="logo wordmark">
          Mural House Co.
        </Link>
        <a href={`tel:${CONTACT_PHONE}`} className="nav__phone">
          {CONTACT_PHONE}
        </a>
        {onQuoteClick ? (
          <button type="button" className="btn btn-primary btn-cta" onClick={onQuoteClick}>
            Get started
          </button>
        ) : (
          <Link to="/?quote=1" className="btn btn-primary btn-cta">
            Get started
          </Link>
        )}
      </div>
    </nav>
  );
}
