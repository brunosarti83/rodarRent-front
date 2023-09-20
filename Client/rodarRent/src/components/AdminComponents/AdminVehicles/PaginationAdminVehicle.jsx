const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
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

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={handlePrevPage}>{'<'}</button>
            )}

            {Array.from({ length: Math.min(totalPages, 3) }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}

            {currentPage + 3 < totalPages && (
                <button onClick={handleAdvance}>...</button>
            )}

            {currentPage < totalPages && (
                <button onClick={handleNextPage}>{'>'}</button>
            )}

            {currentPage < totalPages && (
                <button onClick={() => onPageChange(totalPages)}>Última</button>
            )}
        </div>
    );
};

export default Pagination;