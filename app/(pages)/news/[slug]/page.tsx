import Wrapper from "@/components/custom/wrapper";
import { simpleNewsCard } from "@/lib/interface";
import { client } from "@/lib/sanity";
type Params = Promise<{ slug: string }>;

async function getData(slug: string) {
  const query = `*[_type == "news" && slug.current == "${slug}"] {
  title,
  image,
  description,
  content,
  date,
  "currentSlug": slug.current
}[0]
`;
  const data = await client.fetch(query);
  return data;
}
export default async function NewsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data: simpleNewsCard = await getData(slug);
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">News Details</h1>
      <div>{data.title}</div>
    </Wrapper>
  );
}
