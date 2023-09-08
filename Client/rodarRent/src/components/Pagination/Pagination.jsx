/* eslint-disable react/prop-types */

const Pagination = ({ vehicles, onPageChange }) => {
  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= vehicles.totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => handleClick(i)}
          className={`cursor-pointer ${
            vehicles.currentPage === i ? "font-semibold" : "font-normal"
          }`}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <div className="flex justify-center space-x-2">
        <ul className="flex space-x-2">{renderPageNumbers()}</ul>
      </div>
    </div>
  );
};

export default Pagination;
