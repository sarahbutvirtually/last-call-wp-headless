import { wpGraphQL, gql } from "@/lib/wp-graphql";
import PricingSectionClient from "./PricingSectionClient";

export default async function PricingSection() {
  const pricingData = await wpGraphQL(
  gql`
    query AllPricingCards {
      pricingCards(first: 50) {
        nodes {
          pricingCardFields {
            subhead
            pricePerHour
            mostPopular
            deliverables {
              edges {
                node {
                  __typename
                  ... on PricingCardDeliverable {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const section = pricingData?.pricingCards?.nodes;

  if (!section) return null;

  return <PricingSectionClient pricingCards={section} />;
}
