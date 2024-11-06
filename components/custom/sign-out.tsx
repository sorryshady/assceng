"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";

const SignOut = () => {
  const { signOut } = useClerk();

  return (
    <Button variant={"link"} onClick={() => signOut({ redirectUrl: "/" })}>
      Sign Out
    </Button>
  );
};
export default SignOut;
