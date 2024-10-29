'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { GET_USER, UPDATE_USER, DELETE_USER, GET_USERS } from '@/graphql/users';
import { Button } from '@/components/ui/button';
import { User } from '@/types/common';
import { UserForm } from '@/components/users/UserForm';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { data, loading } = useQuery(GET_USER, {
    variables: { id: userId },
  });
  const { refetch } = useQuery(GET_USERS, {
    skip: true 
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) return <LoadingSpinner />;
  if (!data?.user) return <div>User not found</div>;

  const handleUpdate = async (userData: Partial<User>) => {
    try {
      await updateUser({
        variables: {
          id: userId,
          input: userData,
        },
      });
      await refetch();
      router.refresh();
      router.push('/users');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser({
        variables: { id: userId },
      });
      router.push('/users');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Details</h1>
        <Button variant="destructive" onClick={handleDelete}>
          Delete User
        </Button>
      </div>
      <UserForm user={data.user} onSubmit={handleUpdate}  />
    </div>
  );
}