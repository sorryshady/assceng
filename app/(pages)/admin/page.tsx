import { verifyClerkUser } from "@/actions/verify-clerk-user";
import Wrapper from "@/components/custom/wrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchVerifiedUsers } from "@/actions/fetch-users";
import { DataTable } from "@/components/admin-table/components/data-table";
import { columns } from "@/components/admin-table/components/columns";

export default async function Admin() {
  const { userId } = await auth();
  const adminUser = await verifyClerkUser(userId);

  if (adminUser.userRole !== "ADMIN") {
    redirect("/");
  }
  const users = await fetchVerifiedUsers();
  return (
    <Wrapper>
      <div className="h-full flex flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome Admin, {adminUser.name}
            </h2>
          </div>
        </div>
        <DataTable data={users} columns={columns} />
      </div>
    </Wrapper>
  );
}
