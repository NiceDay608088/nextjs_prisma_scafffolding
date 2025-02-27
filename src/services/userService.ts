import {
  createUserRepo,
  deleteUsersRepo,
  editUserRepo,
  getUserByIdRepo,
  getUserByNameRepo,
  listUsersRepo,
} from "@/repositories/userRepository";
import { encrypt } from "@/utils/encrypt-util";
import _ from "lodash";

export const createUser = async (request: UserCreateRequest) => {
  const user = await createUserRepo({
    username: request.username,
    password: await encrypt(request.password),
  });
  return user;
};

export const editUser = async (request: UserUpdateRequest) => {
  const existUser = getUserByName(request.username);
  if (existUser != null) {
    throw Error(`${request.username} exists. Pls change to another name.`);
  }

  return await editUserRepo(request);
};

export const deleteUsers = async (request: UserDeleteRequest) => {
  return await deleteUsersRepo(request);
};

export const listUsers = async (userFilterRequest: UserFilterRequest) => {
  const { users, ...restFields } = await listUsersRepo(userFilterRequest);
  const sanitizedUsers = users.map((user) =>
    _.omit(user, ["password", "isDeleted"])
  );
  return { users: sanitizedUsers, ...restFields };
};

export const getUserByName = async (username: string) => {
  return getUserByNameRepo(username);
};

export const getUserById = async (id: string) => {
  return getUserByIdRepo(id);
};
