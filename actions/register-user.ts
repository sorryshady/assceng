"use server";

import { db } from "@/db";
import { registerSchema } from '@/lib/register-schema'
import { z } from 'zod'

export const registerUser = async (data: z.infer<typeof registerSchema>, photoUrl: string) => {
    const finalData = {
              name: data.name,
            //   clerkId: clerkId,
              department: data.department,
              designation: data.designation,
              officeAddress: data.officeAddress,
              workingDistrict: data.workingDistrict,
              employmentStatus: data.employmentStatus,
              email: data.email,
              gender: data.gender,
              permanentAddress: data.permanentAddress,
              homeDistrict: data.homeDistrict,
              phoneNumber: data.phoneNumber,
              mobileNumber: data.mobileNumber,
              bloodGroup: data.bloodGroup,
              dateOfBirth: data.dateOfBirth,
              locality: data.locality,
              photoUrl: photoUrl || "",
            };
  await db.user.create({ data: finalData });
};
