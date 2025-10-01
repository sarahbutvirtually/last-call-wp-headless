import { wpGraphQL, gql } from "@/lib/wp-graphql";
import HomeHeroSectionClient from "./HomeHeroSectionClient";

export default async function HomeHeroSection({ uri = "/" }) {
  const homeHeroQuery = await wpGraphQL(
  gql`
    fragment Media on MediaItem {
      sourceUrl
      altText
      mediaDetails { width height }
    }

    # page content
    query HomeHeroContent($uri: String!) {
      pageBy(uri: $uri) {
        homeHeroSection {
          icon { node { ...Media } }
          subhead
          heading
          bodyCopy
          buttonLabelA
          buttonALink
          buttonLabelB
          buttonBLink
          openButtonAInNewTab
          openButtonBInNewTab
        }
    }
      homeHeroImages(first: 50) {
        nodes {
          homeHeroImageFields {
            image { node { ...Media } }
          }
        }
      }
    }
  `,
  { uri });

  const content = homeHeroQuery?.pageBy?.homeHeroSection;
  const images = (homeHeroQuery?.homeHeroImages?.nodes || [])
    .map((n) => n?.homeHeroImageFields?.image?.node)
    .filter(Boolean);
  
    if (!content) return null;

  return <HomeHeroSectionClient section={content} images={images} />;
}
