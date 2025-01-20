import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface IProps {
  data: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export function CustomPagination(props: IProps) {
  const { data, onPageChange } = props;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= data.totalPages) {
      onPageChange(newPage);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (data.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= data.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (data.page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(data.totalPages);
      } else if (data.page > data.totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = data.totalPages - 3; i <= data.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = data.page - 1; i <= data.page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(data.totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="my-4 flex items-center justify-between border-y bg-slate-100 px-4 py-2">
      <h1 className="flex items-center gap-1">
        Total <span>{data.total}</span>
      </h1>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => handlePageChange(data.page - 1)} />
            </PaginationItem>
            {getPageNumbers().map((pageNum, index) =>
              pageNum === '...' ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${pageNum}`}>
                  <button
                    className={`${
                      pageNum === data.page ? 'bg-slate-900 text-white' : 'border border-slate-800'
                    } size-8 rounded-md font-semibold`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof pageNum === 'number') {
                        handlePageChange(pageNum);
                      }
                    }}
                  >
                    {pageNum}
                  </button>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext href="#" onClick={() => handlePageChange(data.page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
