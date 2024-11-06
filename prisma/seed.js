// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
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
        email: faker.internet.email(),
        gender: faker.helpers.arrayElement(["MALE", "FEMALE", "TRANSGENDER"]),
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
        dateOfBirth: faker.date.birthdate({ min: 20, max: 60, mode: "age" }),
        locality: faker.location.city(),
        photoUrl: faker.image.avatar(),
        committeeStatus: faker.helpers.arrayElement([
          "NONE",
          "STATE",
          "DISTRICT",
        ]),
        userRole: "REGULAR",
        verifiedStatus: faker.datatype.boolean(),
      },
    });
  }
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
