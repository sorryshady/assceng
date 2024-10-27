type Params = Promise<{ committee: string }>;

export default async function Committee({ params }: { params: Params }) {
  const { committee } = await params;
  return <div>{committee} Page</div>;
}
