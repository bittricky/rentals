import React from "react";
import { Button, HStack } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <HStack spacing="2" justifyContent="center" p="4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "solid" : "outline"}
          onClick={() => onPageChange(page)}
          isDisabled={currentPage === page}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </HStack>
  );
};

Pagination.displayName = "Pagination";
