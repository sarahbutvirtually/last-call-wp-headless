import { wpGraphQL, gql } from "@/lib/wp-graphql";
import FAQSectionClient from "./FAQSectionClient";

export default async function FAQSection() {
  const faqQuery = await wpGraphQL(
  gql`
    # query AllFAQItems {
    #   faqs(first: 50) {
    #     nodes {
    #       question
    #       answer
    #     }
    #   }
    # }
  `
  );

  return <FAQSectionClient />;
}
