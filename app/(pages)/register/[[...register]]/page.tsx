import RegisterForm from "@/components/custom/register-form";
import Wrapper from "@/components/custom/wrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Register() {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">Membership Form</h1>
      <RegisterForm />
    </Wrapper>
  );
}
