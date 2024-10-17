import React from "react";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogout } from "../stateManager/UserSlice";

const Profile = () => {
  const dispatch = useDispatch();
  function handleLogout() {
    const specialCode = localStorage.getItem("specialCode");
    if (specialCode) {
      toast.error("You can't log out while you're still active");
      return;
    }
    axiosInstance.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("specialCode");
    localStorage.removeItem("isPunchedIn");
    toast.error("logout sucessfully");
    dispatch(setLogout());
  }
  return (
    <div>
      Profile
      <button
        className="p-2 rounded-lg bg-primary text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
