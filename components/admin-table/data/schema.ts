import { z } from "zod";

export const userTableSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  department: z.enum(["LSGD", "PWD", "IRRIGATION"]),
  designation: z.enum([
    "ASSISTANT_ENGINEER",
    "ASSISTANT_EXECUTIVE_ENGINEER",
    "EXECUTIVE_ENGINEER",
    "SUPERINTENDING_ENGINEER",
    "CHIEF_ENGINEER",
  ]),
  workingDistrict: z.enum([
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
  ]),
  employmentStatus: z.enum(["WORKING", "RETIRED", "EXPIRED"]),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  mobileNumber: z.string(),
  committeeStatus: z.enum(["STATE", "DISTRICT"]),
  userRole: z.enum(["REGULAR", "ADMIN"]),
});

export type UserTableSchema = z.infer<typeof userTableSchema>;
