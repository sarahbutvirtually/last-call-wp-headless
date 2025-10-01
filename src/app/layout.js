import "./globals.scss";

import NavBarSection from "@/components/sections/NavBarSection/NavBarSection";
import Footer from "@/components/sections/FooterSection/FooterSection";

export const metadata = {
  title: "Last Call – WP Headless",
  description: "Headless portfolio scaffold built with Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
