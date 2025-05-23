
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { UserProfile } from '../../hooks/types';
import { UserRow } from './UserRow';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface UsersTableProps {
  users: UserProfile[];
  loading: boolean;
}

export const UsersTable = ({ users, loading }: UsersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    console.log("UsersTable rendered with users:", users?.length || 0);
  }, [users]);
  
  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Limit displayed page numbers to avoid cluttering
  const renderPageNumbers = () => {
    let pagesToShow = [];
    
    if (totalPages <= 5) {
      // Show all pages if total is 5 or less
      pagesToShow = pageNumbers;
    } else {
      // Always include first page
      pagesToShow.push(1);
      
      if (currentPage > 3) {
        pagesToShow.push(null); // null represents ellipsis
      }
      
      // Pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pagesToShow.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pagesToShow.push(null); // ellipsis
      }
      
      // Always include last page
      pagesToShow.push(totalPages);
    }
    
    return pagesToShow;
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Terdaftar</TableHead>
            <TableHead>Pengaduan</TableHead>
            <TableHead>Permohonan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Belum ada pengguna
              </TableCell>
            </TableRow>
          ) : (
            currentUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
            )}
            
            {renderPageNumbers().map((page, index) => (
              page === null ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page as number);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
