import React from 'react';
import { NavLink } from 'react-router';
import { FaWallet } from "react-icons/fa";
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
    <nav className="bg-woodsmoke-900 bg-cover font-body p-4 md:p-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-mercury-200 text-lg md:text-4xl font-logo font-normal">
            <NavLink to="/" className="hover:text-transparent hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-san-marino-500 hover:bg-clip-text text-mercury-200 transition-all duration-300 ease-in-out">
              Finstox
            </NavLink>
          </div>
        </div>

        <ul
          className={`max-h-[400px] opacity-100 md:max-h-none md:opacity-100 transition-all duration-500 ease-in-out overflow-hidden md:flex flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0 justify-start md:justify-end items-start md:items-center text-sm md:text-lg lg:text-xl font-body font-bold text-mercury-200 w-full md:w-auto mt-4 md:mt-0`}
        >
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
              <FaWallet />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? 'text-san-marino-400 opacity-100'
                  : 'navbar-link opacity-50 hover:opacity-100 transition-allduration-300 ease-in-out'
              }
            >
              Login
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
    )
}

export default Navbar;


