import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slice/userAuthSlice";


const LogOut = () => {
  const LOGOUT_API = import.meta.env.VITE_LOGOUT_API
   
    const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.userAuth.userAuth)
    const navigate = useNavigate()
    const handleLogout =  () => {
      fetch(LOGOUT_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.status === 200) {
          dispatch(logout());
          navigate("/")
        }
        else {
          console.log("Logout Error");
        }
      }).catch((err) => {
        console.log("Logout Error:", err);
        
      })
    }
    
  return (
    <div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white flex items-center justify-center  py-[6px] px-4  rounded">
        Logout
      </button>
    </div>
  );
};

export default LogOut;
