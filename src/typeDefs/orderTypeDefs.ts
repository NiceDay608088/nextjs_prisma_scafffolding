import gql from "graphql-tag";

export const orderTypeDefs = gql`
  type Order {
    id: Int!
    name: String!
    amount: Float!
    category: String!
    metadatadata: JSON
  }

  type Query {
    getOrder(id: Int!): Order!
    getOrders(): [Order!]!
  }

  type Mutation {
    createOrder(name: String!, amount: Float!, category: String!, metadata: JSON): Int!
    updateOrder(id: Int!, name: String!, amount: Float!, category: String!, metadata: JSON): Int!
    deleteOrder(id: Int!): Int!
  }
`;
