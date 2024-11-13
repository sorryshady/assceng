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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MenuItem, menuItems } from "@/lib/navbar-data";
import { useAuth } from "@clerk/nextjs"; // Clerk's useAuth hook for auth status
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { verifyClerkUser } from "@/actions/verify-clerk-user";
import SignOut from "./sign-out";

const MobileNavbar = () => {
  const { userId, isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; admin: boolean }>({
    name: "",
    admin: false,
  });

  const fetchUser = async () => {
    if (userId) {
      const user = await verifyClerkUser(userId);
      setUser({
        name: user.name || "",
        admin: user.userRole === "ADMIN",
      });
    }
  };
  useEffect(() => {
    if (isSignedIn && userId) {
      fetchUser();
    } else {
      setUser({ name: "", admin: false });
    }
  }, [isSignedIn, userId]);

  const handleLinkClick = () => {
    setIsOpen(false);
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
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.subItems ? (
                    <SubItem
                      subItem={item}
                      currentPath={pathname}
                      userName={user.name}
                      adminStatus={user.admin}
                      handleLinkClick={handleLinkClick}
                    />
                  ) : (
                    <li key={item.label} className="py-2">
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "text-base font-medium",
                          pathname === item.href ? "text-primary" : "",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )}
                </div>
              ))}
              {/* {menuItems.map((item) =>
                item.label === "Account" ? (
                  isSignedIn && <div>Signed In</div>
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
              )} */}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNavbar;

interface SubItemProps {
  subItem: MenuItem;
  currentPath: string;
  userName: string;
  adminStatus: boolean;
  handleLinkClick: () => void;
}
const SubItem = ({
  subItem,
  currentPath,
  userName,
  adminStatus,
  handleLinkClick,
}: SubItemProps) => {
  return (
    <Accordion key={subItem.label} type="single" collapsible className="w-full">
      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger className="hover:no-underline py-2 text-base font-medium data-[state=open]:text-primary">
          {(subItem.label === "Account" && userName) || subItem.label}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-4 pl-4 pt-2">
            {subItem.label === "Account" ? (
              <AccountLinks
                userName={userName}
                adminStatus={adminStatus}
                currentPath={currentPath}
                handleLinkClicks={handleLinkClick}
              />
            ) : (
              subItem.subItems?.map((subItm) => (
                <li key={subItm.label}>
                  <Link
                    href={subItm.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-base",
                      currentPath === subItm.href ? "text-primary" : "",
                    )}
                  >
                    {subItm.label}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

interface AccountLinksProps {
  userName: string;
  adminStatus: boolean;
  currentPath: string;
  handleLinkClicks: () => void;
}

const AccountLinks = ({
  userName,
  adminStatus,
  currentPath,
  handleLinkClicks,
}: AccountLinksProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!userName);
  }, [userName]);

  return (
    <>
      {!isLoggedIn ? (
        <>
          <li>
            <Link
              className={cn(
                "text-nowrap hover:text-primary text-base",
                currentPath === "/login" && "text-primary ",
              )}
              onClick={handleLinkClicks}
              href={"/login"}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "text-nowrap hover:text-primary text-base",
                currentPath === "/register" && "text-primary ",
              )}
              onClick={handleLinkClicks}
              href={"/register"}
            >
              Register
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              className={cn(
                "text-nowrap hover:text-primary text-base ",
                currentPath === "/account" && "text-primary ",
              )}
              onClick={handleLinkClicks}
              href={"/account"}
            >
              My Account
            </Link>
          </li>
          <li>
            {adminStatus && (
              <Link
                className={cn(
                  "text-nowrap hover:text-primary text-base",
                  currentPath === "/admin" && "text-primary ",
                )}
                onClick={handleLinkClicks}
                href={"/admin"}
              >
                Admin Panel
              </Link>
            )}
          </li>
        </>
      )}
      {isLoggedIn && <SignOut handleClick={handleLinkClicks}/>}
    </>
  );
};
