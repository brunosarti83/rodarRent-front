import{ useState } from 'react';

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
          className={`cursor-pointer py-1 px-3 drop-shadow-lg border-none rounded-lg ${
            currentPage === i ? 'font-semibold text-white bg-blue drop-shadow-lg' : 'font-normal'
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
        <ul className="flex space-x-2 font-poppins">{renderPageNumbers()}</ul>
      </div>
    </div>
  );
};

export default Pagination;
