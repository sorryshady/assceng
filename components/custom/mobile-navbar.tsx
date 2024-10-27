"use client";

import * as React from "react";
import { menuItems } from "@/lib/navbar-data";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathName = usePathname();
  const handleLinkClick = () => {
    setIsOpen(false); // Close the sheet
  };

  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center p-5 bg-transparent lg:hidden">
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
          className="w-[300px] sm:w-[400px] pt-10 bg-white text-black"
        >
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <ul className="flex flex-col gap-4 mt-6">
            {menuItems.map((item) =>
              item.subItems ? (
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
                        {item.subItems.map((subItm) => (
                          <li key={subItm.label}>
                            <Link
                              href={subItm.href}
                              onClick={handleLinkClick}
                              className={cn(
                                "text-base",
                                pathName === subItm.href ? "text-primary" : "",
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
                    className={`text-base font-medium ${
                      pathName === item.href ? "text-primary" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavbar;
