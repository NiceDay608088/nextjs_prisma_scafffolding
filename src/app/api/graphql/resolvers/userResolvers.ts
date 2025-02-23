import { createUser } from "@/services/user-service";

export const userResolvers = {
  Query: {
    getUserByUsernamePassword: (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      console.log("login", { username, password });
      return { username: "test", id: "1" };
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      const user = await createUser({ username, password });
      return { username: user.username, id: user.id };
    },
  },
};
