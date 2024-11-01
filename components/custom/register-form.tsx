"use client";

import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/register-schema";
import {
  Form,
  FormControl,
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  bloodGroup,
  department,
  designation,
  district,
  employmentStatus,
  gender,
} from "@/lib/data-arrays";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import { registerUser } from "@/actions/register-user";
import { findUserEmail } from "@/actions/find-user-email";
const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { startUpload } = useUploadThing("imageUploader");
  const [success, setSuccess] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      department: undefined,
      inService: true,
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
      dateOfBirth: undefined,
      locality: "",
      photo: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setIsSubmitting(true);

      const user = await findUserEmail(data.email);
      console.log(user);
      if (user) {
        toast.error("User already exists");
        setIsSubmitting(false);
        return;
      } else {
        if (data.photo) {
          const res = await startUpload([data.photo!], {});
          if (res) {
            await registerUser(data, res[0].url);
          }
        } else {
          await registerUser(data, "");
        }
        toast.success("Form submitted successfully");
        setIsSubmitting(false);
        setSuccess(true);
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!success ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-5xl mx-auto"
          >
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="inService"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>In Service?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "yes")}
                      defaultValue={field.value ? "yes" : "no"}
                      className="flex space-x-5"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="officeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter office address." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="workingDistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working District</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="homeDistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home District</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mobile number." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
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
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="locality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locality</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your locality." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            <Button
              className="w-full md:w-fit"
              type="submit"
              disabled={isSubmitting}
            >
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
