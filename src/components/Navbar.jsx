import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { FaWallet } from "react-icons/fa";
import SearchBar from './SearchBar';

const Navbar = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [data, setData] = useState({"balance" : 0});
    const [error, setError] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('username')
        if (username) {
            fetch(`http://localhost:8000/getWallet?username=${username}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    setError(error.message);
                })
        }
      }, []);



    return (
    <nav className="bg-woodsmoke-900 bg-cover border-b-1 border-woodsmoke-600  font-body p-4 md:p-5 overflow-visible">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-mercury-200 text-lg md:text-4xl font-logo font-normal">
            <NavLink to="/" className="hover:text-transparent hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-san-marino-500 hover:bg-clip-text text-mercury-200 transition-all duration-300 ease-in-out">
              Finstox
            </NavLink>
          </div>
        </div>

        <ul
          className={`h-72 opacity-100 md:max-h-12 md:opacity-100 transition-all duration-500 ease-in-out overflow-visible md:flex flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0 justify-start md:justify-end items-start md:items-center text-sm md:text-lg lg:text-xl font-body font-bold text-mercury-200 w-full md:w-auto mt-4 md:mt-0`}
        >
          {token && (
            <>
              <li>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-san-marino-400 opacity-100'
                      : 'navbar-link opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
                  }
                >
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-san-marino-400 opacity-100'
                      : 'navbar-link opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <SearchBar />
              </li>

              <li>
                <NavLink
                  to="/wallet"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-san-marino-400 opacity-100'
                      : 'navbar-link opacity-50 hover:opacity-100 transition-allduration-300 ease-in-out'
                  }
                >
                  <div className="flex items-center space-x-2">
                    <FaWallet />
                    <span className="text-mercury-200">₹{parseFloat(data.balance).toFixed(2)}</span>
                  </div>
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to={token ? '/logout' : '/login'}
              className={({ isActive }) =>
                isActive
                  ? 'text-san-marino-400 opacity-100'
                  : 'navbar-link opacity-50 hover:opacity-100 transition-allduration-300 ease-in-out'
              }
            >
              {token ? 'Logout' : 'Login'}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    )
}

export default Navbar;

