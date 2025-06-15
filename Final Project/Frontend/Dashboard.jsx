import React from "react";
import { FaQrcode, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

function Dashboard() {
  const userName = "User";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {userName} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your QR Codes efficiently from this dashboard.
          </p>
        </div>

        {/* What You Can Do Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What You Can Do
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-center space-x-4 p-4 border rounded-xl">
              <FaQrcode className="text-2xl text-blue-600" />
              <span>
                Create new QR codes for events, products, or anything else.
              </span>
            </li>
            <li className="flex items-center space-x-4 p-4 border rounded-xl">
              <FaEye className="text-2xl text-green-600" />
              <span>View all your existing QR codes in a list format.</span>
            </li>
            <li className="flex items-center space-x-4 p-4 border rounded-xl">
              <FaEdit className="text-2xl text-purple-600" />
              <span>Edit or update QR code metadata or target URLs.</span>
            </li>
            <li className="flex items-center space-x-4 p-4 border rounded-xl">
              <FaTrashAlt className="text-2xl text-red-600" />
              <span>Delete QR codes that are no longer needed.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
