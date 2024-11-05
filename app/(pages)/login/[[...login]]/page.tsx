import LoginForm from "@/components/custom/login-form";
import Wrapper from "@/components/custom/wrapper";

export default function Login() {
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">Login</h1>
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
    </Wrapper>
  );
}
