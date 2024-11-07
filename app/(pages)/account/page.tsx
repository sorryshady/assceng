"use client";
import Wrapper from "@/components/custom/wrapper";
import { useAuth } from "@clerk/nextjs";

export default function Account() {
  const { userId } = useAuth();
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">Account</h1>
      <p>{userId}</p>
    </Wrapper>
  );
}
