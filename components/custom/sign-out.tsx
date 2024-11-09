"use client";

import { useClerk } from "@clerk/nextjs";

interface Props {
  handleClick?: () => void;
}
const SignOut = ({ handleClick }: Props) => {
  const { signOut } = useClerk();
  const clickFunctionality = () => {
    signOut({ redirectUrl: "/" });
    handleClick?.();
  };
  return (
    <p
      className="text-start text-base hover:text-primary"
      onClick={clickFunctionality}
    >
      Sign Out
    </p>
  );
};
export default SignOut;
