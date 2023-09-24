import React from "react";

const PaginationAdminCustomer = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleAdvance = () => {
    if (currentPage + 3 <= totalPages) {
      onPageChange(currentPage + 3);
    } else {
      onPageChange(totalPages);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleGoToStart = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handleGoToEnd = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (currentPage > 1) {
      buttons.push(
        <div className="flex gap-1" key="pageControlsStart">
          <button
            className="cursor-pointer px-3 drop-shadow-lg border border-gray-300 rounded-lg"
            onClick={handleGoToStart}
          >
            {"<<"}
          </button>
          <button
            className="cursor-pointer px-3 drop-shadow-lg border border-gray-300 rounded-lg"
            onClick={handlePrevPage}
          >
            {"<"}
          </button>
        </div>
      );
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);

    for (let page = start; page <= end; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg ${
            currentPage === page ? "font-semibold text-white bg-blue drop-shadow-lg" : "font-normal"
          }`}
        >
          {page}
        </button>
      );
    }

    if (currentPage + 3 < totalPages) {
      buttons.push(
        <button
          key="advance"
          className="cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg"
          onClick={handleAdvance}
        >
          ...
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <div className="flex gap-1" key="pageControlsEnd">
          <button
            className="cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg"
            onClick={handleNextPage}
          >
            {">"}
          </button>
          <button
            className="cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg"
            onClick={handleGoToEnd}
          >
            {">>"}
          </button>
        </div>
      );
    }

    return buttons;
  };

  return (
    <div className="w-1/5 pt-5 flex justify-evenly">
      {renderPageButtons()}
    </div>
  );
};

export default PaginationAdminCustomer;
