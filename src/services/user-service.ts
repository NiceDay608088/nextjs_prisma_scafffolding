import {
  createUserRepo,
  deleteUserRepo,
  editUserRepo,
  getUserByIdRepo,
  getUserByNameRepo,
  listUsersRepo,
} from "@/repositories/user-repository";

export const createUser = async (request: UserCreateRequest) => {
  return await createUserRepo(request);
};

export const editUser = async (request: UserUpdateRequest) => {
  const existUser = getUserByName(request.username);
  if (existUser != null) {
    throw Error(`${request.username} exists. Pls change to another name.`);
  }

  return await editUserRepo(request);
};

export const deleteUser = async (id: string) => {
  return await deleteUserRepo(id);
};

export const listUsers = async (currentPage: number) => {
  return await listUsersRepo(currentPage);
};

export const getUserByName = async (username: string) => {
  return getUserByNameRepo(username);
};

export const getUserById = async (id: string) => {
  return getUserByIdRepo(id);
};
