import { wpGraphQL, gql } from "@/lib/wp-graphql";
import FeaturedSectionClient from "./FeaturedSectionClient";

export default async function FeaturedSection({ uri = "/" }) {
  const data = await wpGraphQL(
    gql`
      fragment Media on MediaItem {
        sourceUrl
        altText
        mediaDetails { width height }
      }

      query FeaturedSection($uri: String!) {
        pageBy(uri: $uri) {
          ourFeaturesSection {
            featuredImage { node { ...Media } }
            featureOne {
              heading
              bodyCopy
              icon { node { ...Media } }
            }
            featureTwo {
              heading
              bodyCopy
              icon { node { ...Media } }
            }
            featureThree {
              heading
              bodyCopy
              icon { node { ...Media } }
            }
          }
        }
      }
    `,
    { uri }
  );

  const section = data?.pageBy?.ourFeaturesSection;

  if (!section) return null;

  const features = [section.featureOne, section.featureTwo, section.featureThree]
    .filter(Boolean)
    .map((f) => ({
      ...f,
      bodyCopy: f.bodyCopy || "",
    }));

  return <FeaturedSectionClient featuredImage={section.featuredImage} features={features} />;
}
