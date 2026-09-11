import { Link } from 'react-router-dom';

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
        <Link to="/wall-murals-surrey-west-sussex" className="nav__link">
          Locations
        </Link>
        <Link to="/contact" className="nav__link" style={{ marginLeft: 0 }}>
          Contact us
        </Link>
        {onQuoteClick ? (
          <button type="button" className="btn btn-primary btn-cta" onClick={onQuoteClick}>
            Quote me
          </button>
        ) : (
          <Link to="/?quote=1" className="btn btn-primary btn-cta">
            Quote me
          </Link>
        )}
      </div>
    </nav>
  );
}
