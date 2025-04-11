interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const visiblePages = 10;
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = start + visiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePages + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination-container d-flex flex-column align-items-center mt-4">
      <div
        className="btn-group flex-wrap justify-content-center mb-3"
        role="group"
      >
        <button
          className="btn btn-link text-decoration-none px-2"
          style={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            color: 'white',
            border: '1px solid white',
            margin: '0 4px',
            borderRadius: '4px',
          }}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`btn btn-link text-decoration-none px-2`}
            style={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              color: currentPage === page ? '#ffc107' : 'white',
              border: '1px solid white',
              margin: '0 4px',
              borderRadius: '4px',
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="btn btn-link text-decoration-none px-2"
          style={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            color: 'white',
            border: '1px solid white',
            margin: '0 4px',
            borderRadius: '4px',
          }}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div className="d-flex align-items-center">
        <label className="me-2" style={{ color: 'white' }}>Results per page:</label>
        <select
          className="form-select w-auto"
          style={{
            backgroundColor: '#1c1c1e',
            color: 'white',
            border: '1px solid white',
            borderRadius: '4px',
          }}
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
