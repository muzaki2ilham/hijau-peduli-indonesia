
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from '../../hooks/types';
import { UserStatsLoader } from './UserStatsLoader';
import { format } from 'date-fns';

interface UserRowProps {
  user: UserProfile;
}

export const UserRow = ({ user }: UserRowProps) => {
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <TableRow>
      <TableCell>{user.id.substring(0, 8)}</TableCell>
      <TableCell className="font-medium">{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>{formatDate(user.created_at)}</TableCell>
      <TableCell>
        <UserStatsLoader userId={user.id} type="complaints" />
      </TableCell>
      <TableCell>
        <UserStatsLoader userId={user.id} type="requests" />
      </TableCell>
    </TableRow>
  );
};
