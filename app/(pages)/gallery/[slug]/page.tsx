import Wrapper from "@/components/custom/wrapper";
import { GalleryData } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

async function getData(slug: string) {
  const query = `*[_type == "gallery" && slug.current == "${slug}"] {
    title,
    images,
    "currentSlug": slug.current
  }[0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function GalleryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data: GalleryData = await getData(slug);

  return (
    <Wrapper>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{data.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.images &&
            data.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={urlFor(image).url()}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 6}
                />
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  );
}
