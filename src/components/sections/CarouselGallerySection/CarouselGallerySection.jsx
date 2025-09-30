import { wpGraphQL, gql } from "@/lib/wp-graphql";
import CarouselGallerySectionClient from "./CarouselGallerySectionClient";

export default async function CarouselGallerySection() {
  const cptQuery = gql`
    fragment Media on MediaItem {
      sourceUrl
      altText
      mediaDetails { width height }
    }

    query AllCarouselImages {
      carouselImages(first: 50) {
        nodes {
          carouselImageFields {
            image { node { ...Media } }
          }
        }
      }
    }
  `;

  let images = [];
  let cptData;

  try {
    cptData = await wpGraphQL(cptQuery);
    images = (cptData?.carouselImages?.nodes || [])
      .map((n) => n?.carouselImageFields?.image?.node)
      .filter(Boolean);
  } catch (err) {
    console.error("Failed to load carousel images:", err);
    images = [];
  }

  return <CarouselGallerySectionClient imgArray={images} />;
}
