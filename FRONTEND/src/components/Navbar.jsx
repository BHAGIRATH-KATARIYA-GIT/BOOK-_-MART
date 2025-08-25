import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import LogOut from "./LogOut";
import { useSelector } from "react-redux";

const Navbar = () => {

  const authUser = useSelector((state) => state.userAuth.userAuth);

  const [sticky, setSticky] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // console.log(authUser);

  const element = document.documentElement;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      element.classList.add("light");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const navItem = (
    <>
      <li>
        <NavLink to="/" className={`hover:bg-gray-800 hover:text-white mx-1`}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          className={`hover:bg-gray-800 hover:text-white mx-1`}
        >
          Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/notes"
          className={`hover:bg-gray-800 hover:text-white mx-1`}
        >
          Notes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/upload"
          className={`hover:bg-gray-800 hover:text-white mx-1`}
        >
          Upload
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={`hover:bg-gray-800 hover:text-white mx-1`}
        >
          Blogs
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar text-black dark:text-white bg-white dark:bg-[rgb(16,24,40)] shadow-sm md:px-14 fixed top-0 left-0 right-0 z-50 ${
        sticky ? "" : ""
      } flex gap-4`}
    >
      <div className=" w-[30%] navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content dark:bg-gray-800 bg-white text-black dark:text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">BookStore</a>
      </div>

      <div className=" w-[40%] mx-auto md:block hidden relative ">
        <label className="input bg-white dark:bg-gray-800 border border-black dark:border-gray-600 shadow-sm">
          <svg
            className="h-10 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow w-2xl outline-none "
            placeholder="Search"
          />
          <kbd className="kbd kbd-sm bg-white dark:bg-gray-800">⌘</kbd>
          <kbd className="kbd kbd-sm bg-white dark:bg-gray-800">K</kbd>
        </label>
      </div>

      <div className=" navbar-end w-[80%]">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>
        <div className="mx-4">
          <label className="swap swap-rotate relative md:mx-4 md:right-3">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>


        {authUser ? (
          <LogOut />
        ) : (
          <NavLink to="/login">
            <button className="bg-red-500 hover:bg-red-700 text-white flex items-center justify-center  py-[6px] px-4  rounded">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
