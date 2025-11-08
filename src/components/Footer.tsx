'use client';

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-columns">
        <div>
          <h3>GeoTapp</h3>
          <p>
            Timbrature e presenze gestite dal browser. Questa è una base essenziale per
            riprogettare il nuovo sito marketing.
          </p>
        </div>
        <div>
          <h4>Link rapidi</h4>
          <ul>
            <li>
              <Link href="#features">Funzionalità</Link>
            </li>
            <li>
              <Link href="#pricing">Prezzi</Link>
            </li>
            <li>
              <Link href="#contact">Contatti</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contatti</h4>
          <ul>
            <li>
              <a href="mailto:info@geotapp.com">info@geotapp.com</a>
            </li>
            
          </ul>
        </div>
      </div>
      <p className="footer-note">© {year} GeoTapp. Tutti i diritti riservati.</p>
    </footer>
  );
}
