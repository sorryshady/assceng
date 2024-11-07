"use client";
import { LoginSchema } from "@/lib/login-schema";
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
import { useSignIn } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { useState } from "react";
import ShowPassword from "./show-password";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { findUserEmail } from "@/actions/find-user-email";
import { toast } from "sonner";

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [clerkReg, setClerkReg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    if (!isLoaded) return;
    console.log("calling onSubmit");
    setError("");
    setSuccess("");
    setSubmitting(true);
    const user = await findUserEmail(values.email);
    if (user) {
      if (user.verifiedStatus === "PENDING") {
        setError("Account has not yet been verified. Cannot login.");
      } else if (user.verifiedStatus === "VERIFIED") {
        if (user.clerkId) {
          setClerkReg(true);
          try {
            const signInAttempt = await signIn.create({
              identifier: values.email,
              password: values.password,
            });
            if (signInAttempt.status === "complete") {
              form.reset();
              setSuccess("Login successful. Redirecting...");
              const user = await findUserEmail(values.email);
              toast.message("Account Incomplete");
              await setActive({ session: signInAttempt.createdSessionId });
              if (!user) {
                router.push("/complete-account");
              }
            } else {
              setError("Incorrect email or password");
              console.error(JSON.stringify(signInAttempt, null, 2));
            }
          } catch (err: any) {
            setError(err.errors[0].message);
            console.error(JSON.stringify(err.errors[0].message, null, 2));
          } finally {
            setSubmitting(false);
          }
        } else {
          setError("User not clerk registered.");
        }
      } else if (user.verifiedStatus === "REJECTED") {
        setError("Your application has been rejected. Cannot login.");
      }
      //   form.reset();
    }
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(user, null, 2)}</code>
      </pre>,
    );
    setSubmitting(false);
    // try {
    //   const signInAttempt = await signIn.create({
    //     identifier: values.email,
    //     password: values.password,
    //   });
    //   if (signInAttempt.status === "complete") {
    //     form.reset();
    //     setSuccess("Login successful. Redirecting...");
    //     const user = await findUserEmail(values.email);
    //     toast.message("Account Incomplete");
    //     await setActive({ session: signInAttempt.createdSessionId });
    //     if (!user) {
    //       router.push("/complete-account");
    //     }
    //   } else {
    //     setError("Incorrect email or password");
    //     console.error(JSON.stringify(signInAttempt, null, 2));
    //   }
    // } catch (err: any) {
    //   setError(err.errors[0].message);
    //   console.error(JSON.stringify(err.errors[0].message, null, 2));
    // } finally {
    //   setSubmitting(false);
    // }
  };
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
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
          {clerkReg && (
            <FormField
              control={form.control}
              disabled={submitting}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
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
          )}
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button className="w-full" type="submit" disabled={submitting}>
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default LoginForm;
