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
            pageLink {
              nodes {
                __typename
                ... on Page {
                  id
                  databaseId
                  title
                  uri
                }
                ... on Post {
                  id
                  databaseId
                  title
                  uri
                }
              }
            }
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
    pageLink: section.pageLink?.nodes ?? [],
    buttonLabel: section.buttonLabel,
    openInNewTab: section.openInNewTab,
  };

  return <NavBarSectionClient navBar={navBar} />;
}
