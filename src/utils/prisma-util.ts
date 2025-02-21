import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// PrismaClient({ log: ["query"] })

export const closePrisma = async () => {
  await prisma.$disconnect();
};

export default prisma;
