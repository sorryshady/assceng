import LoginForm from "@/components/custom/login-form";
import Wrapper from "@/components/custom/wrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Login() {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
}
