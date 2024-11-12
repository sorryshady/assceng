import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createClerkClient } from "@clerk/backend";
import fs from "fs";
import { min } from "date-fns";

const prisma = new PrismaClient();
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const testUsers = [];
async function main() {
  // DELETE USERS
  //   const users = await fetch("https://api.clerk.dev/v1/users", {
  //     headers: {
  //       Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
  //     },
  //   }).then((res) => res.json());

  //   const userIds = users.map((user) => user.id);
  //   console.log(userIds);
  //   for (let i = 0; i < userIds.length; i++) {
  //     await clerkClient.users.deleteUser(userIds[i]);
  //   }

  //   CREATE USERS
  for (let i = 0; i < 20; i++) {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      password: password,
    });

    testUsers.push({ email, password });

    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        clerkId: clerkUser.id,
        department: faker.helpers.arrayElement(["LSGD", "PWD", "IRRIGATION"]),
        designation: faker.helpers.arrayElement([
          "ASSISTANT_ENGINEER",
          "ASSISTANT_EXECUTIVE_ENGINEER",
          "EXECUTIVE_ENGINEER",
          "SUPERINTENDING_ENGINEER",
          "CHIEF_ENGINEER",
        ]),
        officeAddress: faker.location.streetAddress(),
        workingDistrict: faker.helpers.arrayElement([
          "TVM",
          "KLM",
          "PTA",
          "ALP",
          "KTM",
          "IDK",
          "EKM",
          "TRR",
          "PKD",
          "MPM",
          "KZD",
          "WYD",
          "KNR",
          "KSD",
        ]),
        employmentStatus: faker.helpers.arrayElement([
          "WORKING",
          "RETIRED",
          "EXPIRED",
        ]),
        email: email,
        gender: faker.helpers.arrayElement(["MALE", "FEMALE", "OTHER"]),
        permanentAddress: faker.location.streetAddress(),
        homeDistrict: faker.helpers.arrayElement([
          "TVM",
          "KLM",
          "PTA",
          "ALP",
          "KTM",
          "IDK",
          "EKM",
          "TRR",
          "PKD",
          "MPM",
          "KZD",
          "WYD",
          "KNR",
          "KSD",
        ]),
        phoneNumber: faker.phone.number("##########"),
        mobileNumber: faker.phone.number("##########"),
        bloodGroup: faker.helpers.arrayElement([
          "A+",
          "A-",
          "B+",
          "B-",
          "O+",
          "O-",
          "AB+",
          "AB-",
        ]),
        dateOfBirth: faker.date.birthdate({
          min: 20,
          max: 60,
          mode: "age",
        }),
        locality: faker.location.city(),
        photoUrl: faker.image.avatar(),
        committeeStatus: faker.helpers.arrayElement([
          "NONE",
          "STATE",
          "DISTRICT",
        ]),
        userRole: "REGULAR",
        verifiedStatus: faker.helpers.arrayElement([
          "VERIFIED",
          "PENDING",
          "REJECTED",
        ]),
      },
    });
  }

  fs.writeFileSync("testUsers.json", JSON.stringify(testUsers, null, 2));
}

main()
  .then(() => {
    console.log("Dummy users created");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
