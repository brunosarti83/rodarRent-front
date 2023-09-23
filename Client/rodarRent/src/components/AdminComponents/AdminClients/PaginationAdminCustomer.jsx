const PaginationAdminCustomer = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <li
        key={number}
        className={`page-item${number === currentPage ? " active" : ""}`}
      >
        <button className="page-link" onClick={() => onPageChange(number)}>
          {number}
        </button>
      </li>
    ));
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

export default PaginationAdminCustomer;