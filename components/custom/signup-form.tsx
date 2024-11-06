"use client";

import { SignupSchema } from "@/lib/signup-schema";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import OTPForm from "./otp-form";
import ShowPassword from "./show-password";
import { OTPSchema } from "@/lib/otp-schema";
import { findUserEmail } from "@/actions/find-user-email";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    if (!isLoaded) return;
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (error: any) {
      setError(error.errors[0].message);
      console.error("Signup error:", error.errors[0].message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerification = async (otpData: z.infer<typeof OTPSchema>) => {
    if (!isLoaded) return;
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otpData.code,
      });
      if (signUpAttempt.status === "complete") {
        setSuccess("Email verified successfully. Redirecting...");
        await setActive({ session: signUpAttempt.createdSessionId });
        const user = await findUserEmail(signUpAttempt.emailAddress!);
        if (!user) {
          router.push("/complete-account");
        }
        setVerifying(false);
      } else {
        setError("Verification failed. Please check the code.");
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error("Verification error:", err.errors[0].message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="Sign Up"
      backButtonLabel="Have an account?"
      backButtonHref="/login"
    >
      {!verifying ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-lg mx-auto"
          >
            <FormField
              control={form.control}
              name="email"
              disabled={submitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              disabled={submitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={submitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <ShowPassword
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full" type="submit" disabled={submitting}>
              Submit
            </Button>
          </form>
        </Form>
      ) : (
        <OTPForm
          verify={handleVerification}
          error={error}
          success={success}
          submitting={submitting}
        />
      )}
    </CardWrapper>
  );
};

export default SignupForm;
