"use client";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HoveredLink } from "../ui/navbar-menu";
import { MenuItem, menuItems } from "@/lib/navbar-data";
import SignOut from "./sign-out";
import { ChevronDown } from "lucide-react";
import { Card } from "../ui/card";
import NavAnimation from "./nav-animation";
import { verifyClerkUser } from "@/actions/verify-clerk-user";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const { userId, isSignedIn } = useAuth();
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
                      userName={user.name}
                      adminStatus={user.admin}
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
    </NavAnimation>
  );
};

export default Navbar;

interface SubItemProps {
  subItem: MenuItem;
  currentPath: string;
  userName: string;
  adminStatus: boolean;
}

const SubItems = ({
  subItem,
  currentPath,
  userName,
  adminStatus,
}: SubItemProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="hover:text-primary cursor-pointer relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-1 cursor-pointer">
        <span>
          {(subItem.label === "Account" && userName) || subItem.label}
        </span>
        <span>
          <ChevronDown size={12} />
        </span>
      </div>
      {hover && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="h-2 w-full" />
          <Card className="bg-white p-4 flex flex-col gap-4">
            {subItem.label === "Account" ? (
              <AccountLinks
                userName={userName}
                adminStatus={adminStatus}
                currentPath={currentPath}
              />
            ) : (
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

interface AccountLinksProps {
  userName: string;
  adminStatus: boolean;
  currentPath: string;
}

const AccountLinks = ({
  userName,
  adminStatus,
  currentPath,
}: AccountLinksProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!userName);
  }, [userName]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              className={cn(
                "text-nowrap hover:text-primary text-[15px]",
                currentPath === "/login" && "text-primary",
              )}
              href={"/login"}
            >
              Login
            </Link>
            <Link
              className={cn(
                "text-nowrap hover:text-primary text-[15px]",
                currentPath === "/register" && "text-primary",
              )}
              href={"/register"}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              className={cn(
                "text-nowrap hover:text-primary text-[15px]",
                currentPath === "/account" && "text-primary",
              )}
              href={"/account"}
            >
              My Account
            </Link>
            {adminStatus && (
              <Link
                className={cn(
                  "text-nowrap hover:text-primary text-[15px]",
                  currentPath === "/admin" && "text-primary",
                )}
                href={"/admin"}
              >
                Admin Panel
              </Link>
            )}
          </>
        )}
      </div>
      {isLoggedIn && <SignOut />}
    </>
  );
};
