import { RECORD_PER_PAGE } from "@/utils/constants";
import { encrypt } from "@/utils/encrypt-util";
import prisma from "@/lib/prisma";

export const createUserRepo = async (request: UserCreateRequest) => {
  const user = await prisma.user.create({ data: request });
  return user;
};

export const editUserRepo = async (request: UserUpdateRequest) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: Number(request.id),
    },
    data: {
      username: request.username,
      password: await encrypt(request.password),
    },
  });
  return updatedUser;
};

export const deleteUserRepo = async (id: string) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      isDeleted: true,
    },
  });
  return updatedUser;
};

export const listUsersRepo = async (currentPage: number) => {
  const skip = (currentPage - 1) * RECORD_PER_PAGE;

  const whereConditions = {
    isDeleted: false,
  };

  const [users, totalCount] = await prisma.$transaction([
    prisma.user.findMany({
      where: whereConditions,
      skip: skip,
      take: RECORD_PER_PAGE,
    }),

    prisma.user.count({
      where: whereConditions,
    }),
  ]);

  return { users, totalCount, currentPage };
};

export const getUserByNameRepo = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
      isDeleted: false,
    },
  });
  return user;
};

export const getUserByIdRepo = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });
  return user;
};
