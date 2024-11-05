import { Image, PortableTextBlock } from "@sanity/types";

export interface simpleNewsCard {
  title: string;
  description: string;
  currentSlug: string;
  content: PortableTextBlock[];
  image: Image;
  date: string;
}
export interface downloadsList {
    title: string;
    fileUrl: string;
}
export interface upcomingEvent {
  title: string;
  description: string;
  image: Image;
  date: string;
}
