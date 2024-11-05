import Wrapper from "@/components/custom/wrapper";
import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <Wrapper>
      <h1>Login</h1>
      <SignIn />
    </Wrapper>
  );
}
