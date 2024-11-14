import { verifyClerkUser } from "@/actions/verify-clerk-user";
import UpdateUser from "@/components/custom/update-user";
import Wrapper from "@/components/custom/wrapper";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Account() {
  const { userId } = await auth();
  const user = await verifyClerkUser(userId);
  if (!userId) {
    redirect("/");
  }
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">Account</h1>
      <UpdateUser user={user} />
    </Wrapper>
  );
}
