import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";

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
      return toast.error("password must match");
    }
    try {
      setLoading(true);
      const res = axiosInstance
        .post(
          "/auth/register",
          JSON.stringify({ email, name, password, number })
        )
        .then(() => {
          toast.success("Registration successful, please verify your email");
          setLoading(false);
          setOpenModal(true);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form>
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
            onClick={(e) => handleRegister(e)}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register{loading ? "ing.." : ""}
          </button>
          <p className="text-center mt-4">
            Already have an account?
            <a href="/" className="text-blue-500">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
