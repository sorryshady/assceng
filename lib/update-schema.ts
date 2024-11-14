import { z } from "zod";

export const updateSchema = z.object({
  department: z.enum(["LSGD", "PWD", "IRRIGATION"]),
  designation: z.enum(
    [
      "ASSISTANT_ENGINEER",
      "ASSISTANT_EXECUTIVE_ENGINEER",
      "EXECUTIVE_ENGINEER",
      "SUPERINTENDING_ENGINEER",
      "CHIEF_ENGINEER",
    ],
  ),
  employmentStatus: z.enum(["WORKING", "RETIRED", "EXPIRED"]),
});
