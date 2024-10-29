import Hero from "@/components/custom/hero";
import NewsHome from "@/components/custom/news-home";
import EventsHome from "@/components/custom/upcoming-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-gray-50">
        <section className="w-full">
          <Hero />
        </section>
        <section className="container mx-auto py-12 px-4">
          <Card className="bg-white shadow-lg">
            <CardHeader className="space-y-4">
              <CardTitle className="text-4xl font-bold text-center text-primary">
                Welcome
              </CardTitle>
              <h2 className="text-2xl font-semibold text-center text-gray-700 px-4">
                WELCOME TO THE OFFICIAL WEBSITE OF THE ASSOCIATION OF ENGINEERS
              </h2>
              <Separator className="my-4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6 text-gray-600 leading-relaxed px-4">
                <p className="text-lg">
                  The Association of Engineers Kerala is a non-profit
                  politically neutral organization representing working as well
                  as retired engineers from the Public Works, Irrigation and
                  Local Self Government Departments of the Government of Kerala
                  formed in the year 1963.
                </p>

                <p className="text-lg">
                  United by a shared vision, this organization with more than
                  4500 members throughout the State aims to work towards the
                  welfare of engineers in these departments. The Association
                  actively engages in contributing to the development and
                  progress of the State of Kerala, as its members are working in
                  departments which are the major execution agencies of public
                  works of the State.
                </p>

                <p className="text-lg">
                  The retired Engineers will also continue to be the life
                  members of the Association attached to a district centre where
                  their residence is located or a district of their choice.
                  However they will not have voting rights unless elected as
                  State Executive Committee members.
                </p>

                <p className="text-lg">
                  A State Executive Committee with 46 members having a term of
                  one calendar year is the authority entrusted by the General
                  body to take a final decision on all matters related to the
                  Association. The Association has district centres in all the
                  14 districts of the State established as per the bye law.
                </p>

                <p className="text-lg">
                  The State Executive Committee meetings are conducted every
                  month in various districts as per a prefixed schedule. Three
                  volumes of newsletters publishing every calendar year act as
                  an effective mode of communication to its members about the
                  activities of the Association.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="container mx-auto pb-12 px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Featured Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/_NTcX7OY5tQ?si=xtmlv6HhF3ipoewI"
                title="YouTube video player 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/g1EfATl-Kts?si=3xv_FX_TZ3jQ-eKT"
                title="YouTube video player 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
        <EventsHome />
        <NewsHome />
      </div>
    </main>
  );
}
