import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Name must be at least 3 characters long" }),
    department: z.enum(["LSGD", "PWD", "IRRIGATION"], {
      required_error: "Department is required",
      invalid_type_error: "Department must be one of the specified options",
    }),
    designation: z.enum(
      [
        "ASSISTANT_ENGINEER",
        "ASSISTANT_EXECUTIVE_ENGINEER",
        "EXECUTIVE_ENGINEER",
        "SUPERINTENDING_ENGINEER",
        "CHIEF_ENGINEER",
      ],
      {
        required_error: "Designation is required",
        invalid_type_error: "Designation must be one of the specified options",
      },
    ),
    officeAddress: z
      .string({
        required_error: "Office address is required",
      })
      .min(5, { message: "Office address must be at least 5 characters long" }),
    workingDistrict: z.enum(
      [
        "TVM", // Thiruvananthapuram
        "KLM", // Kollam
        "PTA", // Pathanamthitta
        "ALP", // Alappuzha
        "KTM", // Kottayam
        "IDK", // Idukki
        "EKM", // Ernakulam
        "TRR", // Thrissur
        "PKD", // Palakkad
        "MPM", // Malappuram
        "KZD", // Kozhikode
        "WYD", // Wayanad
        "KNR", // Kannur
        "KSD", // Kasaragod
      ],
      {
        required_error: "Working district is required",
      },
    ),
    employmentStatus: z.enum(["WORKING", "RETIRED", "EXPIRED"], {
      required_error: "Employment status is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      required_error: "Gender is required",
    }),
    permanentAddress: z
      .string({
        required_error: "Permanent address is required",
      })
      .min(5, {
        message: "Permanent address must be at least 5 characters long",
      }),
    homeDistrict: z.enum(
      [
        "TVM", // Thiruvananthapuram
        "KLM", // Kollam
        "PTA", // Pathanamthitta
        "ALP", // Alappuzha
        "KTM", // Kottayam
        "IDK", // Idukki
        "EKM", // Ernakulam
        "TRR", // Thrissur
        "PKD", // Palakkad
        "MPM", // Malappuram
        "KZD", // Kozhikode
        "WYD", // Wayanad
        "KNR", // Kannur
        "KSD", // Kasaragod
      ],
      {
        required_error: "Permanent district is required",
      },
    ),
    phoneNumber: z
      .string()
      .optional() // Make it optional first
      .refine((value) => !value || /^(\+91)?\d{10}$/.test(value), {
        message:
          "Phone number must be exactly 10 digits or start with +91 followed by 10 digits",
      }),

    mobileNumber: z
      .string({
        required_error: "Mobile number is required",
      })
      .regex(
        /^(\+91)?\d{10}$/,
        "Mobile number must be exactly 10 digits or start with +91 followed by 10 digits",
      ),

    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
      required_error: "Blood group is required",
    }),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
    }),
    locality: z
      .string({
        required_error: "Locality is required",
      })
      .min(3, { message: "Locality must be at least 3 characters long" }),
    photo: z
      .instanceof(File)
      .refine((file) => file.size <= 4 * 1024 * 1024, {
        // 5MB limit
        message: "File size should be less than 4MB",
      })
      .refine(
        (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
        {
          message: "Only JPEG, JPG, and PNG images are allowed",
        },
      )
      .optional(),
  });
