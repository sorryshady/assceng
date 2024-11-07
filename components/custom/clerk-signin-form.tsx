import { ClerkSigninSchema } from "@/lib/login-schema";
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
import ShowPassword from "./show-password";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { Button } from "../ui/button";
import { useSignIn } from "@clerk/nextjs";

interface ClerkSigninFormProps {
  email: string;
}
const ClerkSigninForm = ({ email }: ClerkSigninFormProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  const form = useForm<z.infer<typeof ClerkSigninSchema>>({
    resolver: zodResolver(ClerkSigninSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ClerkSigninSchema>) => {
    if (!isLoaded) return;
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: values.password,
      });
      if (signInAttempt.status === "complete") {
        form.reset();
        setSuccess("Login successful. Redirecting...");
        await setActive({ session: signInAttempt.createdSessionId });
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err.errors[0].message, null, 2));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <p className="text-sm text-muted-foreground mb-5">
        Email <span className="text-black font-bold text-center">{email}</span>{" "}
        is verified. Enter password to login.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-lg mx-auto"
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
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button className="w-full" type="submit" disabled={submitting}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ClerkSigninForm;
