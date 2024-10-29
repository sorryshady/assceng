import Wrapper from "@/components/custom/wrapper";

type Params = Promise<{ committee: string }>;

export default async function Committee({ params }: { params: Params }) {
  const { committee } = await params;
  return <Wrapper>{committee} Page</Wrapper>;
}
