import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-white text-2xl font-bold tracking-wide"
        >
          QR Generator
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 text-white text-base font-medium">
          <li>
            <Link
              to="/dashboard"
              className="hover:text-indigo-400 transition duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/linkqr"
              className="hover:text-indigo-400 transition duration-200"
            >
              Add QR
            </Link>
          </li>
          <li>
            <Link
              to="/showqr"
              className="hover:text-indigo-400 transition duration-200"
            >
              List QR
            </Link>
          </li>

          <li>
            <button
              className="hover:text-indigo-400 transition duration-200"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </li>
        </ul>

        {/* Mobile nav */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 text-white p-4 space-y-4 absolute left-0 w-full shadow-md">
          <li>
            <Link
              to="/dashboard"
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/linkqr"
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              Add QR
            </Link>
          </li>
          <li>
            <Link
              to="/showqr"
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              List QR
            </Link>
          </li>
          <li>
            <button className="block py-2" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
