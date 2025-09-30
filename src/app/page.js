import styles from "./page.module.scss";
import { wpGraphQL, gql } from "@/lib/wp-graphql";
import FeaturedSection from "@/components/sections/FeaturedSection/FeaturedSection";

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
        <>
          <FeaturedSection uri="/" />
        </>
      )}
    </main>
  );
}
