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
