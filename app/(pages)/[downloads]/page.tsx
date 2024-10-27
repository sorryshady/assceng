type Params = Promise<{ downloads: string }>;

export default async function Downloads({ params }: { params: Params }) {
  const { downloads } = await params;
  return <div>{downloads} Page</div>;
}
