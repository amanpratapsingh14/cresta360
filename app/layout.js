import "./globals.css";
import { Manrope, Playfair_Display } from "next/font/google";
import ImageZoomProvider from "./components/image-zoom-provider";

const PRIMARY_SITE_URL = "https://cresta360.in";
const SECONDARY_SITE_URL = "https://cresta360.com";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(PRIMARY_SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": PRIMARY_SITE_URL,
      en: SECONDARY_SITE_URL,
    },
  },
  title: "CRESTA 360",
  description:
    "Premium modular kitchens & home interiors. End-to-end design, manufacturing and installation with modern, luxury finishes.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "android-chrome", url: "/android-chrome-192x192.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <ImageZoomProvider>{children}</ImageZoomProvider>
      </body>
    </html>
  );
}
