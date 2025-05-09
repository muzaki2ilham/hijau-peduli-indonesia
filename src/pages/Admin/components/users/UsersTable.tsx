
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { UserProfile } from '../../hooks/types';
import { UserRow } from './UserRow';

interface UsersTableProps {
  users: UserProfile[];
  loading: boolean;
}

export const UsersTable = ({ users, loading }: UsersTableProps) => {
  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Terdaftar</TableHead>
          <TableHead>Pengaduan</TableHead>
          <TableHead>Permohonan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Belum ada pengguna
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))
        )}
      </TableBody>
    </Table>
  );
};
