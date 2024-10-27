"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Home" },
  {
    href: "/committee",
    label: "Committee",
    subItems: [
      { href: "/state-committee", label: "State Committee" },
      { href: "/district-committee", label: "District Committee" },
    ],
  },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  {
    href: "/downloads",
    label: "Downloads",
    subItems: [
      { href: "/technical-writing", label: "Technical Writing" },
      { href: "/circulars-and-orders", label: "Circulars and Orders" },
      { href: "/election-nomination", label: "Election Nomination" },
      { href: "/is-code", label: "IS Code" },
      { href: "/irc-code", label: "IRC Code" },
      { href: "/handbooks", label: "Handbooks" },
      { href: "/others", label: "Others" },
    ],
  },
  { href: "/newsletter", label: "News Letter" },
  { href: "/login", label: "Login" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center p-5 bg-transparent">
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
    </nav>
  );
};

export default Navbar;
