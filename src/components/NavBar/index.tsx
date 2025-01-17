import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

const NavBarComponent = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const localStorageUser = localStorage.getItem("user-information");
  let userInformation;
  if (localStorageUser) {
    userInformation = JSON.parse(localStorageUser);
  }

  if (!userInformation) {
    return <Navigate to={"/login"} />;
  }

  const handlerLogout = async () => {
    if (window.confirm("logout?")) {
      const result = await logout();

      console.log({ result });

      if (result.code === 200) {
        alert("Logout Success!");

        // return <Navigate to={"/login"} />;
        navigate("/login");
      } else {
        alert("Logout Error!");
      }
    }
    return;
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">HRM</span>
          </div>

          {/* Menu - Large screens */}
          <div className="hidden md:flex space-x-4">
            <a
              href="#home"
              className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Report
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen &&
                (userInformation && userInformation.role !== 1 ? (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <a
                      href="/client/add-report"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      Add
                    </a>
                    <a
                      href="/client/list-report"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      List
                    </a>
                  </div>
                ) : (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <a
                      href="/admin/list-report"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      List
                    </a>
                  </div>
                ))}
            </div>

            <button
              className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              onClick={handlerLogout}
            >
              Logout
            </button>
          </div>

          {/* Hamburger Menu - Small screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu - Small screens */}
      {isMenuOpen && (
        <div className="md:hidden">
          <a href="#home" className="block px-4 py-2 text-sm hover:bg-blue-500">
            Home
          </a>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Report
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen &&
              (userInformation && userInformation.role !== 1 ? (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <a
                    href="/client/add-report"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Add
                  </a>
                  <a
                    href="/client/list-report"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    List
                  </a>
                </div>
              ) : (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <a
                    href="/admin/list-report"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    List
                  </a>
                </div>
              ))}
          </div>
          <button
            className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            onClick={handlerLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBarComponent;
