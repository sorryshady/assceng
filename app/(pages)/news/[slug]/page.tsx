import Wrapper from "@/components/custom/wrapper";
import { simpleNewsCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { CalendarIcon } from "lucide-react";
import { PortableText } from "next-sanity";
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
  console.log(data);
  return data;
}
export default async function NewsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data: simpleNewsCard = await getData(slug);
  return (
    <Wrapper>
      <Card className="max-w-4xl mx-auto my-8">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center mb-4">{data.title}</h1>
          <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <time dateTime={data.date}>
              {new Date(data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </CardHeader>
        <CardContent>
          {data.image ? (
            <div className="relative w-full h-64 md:h-96 mb-6">
              <Image
                src={urlFor(data.image).url()}
                alt={data.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ) : (
            <div className="relative w-full h-64 md:h-96 mb-6">
              <Image
                src="/news-placeholder.webp"
                alt={data.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <h2 className="text-xl font-semibold text-center mb-4">
            {data.description}
          </h2>
          <PortableText value={data.content} />
          <Separator className="my-6" />
        </CardContent>
      </Card>
    </Wrapper>
  );
}
