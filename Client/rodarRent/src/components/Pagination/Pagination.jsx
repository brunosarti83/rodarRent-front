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
          className={`cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg ${
            vehicles.currentPage === i
              ? "font-semibold text-white bg-blue drop-shadow-lg"
              : "font-normal"
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
        <ul className="flex space-x-2 font-poppins">{renderPageNumbers()}</ul>
      </div>
    </div>
  );
};

export default Pagination;
