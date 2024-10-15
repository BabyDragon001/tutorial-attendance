import React, { useState } from "react";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="WhatsApp number"
            required
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Register
          </button>
          <p className="text-center mt-4">
            Already have an account?{" "}
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
