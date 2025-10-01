import { wpGraphQL, gql } from "@/lib/wp-graphql";
import HowItWorksSectionClient from "./HowItWorksSectionClient";

export default async function HowItWorksSection() {
  const howItWorksData = await wpGraphQL(
  gql`
    query AllHowItWorksItems {
      ourprocesssteps(first: 50) {
        nodes{
          ourProcessStepFields {
            stepNumber
            stepTitle
            stepDescription
          }
        }
      }
    }
  `
  );

  const howItWorks = howItWorksData?.ourprocesssteps?.nodes?.map((n) => n?.ourProcessStepFields).filter(Boolean) || [];

  if (howItWorks.length === 0) return null;

  return <HowItWorksSectionClient section={howItWorks} />;
}
