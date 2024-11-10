import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import MobileNavbar from "@/components/custom/mobile-navbar";
import { Toaster } from "sonner";
import Footer from "@/components/custom/footer";
import SmoothScrolling from "@/components/custom/smooth-scrolling";
import ScrollToTop from "@/components/custom/scroll-to-top";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Association of Engineers, Kerala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider dynamic={true}>
        <SmoothScrolling />
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
          >
            <Navbar />
            <MobileNavbar />
            {children}
            <Toaster />
            <Footer />
            <ScrollToTop />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
