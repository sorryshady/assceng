import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { simpleNewsCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

async function getData() {
  const query = `*[_type == "news"]| order(date desc) [0..2] {
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
    <section className="container max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-center mb-10 text-primary font-bold text-4xl">
        Latest News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {data.map((post) => (
          <Card key={post.currentSlug} className="overflow-hidden">
            <div className="relative">
              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 text-sm font-semibold rounded">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
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
      <Button asChild className="w-full mt-5 font-semibold">
        <Link href="/news">View All</Link>
      </Button>
    </section>
  );
}
