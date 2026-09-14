import { getWriteClient } from "../src/sanity/lib/client";

async function main() {
  const client = getWriteClient();
  const articles = await client.fetch(`*[_type == "article"] | order(_updatedAt desc) {
    _id,
    title,
    "slug": slug.current,
    editorialStatus,
    publishedAt
  }`);

  const liveQuery = await client.fetch(`*[
    _type == "article" &&
    defined(slug.current) &&
    (editorialStatus == "published" || !defined(editorialStatus)) &&
    publishedAt <= now()
  ]{
    _id,
    title,
    "slug": slug.current,
    editorialStatus,
    publishedAt
  }`);

  console.log(JSON.stringify({ all: articles, liveQuery }, null, 2));
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
