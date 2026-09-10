import { Link } from 'react-router-dom';

type FooterProps = {
  /** Landing's footer follows the colored CTA band directly, so it omits the top divider. */
  noTopDivider?: boolean;
};

export function Footer({ noTopDivider }: FooterProps) {
  return (
    <div className="container">
      <footer className={noTopDivider ? 'footer' : 'footer footer--divided'}>
        <span>© 2026 Mural House · Covering Surrey &amp; West Sussex</span>
        <div className="footer__links">
          <Link to="/process">Process</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/residential-murals">Residential Murals</Link>
          <Link to="/commercial-wall-murals">Commercial Murals</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
