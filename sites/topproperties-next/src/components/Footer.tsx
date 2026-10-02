import { Link } from "react-router-dom";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="collection-footer">
      <Container>
        <div className="footer-top">
          <div>
            <Link to="/" className="font-serif text-2xl">
              TOP <span className="text-burgundy">PROPERTIES</span>
            </Link>
            <p>Extraordinary homes. A world of possibilities.</p>
          </div>
          <nav aria-label="Footer">
            <Link to="/listings?mode=sale">Homes to buy</Link>
            <Link to="/listings?mode=long-rent">Homes to rent</Link>
            <Link to="/listings">The collection</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TopProperties</span>
          <span>Property discovery demo · Illustrative homes, prices and photography</span>
          <span>Saved homes stay on this device.</span>
        </div>
      </Container>
    </footer>
  );
}
