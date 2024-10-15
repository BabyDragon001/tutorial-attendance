import React, { FormEvent, useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    console.log(email);
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form>
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
            className="w-full p-3 border border-gray-300 rounded mb-6"
          />
          <button
            type="submit"
            onClick={(e) => handleLogin(e)}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
