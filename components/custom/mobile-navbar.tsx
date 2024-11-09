"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/navbar-data";
import { useAuth } from "@clerk/nextjs"; // Clerk's useAuth hook for auth status
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const MobileNavbar = () => {
  const { isSignedIn } = useAuth();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleLinkClick = () => {
    setIsOpen(false); // Close the sheet
  };

  return (
    <nav className="w-full border shadow-md fixed top-0 left-0 right-0 z-[20] bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5 bg-transparent lg:hidden">
        <Link href="/">
          <Image src="/assceng_logo.png" alt="logo" width={250} height={250} />
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] pt-10 bg-white text-black overflow-auto"
          >
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col gap-4 mt-6">
              {menuItems.map((item) =>
                item.label === "Account" ? (
                  isSignedIn ? (
                    <li key="user" className="py-2">
                      <Link href="/account" onClick={handleLinkClick}>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                    </li>
                  ) : (
                    <Accordion
                      key={item.label}
                      type="single"
                      collapsible
                      className="w-full"
                    >
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="hover:no-underline py-2 text-base font-medium data-[state=open]:text-primary">
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-4 pl-4 pt-2">
                            {item.subItems?.map((subItm) => (
                              <li key={subItm.label}>
                                <Link
                                  href={subItm.href}
                                  onClick={handleLinkClick}
                                  className="text-base"
                                >
                                  {subItm.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )
                ) : item.subItems ? (
                  <Accordion
                    key={item.label}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="item-2" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2 text-base font-medium data-[state=open]:text-primary">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col gap-4 pl-4 pt-2">
                          {item.subItems.map((subItm) => (
                            <li key={subItm.label}>
                              <Link
                                href={subItm.href}
                                onClick={handleLinkClick}
                                className={cn(
                                  "text-base",
                                  pathName === subItm.href
                                    ? "text-primary"
                                    : "",
                                )}
                              >
                                {subItm.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <li key={item.label} className="py-2">
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "text-base font-medium",
                        pathName === item.href ? "text-primary" : "",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNavbar;

const LoggedInUser = () => {
  return <div>Logged In</div>;
};
