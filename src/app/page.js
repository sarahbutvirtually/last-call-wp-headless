import styles from "./page.module.scss";
import { wpGraphQL, gql } from "@/lib/wp-graphql";

import HomeHeroSection from "@/components/sections/HomeHeroSection/HomeHeroSection";
import FeaturedSection from "@/components/sections/FeaturedSection/FeaturedSection";
import PricingSection from "@/components/sections/PricingSection/PricingSection";
import CarouselGallerySection from "@/components/sections/CarouselGallerySection/CarouselGallerySection";
import FAQSection from "@/components/sections/FAQSection/FAQSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  let data = null;
  let error = null;
  try {
    data = await wpGraphQL(
      gql`
        query HomeTitle($uri: String!) {
          pageBy(uri: $uri) {
            id
            title
          }
        }
      `,
      { uri: "/" }
    );
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const page = data?.pageBy ?? null;

  return (
    <main className={styles.main}>
      {error ? (
        <p style={{ color: "red" }}>GraphQL error: {error}</p>
      ) : !page ? (
        <p>
          Could not load the home Page. Ensure the site has a static front page
          and the URI is &quot;/&quot;.
        </p>
      ) : (
        <main>
          <HomeHeroSection uri="/" />
          <FeaturedSection uri="/" />
          <PricingSection uri="/" />
          <CarouselGallerySection uri="/" />
          <FAQSection uri="/" />
        </main>
      )}
    </main>
  );
}
