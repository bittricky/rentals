import React from "react";
import { Pagination } from "../../../../components";

interface Props {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export const ListingsPagination = ({ total, page, limit, setPage }: Props) => {
  return (
    <Pagination
      currentPage={page}
      totalCount={total}
      pageSize={limit}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};

ListingsPagination.displayName = "ListingsPagination";
