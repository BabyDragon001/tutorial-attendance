import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLogin, setLogout } from "../stateManager/UserSlice";
import axiosInstance from "../axiosInstance";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get("/auth/verify-token", {
          withCredentials: true,
        });

        if (response.data.isAuthenticated) {
          dispatch(
            setLogin({ user: response.data.user, token: response.data.token })
          );
        } else {
          dispatch(setLogout());
        }
      } catch (error) {
        console.error("Token verification error:", error);
        dispatch(setLogout());
      }
    };

    verifyToken();
  }, [dispatch]);
};

export default useAuth;
