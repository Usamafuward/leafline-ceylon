import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#103c2e",
};

export const metadata: Metadata = {
  title: "Lanka Memo Holidays | Luxury Tour Operator in Sri Lanka | Bespoke Private Journeys",
  description: "Experience handcrafted private luxury itineraries in Sri Lanka. Explore ancient UNESCO citadels, colonial tea estates, wild leopards in Yala, and secluded tropical coasts accompanied by certified senior naturalists.",
  keywords: "Sri Lanka tour operator, luxury travel Sri Lanka, private tour Sri Lanka, bespoke Ceylon itineraries, Sigiriya private tour, Yala safari private guide, Sri Lanka honeymoon",
  authors: [{ name: "Lanka Memo Holidays Ceylon" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Lanka Memo Holidays | Curated Sri Lankan Journeys",
    description: "Journeys beyond the ordinary. Private chauffeured circuits, Relais & Châteaux stays, and certified wildlife naturalists across Sri Lanka.",
    url: "https://lankamemoholidays.com",
    siteName: "Lanka Memo Holidays Ceylon",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrollProvider />
        <SmoothCursor />
        <ScrollToTop />
        <ScrollAnimationProvider />
        <Header />
        <main className="flex-1 min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
