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
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import OTPForm from "./otp-form";
import ShowPassword from "./show-password";
import { OTPSchema } from "@/lib/otp-schema";
import { ClerkSignupSchema } from "@/lib/login-schema";
import { registerClerkId } from "@/actions/register-clerId";

interface ClerkSignupFormProps {
  email: string;
}
const ClerkSignupForm = ({ email }: ClerkSignupFormProps) => {
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ClerkSignupSchema>>({
    resolver: zodResolver(ClerkSignupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ClerkSignupSchema>) => {
    if (!isLoaded) return;
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await signUp.create({
        emailAddress: email,
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
        await registerClerkId(email);
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
    <>
      {!verifying ? (
        <>
          <p className="text-sm text-muted-foreground mb-5">
            Account with email{" "}
            <span className="text-black font-bold text-center">{email}</span> is
            verified. Fill in the fields to create new account.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-lg mx-auto"
            >
              <FormField
                control={form.control}
                disabled={submitting}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a password"
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
                disabled={submitting}
                name="confirmPassword"
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
                    <ShowPassword
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />
              <Button className="w-full" type="submit" disabled={submitting}>
                Sign Up
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <OTPForm
          verify={handleVerification}
          error={error}
          success={success}
          submitting={submitting}
        />
      )}
    </>
  );
};

export default ClerkSignupForm;
