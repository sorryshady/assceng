import RegisterForm from "@/components/custom/register-form";
import Wrapper from "@/components/custom/wrapper";

export default function Register() {
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">Membership Form</h1>
      <RegisterForm />
    </Wrapper>
  );
}
