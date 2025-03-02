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

export const deleteUsersRepo = async (request: UserDeleteRequest) => {
  const deletedUsers = await prisma.user.updateMany({
    where: {
      id: { in: request.ids },
    },
    data: {
      isDeleted: true,
    },
  });
  return deletedUsers;
};

export const listUsersRepo = async ({
  username,
  currentPage,
}: UserFilterRequest) => {
  const skip = (currentPage - 1) * RECORD_PER_PAGE;

  const whereConditions: any = {
    isDeleted: false,
  };

  if (username && username.trim() !== "") {
    whereConditions.username = {
      contains: username.trim(),
      mode: "insensitive",
    };
  }

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
  const pages = Math.ceil(totalCount / RECORD_PER_PAGE);

  return { users, totalCount, currentPage, pages };
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
