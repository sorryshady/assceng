import { verifyClerkUser } from "@/actions/verify-clerk-user";
import Wrapper from "@/components/custom/wrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Admin() {
  const { userId } = await auth();
  const user = await verifyClerkUser(userId);

  if (user.userRole !== "ADMIN") {
    redirect("/");
  }
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">Admin Page</h1>
    </Wrapper>
  );
}
