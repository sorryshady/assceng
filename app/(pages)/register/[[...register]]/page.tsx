
import SignupForm from "@/components/custom/signup-form";
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
      {/* <RegisterForm /> */}
      <div className="mx-auto">
        <SignupForm />
      </div>
    </Wrapper>
  );
}
