import { ChevronLeft, ChevronRight } from 'lucide-react';

import type {
  RequestStatus,
  UserPagination as UserPaginationMeta
} from './types';

const pageSizeOptions = [5, 10, 20, 50];

type UserPaginationProps = {
  listStatus: RequestStatus;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  pagination: UserPaginationMeta;
};

export const UserPagination = ({
  listStatus,
  onLimitChange,
  onPageChange,
  pagination
}: UserPaginationProps) => {
  const isLoading = listStatus === 'loading';
  const firstItem =
    pagination.totalItems === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1;
  const lastItem = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems
  );

  return (
    <div className="pagination-bar">
      <p className="pagination-info">
        Showing {firstItem}-{lastItem} of {pagination.totalItems}
      </p>

      <div className="pagination-controls">
        <label className="pagination-size">
          Rows
          <select
            aria-label="Rows per page"
            disabled={isLoading}
            onChange={(event) => onLimitChange(Number(event.target.value))}
            value={pagination.limit}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </label>

        <div className="pagination-stepper">
          <button
            aria-label="Previous page"
            className="icon-button"
            disabled={isLoading || !pagination.hasPreviousPage}
            onClick={() => onPageChange(pagination.page - 1)}
            type="button"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="pagination-page">
            {pagination.page} / {pagination.totalPages}
          </span>

          <button
            aria-label="Next page"
            className="icon-button"
            disabled={isLoading || !pagination.hasNextPage}
            onClick={() => onPageChange(pagination.page + 1)}
            type="button"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
