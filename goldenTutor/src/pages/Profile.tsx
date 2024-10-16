import React from "react";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogout } from "../stateManager/UserSlice";

const Profile = () => {
  const dispatch = useDispatch();
  function handleLogout() {
    axiosInstance.delete("/auth/logout");
    localStorage.removeItem("token");
    window.location.href = "/";
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
