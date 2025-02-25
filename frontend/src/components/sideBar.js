import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/CloudUpload";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <HomeIcon fontSize="small" />, label: "Home", link: "/" },
    { icon: <UploadIcon fontSize="small" />, label: "Data Upload", link: "/upload" },
    { icon: <TuneIcon fontSize="small" />, label: "Visualize Results", link: "/normalization" },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl flex flex-col justify-between sticky top-0 transform transition-all duration-500">
      {/* Top Section */}
      <div>
        <Link to="../">
          <h1 className="text-2xl font-extrabold px-4 py-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-500">
            AnomalyDetector
          </h1>
        </Link>

        {/* Main Menu */}
        <div className="px-2 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${
                location.pathname === item.link
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg rounded-xl"
                  : "hover:bg-gray-700 hover:bg-opacity-50 rounded-xl"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
                  location.pathname === item.link
                    ? "bg-white bg-opacity-20"
                    : "bg-gray-800"
                }`}
              >
                <span className="text-white">{item.icon}</span>
              </div>
              <span
                className={`transition-all duration-300 ${
                  location.pathname === item.link
                    ? "font-bold text-white"
                    : "text-gray-300"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-4">
        <div className="border-t border-gray-700 mx-4 my-4" />

        <div className="space-y-2">
          <button
            onClick={() => alert("Settings Clicked")}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700 hover:bg-opacity-50 rounded-xl"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800">
              <SettingsIcon className="text-white" />
            </div>
            <span className="text-gray-300">Settings</span>
          </button>

          <Link to="/faq">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700 hover:bg-opacity-50 rounded-xl">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800">
                <TuneIcon className="text-white" />
              </div>
              <span className="text-gray-300">FAQ's</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;