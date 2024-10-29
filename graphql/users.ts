import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        name
        username
        email
        phone
        website
        company {
          name
          catchPhrase
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
      company {
        name
        catchPhrase
      }
      address {
        street
        suite
        city
        zipcode
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      username
      email
      phone
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;