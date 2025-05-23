
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface RequestsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RequestsPagination: React.FC<RequestsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }} 
            />
          </PaginationItem>
        )}
        
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(pageNum => 
            pageNum <= 2 || 
            pageNum > totalPages - 2 || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          )
          .map((pageNum, i, arr) => {
            // Add ellipsis
            if (i > 0 && arr[i - 1] !== pageNum - 1) {
              return (
                <React.Fragment key={`ellipsis-${pageNum}`}>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === pageNum}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(pageNum);
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                </React.Fragment>
              );
            }
            return (
              <PaginationItem key={`page-${pageNum}`}>
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === pageNum}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNum);
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })
        }
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }} 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default RequestsPagination;
