import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (otp.length === 4) {
      handleSubmit();
    }
  }, [otp]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.error("Email not found in localStorage");
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    axiosInstance
      .post("/auth/verify-otp", { email, otp })
      .then(() => {
        navigate("/login");
        toast("Registration Successful");
      })
      .catch((err) => {
        toast("Error registering your account");
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="">
      <OtpInput
        containerStyle={{
          width: "150px",
          paddingBottom: "10px",
          margin: "auto",
        }}
        value={otp}
        onChange={setOtp}
        inputStyle={{
          border: "1px solid black",
          padding: "0.4rem 0.5rem",
          width: "40px",
          borderRadius: "10px",
          color: "black",
        }}
        numInputs={4}
        inputType="text"
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      <div className="flex w-full gap-4">
        <button
          type="submit"
          className="bg-green-600 mx-auto rounded-xl text-white py-2 hover:scale-105 duration-300 w-1/2"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default OTPVerification;
