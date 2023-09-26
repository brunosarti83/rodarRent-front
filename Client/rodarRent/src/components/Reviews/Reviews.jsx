import React from "react";
import Review from "../Review/Review";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../helpers/routes";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../helpers/storage";

const Reviews = () => {
  const navigate = useNavigate();
  const loggedIn = getLocalStorage("isLoggedIn");
  const [loading, setLoading] = useState(true);
  const [dataReview, setDataReview] = useState([]);
  const [activeButton, setActiveButton] = useState("all");

  const fetchData = (order) => {
    axios
      .get(`${API_BASE_URL}/review?order=${order}`)
      .then((response) => {
        setDataReview(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  useEffect(() => {
    loading || setLoading(true);
    fetchData("date");
  }, []);

  const handleFilter = (order, buttonName) => {
    loading || setLoading(true);
    fetchData(order);
    setActiveButton(buttonName);
  };
  const review = () => {
    loggedIn ? navigate("/review") : navigate("/login");
  };

  const countReviews = dataReview.length;
  let sumRating = 0;
  dataReview.map((rev) => (sumRating += rev.rating));
  let promRating = sumRating > 0 ? (sumRating / countReviews).toFixed(2) : "";

  return (
    <div className="w-full md:w-3/5">
      {loading ? (
        <div className="flex justify-center items-center m-14">
          <Loader />
        </div>
      ) : (
        <div className="w-full cursor-default flex flex-col overflow-x-hidden transition duration-300 dark:bg-slate-900 dark:text-gray-100">
          <div className="flex flex-wrap p-2 md:p-8 font-poppins text-sm m-4 items-center justify-center">
            <svg
              className="w-4 h-4 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {promRating}
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {`${countReviews} reviews`}
            </span>
            <div className="flex p-1 md:p-4">
              <button
                name="all"
                onClick={() => handleFilter("date", "all")}
                disabled={activeButton === "all" ? true : false}
                className={
                  activeButton === "all"
                    ? "underline font-bold md:p-4 p-2"
                    : "p-2 md:p-4 transition ease-in-out delay-150 hover:scale-105"
                }
              >
                All Reviews
              </button>
              <button
                name="positives"
                onClick={() => handleFilter("desc", "positives")}
                disabled={activeButton === "positives" ? true : false}
                className={
                  activeButton === "positives"
                    ? "underline font-bold md:p-4 p-2"
                    : "p-2 md:p-4 transition ease-in-out delay-150 hover:scale-105"
                }
              >
                Positives Reviews
              </button>
              <button
                name="negatives"
                onClick={() => handleFilter("asc", "negatives")}
                disabled={activeButton === "negatives" ? true : false}
                className={
                  activeButton === "negatives"
                    ? "underline font-bold md:p-4 p-2"
                    : "p-2 md:p-4 transition ease-in-out delay-150 hover:scale-105"
                }
              >
                Negatives Reviews
              </button>
            </div>
          </div>
          <div className="">
            {dataReview ? (
              dataReview.map((review) => <Review review={review} />)
            ) : (
              <div>
                There are no reviews yet, would you like to leave us your{" "}
                <button className="underline font-bold" onClick={review}>
                  review
                </button>
                ?
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
