import "server-only";

export async function wpGraphQL(query, variables = {}) {
  const endpoint = process.env.WP_GRAPHQL_URL;
  if (!endpoint) {
    throw new Error("WP_GRAPHQL_URL is not set. Add it to .env.local");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WPGraphQL network error ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (json?.errors?.length) {
    const first = json.errors[0];
    const msg = first?.message || "Unknown GraphQL error";
    throw new Error(`WPGraphQL error: ${msg}`);
  }

  return json?.data ?? null;
}

export const gql = String.raw;
