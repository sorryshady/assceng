import { verifyClerkUser } from "@/actions/verify-clerk-user";
import Wrapper from "@/components/custom/wrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchVerifiedUsers, fetchPendingUsers } from "@/actions/fetch-users";
import AdminTableClient from "@/components/admin-table/components/admin-table-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import PendingTableClient from "@/components/pending-table/components/pending-table-client";

export default async function Admin() {
  const { userId } = await auth();
  const adminUser = await verifyClerkUser(userId);

  if (adminUser.userRole !== "ADMIN") {
    redirect("/");
  }
  const users = await fetchVerifiedUsers(userId);
  const pendingUsers = await fetchPendingUsers();
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
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="cms">Content Management</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card className="p-4 pt-8">
              <AdminTableClient initialUsers={users} />
            </Card>
          </TabsContent>
          <TabsContent value="pending">
            <Card className="p-4 pt-8">
              <PendingTableClient initialUsers={pendingUsers} />
            </Card>
          </TabsContent>
          <TabsContent value="cms">
            <Card className="p-4 pt-8">CMS Stuff appears here</Card>
          </TabsContent>
        </Tabs>
      </div>
    </Wrapper>
  );
}
