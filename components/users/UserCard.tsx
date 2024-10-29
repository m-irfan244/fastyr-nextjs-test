import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User } from '@/types/common';

interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(user)}
    >
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">{user.email}</p>
          <p className="text-sm text-muted-foreground">{user.phone}</p>
          {user.company && (
            <p className="text-sm text-muted-foreground">{user.company.name}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
