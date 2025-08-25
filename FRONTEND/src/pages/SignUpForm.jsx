import axios from "axios";

import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../slice/userAuthSlice";
import { useState } from "react";

const SignupForm = () => {
  const SIGNUP_API = import.meta.env.VITE_SIGNUP_API;

  const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.userAuth.userAuth)
  // const [admin, isAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      admin: data.admin,
    };
    console.log(data);
    await axios
      .post(SIGNUP_API, userInfo, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response:", response);
        console.log("Response Data:", response.data);
        dispatch(login());

        navigate("/books");
        alert("User registered successfully");
      })
      .catch((error) => {
        dispatch(logout());
        if (error.response) {
          console.error("Error response from server:", error.response.data);
          alert(`Error: ${error.response.data.message}`);
        }
        console.error("Error registering user:", error);
        alert("Error registering user");
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 dark:border-white/20 transition-colors duration-300">
        <NavLink to="/">
          <img src="../../src/assets/back.png" alt="back" width="30px" />
        </NavLink>

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5 text-[20px]">
            <input
              type="checkbox"
              className="checkbox "
              {...register("admin")}
            />
            <label>admin</label>
          </div>
          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl text-black  bg-white/70 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="ex. john Dea"
              {...register("username", { required: true })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1  text-gray-700 dark:text-gray-300 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border text-black rounded-xl bg-white/70 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 text-black py-2 border rounded-xl bg-white/70 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              {...register("password", { required: true })}
            />
          </div>

          {/* Confirm Password */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition-all duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
