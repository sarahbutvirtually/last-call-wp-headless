import "./globals.scss";
import { David_Libre, Spline_Sans } from "next/font/google";

import NavBarSection from "@/components/sections/NavBarSection/NavBarSection";
import Footer from "@/components/sections/FooterSection/FooterSection";

export const metadata = {
  title: "Last Call – WP Headless",
  description: "Headless portfolio scaffold built with Next.js App Router",
};

// Google Fonts
const davidLibre = David_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-david-libre",
  display: "swap",
});

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spline-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${davidLibre.variable} ${splineSans.variable}`}>
      <body>
        <header>
          <NavBarSection uri="/" />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
