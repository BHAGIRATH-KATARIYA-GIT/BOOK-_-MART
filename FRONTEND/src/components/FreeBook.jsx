import React from "react";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cart from "./Cart";
import getBooksApi from "../api/book.api.js";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const FreeBook = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    getBooksApi()
      .then((res) => {
        setBooks(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
    
    const freeItems = books.filter((item) => item.price === 0);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 py-12 px-6 flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-3xl text-gray-900 dark:text-white">
          🎁 Free Offer Courses
        </h3>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
          Unlock your learning journey with our handpicked free courses. Expand
          your knowledge without spending a dime. Grab them before the offer
          ends!
        </p>
      </div>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {freeItems.map((item) => (
            <div key={item.id || item.title} className="p-3">
              <Cart item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FreeBook;
