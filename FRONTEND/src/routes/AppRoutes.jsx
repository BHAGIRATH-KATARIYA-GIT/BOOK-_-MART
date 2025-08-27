import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Notes from "../pages/Notes";
import Protect from "../utils/Protect";
import Login from "../pages/Login";
import SignUpForm from "../pages/SignUpForm";
import LogOut from "../components/LogOut";
import Books from "../pages/Books";
import Blogs from "../pages/Blogs";
import Upload from "../pages/Upload";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/userAuthSlice";

const AppRoutes = () => {
  const PROTECT_API = import.meta.env.VITE_PROTECT_API;

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.userAuth.userAuth);

  useEffect(() => {
    fetch(PROTECT_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) dispatch(login());
        else dispatch(logout());
      })
      .catch((err) => {
        console.log("Error");
        console.log(err);
        dispatch(logout());
      });
  }, [dispatch]);

  return (
    <Routes>
      {/* Unauthorized Routes */}

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route element={<Protect />}>
          <Route path="/books" element={<Books />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <SignUpForm />}
      />
      <Route path="/logout" element={<LogOut />} />
    </Routes>
  );
};

export default AppRoutes;
