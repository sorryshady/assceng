import { z } from "zod";

export const pendingTableSchema = z.object({
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
  verifiedStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]),
  userRole: z.enum(["REGULAR", "ADMIN"]),
});

export type PendingTableSchema = z.infer<typeof pendingTableSchema>;
