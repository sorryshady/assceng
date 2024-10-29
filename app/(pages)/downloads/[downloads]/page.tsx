import Wrapper from "@/components/custom/wrapper";

type Params = Promise<{ downloads: string }>;

export default async function Downloads({ params }: { params: Params }) {
  const { downloads } = await params;
  return <Wrapper>{downloads} Page</Wrapper>;
}
