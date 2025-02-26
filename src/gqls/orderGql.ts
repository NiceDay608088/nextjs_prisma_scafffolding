import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME_PASSWORD = gql`
  query GetUserByUsernamePassword($username: String!, $password: String!) {
    getUserByUsernamePassword(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: String!) {
    getUserByUsernamePassword(id: $id) {
      id
      name
      amount
    }
  }
`;

export const GET_ORDERS_BY_FILTER = gql`
  query GetOrdersByFilter(
    $name: String
    $minAmount: Float
    $maxAmount: Float
    $currentPage: Int
  ) {
    getOrdersByFilter(
      name: $name
      minAmount: $minAmount
      maxAmount: $maxAmount
      currentPage: $currentPage
    ) {
      currentPage
      totalRecords
      totalPages
      orders {
        id
        name
        amount
      }
    }
  }
`;
