import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", user);
      const { token, user: userData } = res.data;

      // Save token
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/dashboard");
      toast.success("Login successful!");
      console.log("Login successful", userData);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-md p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {/* Email */}
        <input
          type="text"
          name="email"
          placeholder="Enter Email Address"
          required
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />
        {/* Login Button */}
        <button
          className="w-full bg-green-800 text-white font-bold hover:bg-green-600 p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* If not having an account then register */}
        <p className="mt-3 text-center">
          Do not have an account?
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
