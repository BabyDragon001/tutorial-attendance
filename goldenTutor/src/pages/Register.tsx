import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";

import OTPVerification from "../components/OTPVerification";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmpassword) {
      return toast.error("Password must match");
    }
    try {
      setLoading(true);
      axiosInstance
        .post("/auth/register", {
          email,
          name,
          password,
          number,
        })
        .then(() => {
          toast.success("Registration successful, please verify your email");
          localStorage.setItem("email", email);
          setLoading(false);
          setOpenModal(true);
          setEmail("");
          setName("");
          setPassword("");
          setconfirmPassword("");
          setNumber("");
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to register");
          setOpenModal(false);
        });
    } catch (error) {
      toast(error as string);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Blur Background when Modal is Open */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>
      )}

      {/* OTP Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-bold text-center mb-4">Enter OTP</h3>
            {/* <InputOTP
              maxLength={4}
              className="flex items-center justify-center mx-auto pl-16"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP> */}
            <OTPVerification />
          </div>
        </div>
      )}

      {/* Registration Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-30">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            value={confirmpassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            placeholder="WhatsApp number"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Registering..." : "Register"}{" "}
            {loading && <div className="animate-spin ml-2 inline-block" />}
          </button>
          <p className="text-center mt-4">
            Already have an account?
            <a href="/" className="text-blue-500">
              {" "}
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
