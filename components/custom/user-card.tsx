"use client";

import { User } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import DummyImage from "@/public/news-placeholder.webp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { designation, workingDistrict } from "../data-table/data/data";

interface UserCardProps {
  member: User;
}
const UserCard = ({ member }: UserCardProps) => {
  const userDesignation = designation.find(
    (item) => item.value === member.designation,
  );
  const userDistrict = workingDistrict.find(
    (item) => item.value === member.workingDistrict,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={member.name}
          className="shadow-md w-full cursor-pointer flex flex-col relative group rounded-md"
        >
          <div className="w-full h-full bg-cover rounded-md overflow-hidden">
            <Image
              src={member.photoUrl || DummyImage}
              alt={member.name}
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
              className="object-cover md:group-hover:scale-[1.04] transition-all duration-300"
            />
          </div>
          <div className="absolute rounded-br-md rounded-tl-md bottom-0 right-0 bg-white px-6 py-3 md:group-hover:px-8 md:group-hover:py-4 md:transition-all duration-300 flex gap-4">
            {member.name}
            <div className="opacity-0 md:group-hover:opacity-100 transition-all duration-300">
              <ArrowRight className="inline w-4 h-4 md:h-6 md:w-6 ml-2" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        id="user-card-children"
        className="max-w-[90vw] md:max-w-[50vw] lg:max-w-[25vw] h-[70svh] md:h-[60svh] lg:h-[60svh] rounded-md"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl">{member.name}</DialogTitle>
          <DialogDescription className="text-base">
            {userDesignation?.label}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Image
            src={member.photoUrl || DummyImage}
            alt={member.name}
            width={300}
            height={300}
            style={{ objectFit: "cover" }}
            className="object-cover md:group-hover:scale-[1.04] transition-all duration-300"
          />
        </div>
        <h2 className="text-xl font-bold text-center mb-2">Personal Details</h2>
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="space-y-2">
            <Details label="Email" value={member.email} />
            <Details label="Phone Number" value={member.mobileNumber} />
            <Details label="Department" value={member.department} />
            <Details label="Working District" value={userDistrict?.label} />
            <Details
              label="Permanent Address"
              value={member.permanentAddress}
              classname="pb-6"
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default UserCard;

interface DetailsProps {
  label: string;
  value: string | undefined | null;
  classname?: string;
}
const Details = ({ label, value, classname }: DetailsProps) => {
  return (
    <div className={cn("flex flex-col", classname)}>
      <p className="font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  );
};
