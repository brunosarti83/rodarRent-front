import React from "react";
import Review from "../Review/Review";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../helpers/routes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = () => {
  const [dataReview, setDataReview] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/review?order=date`)
      .then((response) => {
        console.log(response.data);
        setDataReview(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  const handlePositives = ()=>{
    let countPostives = 0;
    axios.get(`${API_BASE_URL}/review?order=desc`)
      .then((response) => {
        console.log(response.data);
        setDataReview(response.data);
        countPostives = response.data.length
        toast.info(`${countPostives} positive reviews were filtered`)
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
    
  }
  const handleNegatives = ()=>{
    let countNegatives = 0;
    axios.get(`${API_BASE_URL}/review?order=asc`)
      .then((response) => {
        console.log(response.data);
        setDataReview(response.data);
        countNegatives = response.data.length
        toast.info(`${countNegatives} negatives reviews were filtered`)
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }

  const countReviews = dataReview.length;
  let sumRating = 0;
  dataReview.map((rev) => (sumRating += rev.rating));
  const promRating = (sumRating / countReviews).toFixed(2);

  return (
    <div className="cursor-default p-4 flex flex-col transition duration-300 dark:bg-slate-900 dark:text-gray-100">
      <div className="font-poppins text-sm p-4 m-4 flex items-center">
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{promRating}</p>
        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
        <span
          className="text-sm font-medium text-gray-900 underline dark:text-white"
        >
          {`${countReviews} reviews`}
        </span>
        <div className="flex pl-4">
        <button onClick={handlePositives} className="pl-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"><img width="30" height="30" src="https://img.icons8.com/ios/50/thumb-up--v1.png" alt="thumb-up--v1"/></button>
        <button onClick={handleNegatives} className="pl-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"><img width="30" height="30" src="https://img.icons8.com/ios/50/thumbs-down.png" alt="thumbs-down"/></button>
        </div>
      </div>
      <div>
        {dataReview.map((review) => (
          <Review review={review} />
        ))}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Reviews;
