import { gql } from '@apollo/client';

export const GET_ALBUMS = gql`
  query GetAlbums($options: PageQueryOptions) {
    albums(options: $options) {
      data {
        id
        title
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_ALBUM = gql`
  query GetAlbum($id: ID!) {
    album(id: $id) {
      id
      title
      user {
        name
      }
      photos {
        id
        title
        url
        thumbnailUrl
      }
    }
  }
`;

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($input: CreateAlbumInput!) {
    createAlbum(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_ALBUM = gql`
  mutation UpdateAlbum($id: ID!, $input: UpdateAlbumInput!) {
    updateAlbum(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_ALBUM = gql`
  mutation DeleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
  }
`;

export const DELETE_ALBUMS = gql`
  mutation DeleteAlbums($ids: [ID!]!) {
    deleteAlbums(ids: $ids)
  }
`;