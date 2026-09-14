import { getSanityClient } from "../src/sanity/lib/client";

async function main() {
  const client = getSanityClient();
  const all = await client.fetch<number>(`count(*[_type == "article"])`);
  const live = await client.fetch<
    Array<{ slug: string; editorialStatus?: string }>
  >(
    `*[_type == "article" && (editorialStatus == "published" || !defined(editorialStatus))]{
      "slug": slug.current,
      editorialStatus
    }`,
  );
  console.log(JSON.stringify({ all, live }, null, 2));
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
