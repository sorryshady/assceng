"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/navbar-data";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <nav className="w-full border shadow-md fixed top-0 left-0 right-0 z-[20] bg-white">
      <div className="max-w-7xl mx-auto hidden justify-between items-center p-5 lg:flex">
        <Link href="/">
          <Image src="/assceng_logo.png" alt="logo" width={300} height={300} />
        </Link>
        <Menu setActive={setActive}>
          {menuItems.map((item) =>
            item.label === "Account" ? (
              isSignedIn ? (
                <Link key="user" href={"/account"}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
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
    </nav>
  );
};

export default Navbar;
