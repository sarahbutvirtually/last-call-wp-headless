import "./globals.scss";

import NavBarSection from "@/components/sections/NavBarSection/NavBarSection";

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
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
