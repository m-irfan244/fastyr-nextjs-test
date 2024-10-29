import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from '../users';
import { UsersResponse } from '@/types/common';

export function useUsers(options?: CacheQueryOptions) {
  const { data, loading, error, refetch } = useQuery<UsersResponse>(GET_USERS, {
    variables: { options },
  });

  const [createUser] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      const { users } = cache.readQuery<UsersResponse>({ query: GET_USERS }) || { users: { data: [] } };
      cache.writeQuery({
        query: GET_USERS,
        variables: {
          options: {
            paginate: {
              page: 1,
              limit: 100
            }
          }
        },
        data: {
          users: {
            ...users,
            data: [...users.data, createUser],
          },
        },
      });
    },
  });

  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
 
  return {
    users: data?.users.data || [],
    totalCount: data?.users?.data?.length|| 0,
    loading,
    error,
    refetch,
    createUser,
    updateUser,
    deleteUser,
  };
}
