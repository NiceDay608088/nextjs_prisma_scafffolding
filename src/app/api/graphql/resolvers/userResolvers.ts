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
    createUser: (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      console.log("createUser", { username, password });
      return { username: "prod", id: "2" };
    },
  },
};
