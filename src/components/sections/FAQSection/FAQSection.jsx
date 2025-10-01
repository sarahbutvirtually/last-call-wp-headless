import { wpGraphQL, gql } from "@/lib/wp-graphql";
import FAQSectionClient from "./FAQSectionClient";

export default async function FAQSection() {
  const faqData = await wpGraphQL(
  gql`
    query AllFAQItems {
      faqs {
        nodes{
          faqFields {
            question
            answer
            backgroundColor
            textColor
          }
        }
      }
    }
  `
  );

  const faqs = faqData?.faqs?.nodes?.map((n) => n?.faqFields).filter(Boolean) || [];

  if (faqs.length === 0) return null;

  return <FAQSectionClient faqs={faqs} />;
}
