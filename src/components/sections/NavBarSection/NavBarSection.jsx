import { wpGraphQL, gql } from "@/lib/wp-graphql";
import NavBarSectionClient from "./NavBarSectionClient";

export default async function NavBarSection({ uri = "/" }) {
  const data = await wpGraphQL(
    gql`
      fragment Media on MediaItem {
        sourceUrl
        altText
        mediaDetails { width height }
      }

      query NavBarSection($uri: String!) {
        pageBy(uri: $uri) {
          navbarSection {
            logo { node { ...Media } }
            buttonLink
            buttonLabel
            openInNewTab
          }
        }
      }
    `,
    { uri }
  );

  const section = data?.pageBy?.navbarSection;

  if (!section) return null;

  const navBar = {
    logo: section.logo,
    link: section.buttonLink,
    buttonLabel: section.buttonLabel,
    openInNewTab: section.openInNewTab,
  };

  return <NavBarSectionClient navBar={navBar} />;
}
