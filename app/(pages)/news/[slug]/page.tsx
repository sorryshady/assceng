import Wrapper from "@/components/custom/wrapper";
type Params = Promise<{ slug: string }>;
export default async function NewsPage({ params }: { params: Params }) {
  const { slug } = await params;
  return <Wrapper>{slug} Page</Wrapper>;
}
