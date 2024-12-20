"use client";

import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/register-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  bloodGroup,
  department,
  designation,
  district,
  employmentStatus,
  gender,
} from "@/lib/data-arrays";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import { registerUser } from "@/actions/register-user";
import { findUserEmail } from "@/actions/find-user-email";
import { Label } from "../ui/label";
import { CardWrapper } from "./card-wrapper";
const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      department: undefined,
      designation: undefined,
      officeAddress: "",
      workingDistrict: undefined,
      employmentStatus: undefined,
      email: "",
      gender: undefined,
      permanentAddress: "",
      homeDistrict: undefined,
      phoneNumber: "",
      mobileNumber: "",
      bloodGroup: undefined,
      dateOfBirth: "",
      locality: "",
      photo: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setIsSubmitting(true);
      const user = await findUserEmail(data.email);
      if (user) {
        toast.error(
          "Email already associated with an account. Use a different email or try logging in.",
        );
        setIsSubmitting(false);
        return;
      } else {
        let imgUrl = "";
        if (data.photo) {
          const res = await startUpload([data.photo!], {});
          if (res) {
            imgUrl = res[0].url;
          }
        }
        await registerUser(data, imgUrl);
        toast.success("Form submitted successfully");
        setSuccess(true);
        form.reset();
      }
    } catch (error: any) {
      console.error(JSON.stringify(error.errors[0].message, null, 2));
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <CardWrapper
        headerLabel="Register"
        backButtonHref="/login"
        backButtonLabel="Have an account? Login"
      >
        {!success ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-lg mx-auto"
            >
              <div className="space-y-4">
                <Label className="text-xl font-semibold">
                  Personal Details
                </Label>
                <FormField //name
                  control={form.control}
                  disabled={isSubmitting}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //date of birth
                  control={form.control}
                  disabled={isSubmitting}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth *</FormLabel>
                      <Input placeholder="dd/mm/yyyy" type="text" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //gender
                  control={form.control}
                  disabled={isSubmitting}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gender.map((item) => (
                            <CustomSelectItem
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            />
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //blood group
                  control={form.control}
                  disabled={isSubmitting}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Group *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bloodGroup.map((item) => (
                            <CustomSelectItem
                              key={item}
                              value={item}
                              label={item}
                            />
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Label className="text-xl font-semibold">
                  Employment Information
                </Label>
                <FormField // department
                  control={form.control}
                  disabled={isSubmitting}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {department.map((item) => (
                            <CustomSelectItem
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            />
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //designation
                  control={form.control}
                  disabled={isSubmitting}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {designation.map((item) => (
                            <CustomSelectItem
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            />
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //employment Status
                  control={form.control}
                  disabled={isSubmitting}
                  name="employmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Status *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select current employment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employmentStatus.map((item) => (
                            <CustomSelectItem
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            />
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //office address
                  control={form.control}
                  disabled={isSubmitting}
                  name="officeAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter office address." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //working district
                  control={form.control}
                  disabled={isSubmitting}
                  name="workingDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Working District *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select working district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {district.map((item) => (
                            <CustomSelectItem
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            />
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Label className="text-xl font-semibold">
                  Permanent Contact Information
                </Label>
                <FormField //permanent address
                  control={form.control}
                  disabled={isSubmitting}
                  name="permanentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permanent Address *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your permanent address."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //home district
                  control={form.control}
                  disabled={isSubmitting}
                  name="homeDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home District *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select home district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {district.map((item) => (
                            <CustomSelectItem
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            />
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //locality
                  control={form.control}
                  disabled={isSubmitting}
                  name="locality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Locality *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your locality." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Label className="text-xl font-semibold">Contact Details</Label>
                <FormField //email
                  control={form.control}
                  disabled={isSubmitting}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormDescription>
                        This email will be used for account registration.
                      </FormDescription>
                      <FormControl>
                        <Input placeholder="Enter your email." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //phone number
                  control={form.control}
                  disabled={isSubmitting}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField //mobile number
                  control={form.control}
                  disabled={isSubmitting}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your mobile number."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Label className="text-xl font-semibold">Verification</Label>
                <FormField //photo
                  control={form.control}
                  name="photo"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your photo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file); // Manually pass the File object to form state
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <p className="font-lg font-semibold text-center">
              Your data has been successfully submitted. You will receive a
              confirmation email once your account has been verified.
            </p>
            <div className="flex flex-col gap-5">
              <Button
                className="mx-auto w-full"
                onClick={() => setSuccess(false)}
              >
                New Registration
              </Button>
              <Button asChild className="mx-auto w-full">
                <Link href={"/"}>Go to Home</Link>
              </Button>
            </div>
          </div>
        )}
      </CardWrapper>
    </>
  );
};
export default RegisterForm;

interface CustomSelectItemProps {
  value: string;
  label: string;
}
const CustomSelectItem = ({ value, label }: CustomSelectItemProps) => {
  return <SelectItem value={value}>{label}</SelectItem>;
};
