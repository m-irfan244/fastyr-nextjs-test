import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER, GET_USERS } from '@/graphql/users';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserForm } from './UserForm';
import { toast } from '@/hooks/use-toast';
import { UserInput } from '@/types/common';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  
  const { refetch } = useQuery(GET_USERS, {
    skip: true 
  });

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: async () => {
      toast({
        title: "Success",
        description: "User created successfully",
      });
      setOpen(false);
      try {
        await refetch();
      } catch (error) {
        console.error('Failed to refetch users:', error);
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create user: ${error.message}`,
      });
    },
  });

  const handleSubmit = async (data: UserInput) => {
    try {
      await createUser({
        variables: {
          input: {
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            website: data.website || undefined,
          },
        },
      });
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!loading || !newOpen) {
        setOpen(newOpen);
      }
    }}>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center p-4">
            <LoadingSpinner size="md" />
          </div>
        ) : (
          <UserForm 
            onSubmit={handleSubmit}
            disabled={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
