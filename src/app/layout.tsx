import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace("/api", "") || "https://geotapp.com";

export const metadata: Metadata = {
  title: "GeoTapp",
  description:
    "Soluzione semplice per gestire timbrature e presenze dal browser. Ripartiamo da una base pulita per costruire il nuovo sito GeoTapp.",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="page-wrapper">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
