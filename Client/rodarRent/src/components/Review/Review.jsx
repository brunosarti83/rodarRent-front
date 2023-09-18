import React from "react";

const Review = ({ rev }) => {
  // Función para renderizar las estrellas del rating
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          className={i <= rating ? 'w-4 h-4 text-yellow-300' : 'w-4 h-4 text-gray-300 dark:text-gray-500'}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  };
  return (
    <div className="font-poppins text-sm p-4 m-4 bg-slate-50 rounded-lg drop-shadow-md border border-gray">
      <h3>{rev.name}</h3>
      <br />
      <p>{rev.dateReview}</p>
      <br />
      <div className="flex items-center space-x-1">{renderRatingStars(rev.rating)}</div>
      <br />
      <p>{rev.review}</p>
      <br />
    </div>
  );
};
export default Review;
