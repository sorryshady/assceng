"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";

const SignOut = () => {
  const { signOut } = useClerk();

  return (
    <p
      className="text-start text-sm hover:text-primary"
      onClick={() => signOut({ redirectUrl: "/" })}
    >
      Sign Out
    </p>
  );
};
export default SignOut;
