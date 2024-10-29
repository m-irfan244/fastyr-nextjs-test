'use client';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/graphql/users';
import { UserList } from '@/components/users/UserList';
import { UsersResponse } from '@/types/common';
import { CreateUserDialog } from '@/components/users/CreateUserDialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function UsersPage() {
  const { data, loading, error } = useQuery<UsersResponse>(GET_USERS);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <CreateUserDialog />
      </div>
      <UserList users={data?.users.data || []} />
    </div>
  );
}