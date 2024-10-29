import { useRouter } from 'next/navigation';
import { User } from '@/types/common';
import { UserCard } from './UserCard';

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const router = useRouter();

  const handleUserClick = (user: User) => {
    router.push(`/users/${user.id}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={handleUserClick}
        />
      ))}
    </div>
  );
};