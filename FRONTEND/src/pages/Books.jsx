import react from "react";
import Cart from "../components/Cart";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import getBooksApi from "../api/book.api.js";

function Books() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    getBooksApi()
      .then((res) => {
        console.log(res);

        setBook(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="dark:bg-gray-900 bg-white">
        <div className="flex dark:bg-gray-900  flex-col items-center justify-center min-h-[80vh] md:min-h-screen bg-white px-4 text-center">
          {/* Welcome Message */}
          <h1 className="text-4xl font-semibold dark:text-white text-gray-800 px-5 py-4 rounded-md shadow-md mb-6">
            We're delighted to have you{" "}
            <span className="font-bold">Here! :)</span>
          </h1>

          {/* Description Paragraph */}
          <p className="max-w-4xl  text-gray-700 text-lg mb-8 dark:text-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            assumenda? Repellendus, iste corrupti? Tempore laudantium
            repellendus accusamus accusantium sed architecto odio, nisi expedita
            quas quidem nesciunt debitis dolore non aspernatur praesentium
            assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
            animi
          </p>

          {/* Back Button */}
          <NavLink to="/">
            <button className="bg-pink-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-pink-600 transition cursor-pointer">
              Back
            </button>
          </NavLink>
        </div>
        <div className="dark:bg-gray-900 bg-white flex flex-wrap justify-center items-center gap-4 p-4 relative bottom-20 md:bottom-0">
          {book.map((item) => (
            <Cart item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
