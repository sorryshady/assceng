import { z } from "zod";

export const verifedUsersSchema = z.object({
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
  committeeStatus: z.enum(["STATE", "DISTRICT", "NONE"]),
  userRole: z.enum(["REGULAR", "ADMIN"]),
});

export const pendingUsersSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    employmentStatus: z.enum(["WORKING", "RETIRED", "EXPIRED"]),
    department: z.enum(["LSGD", "PWD", "IRRIGATION"]),
    designation: z.enum([
      "ASSISTANT_ENGINEER",
      "ASSISTANT_EXECUTIVE_ENGINEER",
      "EXECUTIVE_ENGINEER",
      "SUPERINTENDING_ENGINEER",
      "CHIEF_ENGINEER",
    ]),
    verifiedStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]),
    userRole: z.enum(["REGULAR", "ADMIN"]),
})

export type VerifiedUsersSchema = z.infer<typeof verifedUsersSchema>;
export type PendingUserSchema = z.infer<typeof pendingUsersSchema>;
