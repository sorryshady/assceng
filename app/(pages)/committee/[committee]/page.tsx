import { findCommitteeMembers } from "@/actions/find-committee-member";
import Wrapper from "@/components/custom/wrapper";
import UserCard from "@/components/custom/user-card";

type Params = Promise<{ committee: string }>;

export default async function Committee({ params }: { params: Params }) {
  const { committee } = await params;
  const committeeName = committee.split("-")[0];
  const members = await findCommitteeMembers(committeeName);
  const showDistrict = committeeName === "district";
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center capitalize">
        {committeeName} Committee Members
      </h1>
      {showDistrict && <div className="text-lg font-bold">District filter</div>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {members.map((member) => (
          <UserCard key={member.name} member={member} />
        ))}
      </div>
    </Wrapper>
  );
}
