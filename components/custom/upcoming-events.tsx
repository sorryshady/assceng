import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { simpleNewsCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

function isEventOver(eventDate: string): boolean {
  const currentDate = new Date();
  const eventDateTime = new Date(eventDate);
  return eventDateTime < currentDate;
}

async function getData() {
  const query = `*[_type == "upcomingEvent"]| order(date desc) [0..2] {
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
    <div className="bg-gray-50">
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-center mb-10 text-primary font-bold text-4xl">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post) => {
            const eventOver = isEventOver(post.date);
            return (
              <Card
                key={post.title}
                className={`overflow-hidden ${eventOver ? "opacity-70" : ""}`}
              >
                <div className="relative">
                  <div
                    className={`absolute top-4 left-4 ${eventOver ? "bg-gray-500" : "bg-yellow-500"} text-white px-2 py-1 text-sm font-semibold rounded`}
                  >
                    {eventOver
                      ? "Past Event"
                      : new Date(post.date).toLocaleDateString("en-IN", {
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
                  <h2
                    className={`text-2xl font-bold mb-2 line-clamp-2 ${eventOver ? "text-gray-500" : ""}`}
                  >
                    {post.title}
                  </h2>
                  <p
                    className={`text-muted-foreground mb-4 line-clamp-3 ${eventOver ? "text-gray-400" : ""}`}
                  >
                    {post.description}
                  </p>
                  {!eventOver && (
                    <Link
                      href={`/upcoming-events/`}
                      className="text-primary font-semibold hover:underline inline-flex items-center"
                    >
                      READ MORE
                      <ChevronRight size={20} />
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        {data.some((post) => !isEventOver(post.date)) && (
          <Button asChild className="w-full mt-5 font-semibold">
            <Link href="/upcoming-events">View All</Link>
          </Button>
        )}
      </section>
    </div>
  );
}
