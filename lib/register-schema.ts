import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  department: z.enum(["LSGD", "PWD", "Irrigation"], {
    required_error: "Department is required",
    invalid_type_error: "Department must be one of the specified options",
  }),
  inService: z.enum(["yes", "no"], {
    required_error: "In service is required",
  }),
  designation: z.enum(
    [
      "Assistant Engineer",
      "Assitant Executive Engineer",
      "Executive Engineer",
      "Superintending Engineer",
      "Chief Engineer",
    ],
    {
      required_error: "Designation is required",
      invalid_type_error: "Designation must be one of the specified options",
    },
  ),
  officeAddress: z.string({
    required_error: "Office address is required",
  }),
  workingDistrict: z.enum(
    [
      "Thiruvananthapuram",
      "Kollam",
      "Pathanamthitta",
      "Alappuzha",
      "Kottayam",
      "Idukki",
      "Ernakulam",
      "Thrissur",
      "Palakkad",
      "Malappuram",
      "Kozhikode",
      "Wayanad",
      "Kannur",
      "Kasaragod",
    ],
    {
      required_error: "Working district is required",
    },
  ),
  employmentStatus: z.enum(["Working", "Retired", "Expired"], {
    required_error: "Employment status is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  gender: z.enum(["Male", "Female", "Transgender"], {
    required_error: "Gender is required",
  }),
  permanentAddress: z.string({
    required_error: "Permanent address is required",
  }),
  homeDistrict: z.enum(
    [
      "Thiruvananthapuram",
      "Kollam",
      "Pathanamthitta",
      "Alappuzha",
      "Kottayam",
      "Idukki",
      "Ernakulam",
      "Thrissur",
      "Palakkad",
      "Malappuram",
      "Kozhikode",
      "Wayanad",
      "Kannur",
      "Kasaragod",
    ],
    {
      required_error: "Permanent district is required",
    },
  ),
  phoneNumber: z
    .string()
    .regex(
      /^(\+91)?\d{10}$/,
      "Phone number must be exactly 10 digits or start with +91 followed by 10 digits",
    ),

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
  locality: z.string({
    required_error: "Locality is required",
  }),
  photo: z.string().optional(),
});
