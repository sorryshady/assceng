import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { simpleNewsCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

async function getData() {
  const query = `*[_type == "upcomingEvent"]| order(_createdAt desc) [0..2] {
    title,
    image,
    description,
    date,
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function EventsHome() {
  const data: simpleNewsCard[] = await getData();
  return (
    <div className="max-h-screen bg-gray-50">
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-center mb-10 text-primary font-bold text-4xl">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-3  gap-6">
          {data.map((post) => (
            <Card key={post.title} className="overflow-hidden">
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
                <Link
                  href={`/upcoming-events/`}
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
