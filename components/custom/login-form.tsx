"use client";
import { EmailSchema } from "@/lib/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CardWrapper } from "./card-wrapper";
import { useState } from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { findUserEmail } from "@/actions/find-user-email";
import ClerkSigninForm from "./clerk-signin-form";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof EmailSchema>) => {
    setError("");
    setSuccess("");
    setSubmitting(true);
    const user = await findUserEmail(values.email);
    if (user) {
      setEmail(values.email);
      if (user.verifiedStatus === "PENDING") {
        setError("Account has not yet been verified. Cannot login.");
      } else if (user.verifiedStatus === "VERIFIED") {
        if (user.clerkId) {
          setStep(1);
        } else {
          setStep(2);
        }
      } else if (user.verifiedStatus === "REJECTED") {
        setError("Your application has been rejected. Cannot login.");
      }
    } else {
      setError("Email does not exist in database.");
    }
    setSubmitting(false);
  };
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      {step === 0 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-lg mx-auto"
          >
            <FormField
              control={form.control}
              disabled={submitting}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button className="w-full" type="submit" disabled={submitting}>
              Submit
            </Button>
          </form>
        </Form>
      )}
      {step === 1 && <ClerkSigninForm email={email} />}
      {step === 2 && <div>Sign up flow</div>}
    </CardWrapper>
  );
};
export default LoginForm;
