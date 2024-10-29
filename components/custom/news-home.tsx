import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { simpleNewsCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

async function getData() {
  const query = `*[_type == "news"]| order(_createdAt desc) [0..2] { 
    title,
    image,
    description,
    content,
    date,
    "currentSlug": slug.current 
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function NewsHome() {
  const data: simpleNewsCard[] = await getData();
  return (
    <div className="max-h-svh bg-gray-50 pb-12">
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-center mb-10 text-primary font-bold text-4xl">
          Latest News
        </h1>
        <div className="grid grid-cols-3  gap-6">
          {data.map((post) => (
            <Card key={post.currentSlug} className="overflow-hidden">
              <div className="relative">
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 text-sm font-semibold rounded">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                {post.image ? (
                  <Image
                    src={urlFor(post.image).url()}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <Image
                    src="/news-placeholder.webp"
                    alt="Placeholder"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                )}
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="text-muted-foreground mb-4 line-clamp-3">
                  <PortableText value={post.content} />
                </div>
                <Link
                  href={`/news/${post.currentSlug}`}
                  className="text-primary font-semibold hover:underline inline-flex items-center"
                >
                  READ MORE
                  <ChevronRight size={20} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
