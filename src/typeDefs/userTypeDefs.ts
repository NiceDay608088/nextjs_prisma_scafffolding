import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    username: String
    id: String
  }

  type Query {
    getUserByUsernamePassword(username: String!, password: String!): User
  }

  type Mutation {
    createUser(username: String!, password: String!): User
  }
`;
