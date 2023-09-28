import React from "react";

const Review = ({ review }) => {
      const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const fechaObjeto = new Date(review.updatedAt);
      const diaSemana = diasSemana[fechaObjeto.getDay()];
      const dia = fechaObjeto.getDate().toString().padStart(2, '0');
      const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0');
      const año = fechaObjeto.getFullYear();
      const horas = fechaObjeto.getHours().toString().padStart(2, '0');
      const minutos = fechaObjeto.getMinutes().toString().padStart(2, '0');
      const segundos = fechaObjeto.getSeconds().toString().padStart(2, '0');
      
      const fechaFormateada = `${diaSemana} ${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;

  // Función para renderizar las estrellas del rating
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          className={i <= rating ? 'w-4 h-4 text-yellow-300' : 'w-4 h-4 text-gray-300 dark:text-white'}
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
    <div data-aos="fade-left" className="font-poppins text-sm p-4 m-4 bg-slate-50 rounded-lg drop-shadow-md border border-gray dark:bg-slate-900 duration-300 text-gray-900 dark:text-white">
      <h3>{review.Customer ? review.Customer.name : "Anonymous"}</h3>
      <br />
      <p>{fechaFormateada}</p>
      <br />
      <div className="flex items-center space-x-1">{renderRatingStars(review.rating)}</div>
      <br />
      <p>{review.review}</p>
      <br />
    </div>
  );
};
export default Review;
