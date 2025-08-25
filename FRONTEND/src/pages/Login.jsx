import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/userAuthSlice";

const Login = () => {
  const LOGIN_API = import.meta.env.VITE_LOGIN_API;
  const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.userAuth.userAuth)

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post(LOGIN_API, userInfo, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("User logged in successfully:", response.data);
        navigate("/books");
        dispatch(login());
        alert("User logged in successfully");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response from server:", error.response.data);
          dispatch(logout());
          alert(`Error: ${error.response.data.message}`);
        }
        console.error("Error logging in user:", error);
        alert("Error logging in user");
      });
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
        <div className="w-full max-w-md p-8 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 dark:border-white/20 transition-colors duration-300">
          <NavLink to="/">
            <img src="../../src/assets/back.png" alt="back" width="30px" />
          </NavLink>

          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Good To See You Again
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition-all duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-3">
            Are you not have a account?{" "}
            <span className="text-blue-400 hover:underline ml-5">
              <NavLink to="/signup">Signup</NavLink>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
