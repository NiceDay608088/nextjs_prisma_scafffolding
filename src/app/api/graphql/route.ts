import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { orderTypeDefs } from "@/typeDefs/orderTypeDefs";
import { orderResolvers } from "@/resolvers/orderResolvers";

const server = new ApolloServer({
  typeDefs: [orderTypeDefs],
  resolvers: [orderResolvers],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
