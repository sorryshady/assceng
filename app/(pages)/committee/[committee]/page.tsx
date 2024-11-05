import { findCommitteeMembers } from "@/actions/find-committee-member";
import Wrapper from "@/components/custom/wrapper";
import DummyImage from "../../../../public/news-placeholder.webp";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type Params = Promise<{ committee: string }>;

export default async function Committee({ params }: { params: Params }) {
  const { committee } = await params;
  const committeeName = committee.split("-")[0];
  const members = await findCommitteeMembers(committeeName);
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center capitalize">
        {committeeName} Committee Members
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {members.map((member) => (
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
        ))}
      </div>
    </Wrapper>
  );
}
