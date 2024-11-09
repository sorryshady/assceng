"use client";
import Link from "next/link";
import Image from "next/image";
import { HoveredLink } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MenuItem, menuItems } from "@/lib/navbar-data";
import { SignedIn, useAuth, UserButton } from "@clerk/nextjs"; // Import Clerk's useAuth hook
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SignOut from "./sign-out";
import NavAnimation from "./nav-animation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card } from "../ui/card";
import { verifyClerkUser } from "@/actions/verify-clerk-user";

const Navbar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  return (
    <NavAnimation>
      <nav className="w-full border shadow-md z-[20] bg-white">
        <div className="max-w-7xl mx-auto hidden justify-between items-center p-5 lg:flex">
          <Link href="/">
            <Image
              src="/assceng_logo.png"
              alt="logo"
              width={300}
              height={300}
            />
          </Link>
          <div className="flex justify-evenly gap-5">
            {menuItems.map((item) => {
              return (
                <div key={item.label}>
                  {item.subItems ? (
                    <SubItems
                      subItem={item}
                      currentPath={pathname}
                      userId={userId}
                    />
                  ) : (
                    <HoveredLink href={item.href}>{item.label}</HoveredLink>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      {/* <nav className="w-full border shadow-md fixed top-0 left-0 right-0 z-[20] bg-white">
        <div className="max-w-7xl mx-auto hidden justify-between items-center p-5 lg:flex">
          <Link href="/">
            <Image
              src="/assceng_logo.png"
              alt="logo"
              width={300}
              height={300}
            />
          </Link>
          <Menu setActive={setActive}>
            {menuItems.map((item) =>
              item.label === "Account" ? (
                isSignedIn ? (
                  <SignOut key={"user"} />
                ) : (
                  <MenuItem
                    key={item.label}
                    setActive={setActive}
                    active={active}
                    item={item.label}
                  >
                    <div className="flex flex-col space-y-4 text-sm">
                      {item.subItems?.map((subItm) => (
                        <HoveredLink key={subItm.label} href={subItm.href}>
                          {subItm.label}
                        </HoveredLink>
                      ))}
                    </div>
                  </MenuItem>
                )
              ) : item.subItems ? (
                <MenuItem
                  key={item.label}
                  setActive={setActive}
                  active={active}
                  item={item.label}
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    {item.subItems.map((subItm) => (
                      <HoveredLink key={subItm.label} href={subItm.href}>
                        {subItm.label}
                      </HoveredLink>
                    ))}
                  </div>
                </MenuItem>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-primary",
                    pathname === item.href && "text-primary",
                  )}
                  key={item.label}
                >
                  {item.label}
                </Link>
              ),
            )}
          </Menu>
        </div>
      </nav> */}
    </NavAnimation>
  );
};

export default Navbar;

interface SubItemProps {
  subItem: MenuItem;
  currentPath: string;
  userId: string | null | undefined;
}
const SubItems = ({ subItem, currentPath, userId }: SubItemProps) => {
  const [hover, setHover] = useState(false);
  const [user, setUser] = useState({
    name: "",
    admin: false,
  });
  const fetchUser = async () => {
    const user = await verifyClerkUser(userId);
    setUser({
      name: user.name,
      admin: user.userRole === "ADMIN",
    });
  };
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, []);
  return (
    <div
      className="hover:text-primary cursor-pointer relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-1">
        <span>{user.name || subItem.label}</span>
        <span>
          <ChevronDown size={12} />
        </span>
      </div>
      {hover && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="h-2 w-full" />
          <Card className="bg-white p-4 flex flex-col gap-4">
            {/* Check if the label is 'Account' and render AccountLinks component */}
            {subItem.label === "Account" ? (
              <AccountLinks /> // Assuming AccountLinks takes a user prop
            ) : (
              // Otherwise, render the default list of subitems
              subItem.subItems?.map((subItm) => (
                <Link
                  href={subItm.href}
                  key={subItm.label}
                  className={cn(
                    "text-nowrap hover:text-primary text-[15px]",
                    currentPath === subItm.href && "text-primary",
                  )}
                >
                  {subItm.label}
                </Link>
              ))
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

const AccountLinks = () => {
  return <div className="text-nowrap">Account Links</div>;
};
