import React, { useState } from 'react';

const Pagination = ({ carList, carsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(carList.length / carsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };
  

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => handleClick(i)}
          className={`cursor-pointer ${
            currentPage === i ? 'font-semibold' : 'font-normal'
          }`}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;

  return (
    <div>
      <div className="flex justify-center space-x-2">
        <ul className="flex space-x-2">{renderPageNumbers()}</ul>
      </div>
    </div>
  );
};

export default Pagination;
