import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/register", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Registered successfully:", res.data);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          required
          className="w-full p-2 border rounded mb-3"
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          required
          className="w-full p-2 border rounded mb-3"
          onChange={handleInputChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          className="w-full p-2 border rounded mb-3"
          onChange={handleInputChange}
        />

        <select
          name="role"
          className="w-full p-2 border rounded mb-3"
          onChange={handleInputChange}
          value={user.role}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="w-full bg-blue-500 text-white font-bold hover:bg-blue-700 p-2 rounded"
          onClick={handleSubmit}
        >
          Register
        </button>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-800 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
