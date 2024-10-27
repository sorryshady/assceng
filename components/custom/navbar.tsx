"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/navbar-data";

const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);
  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto hidden justify-between items-center p-5 bg-transparent lg:flex">
        <Link href="/">
          <Image src="/assceng_logo.png" alt="logo" width={300} height={300} />
        </Link>
        <Menu setActive={setActive}>
          {menuItems.map((item) =>
            item.subItems ? (
              <MenuItem
                key={item.label}
                setActive={setActive}
                active={active}
                item={item.label}
              >
                <div className="flex flex-col space-y-4 text-sm">
                  {item.subItems.map((subItm) => (
                    <HoveredLink
                      className="hover:text-primary"
                      key={subItm.label}
                      href={subItm.href}
                    >
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
