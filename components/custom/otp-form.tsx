"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OTPSchema } from "@/lib/otp-schema";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

interface OTPProps {
  verify: (otpData: z.infer<typeof OTPSchema>) => Promise<void>;
  error: string;
  success: string;
  submitting: boolean;
}
const OTPForm = ({ verify, error, success, submitting }: OTPProps) => {
  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      code: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(verify)}
        className="space-y-8 max-w-lg mx-auto"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
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
  );
};

export default OTPForm;
