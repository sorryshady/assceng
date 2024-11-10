import { Metadata } from "next";
import Image from "next/image";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import Wrapper from "@/components/custom/wrapper";
import { fetchVerifiedUsers } from "@/actions/fetch-users";
import { redirect } from "next/navigation";
import { verifyClerkUser } from "@/actions/verify-clerk-user";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  const { userId } = await auth();
  const adminUser = await verifyClerkUser(userId);

  if (adminUser.userRole !== "ADMIN") {
    redirect("/");
  }
  const users = await fetchVerifiedUsers(userId);

  return (
    <Wrapper>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={users} columns={columns} />
      </div>
    </Wrapper>
  );
}
