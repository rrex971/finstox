import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router';
import { FaHamburger, FaWallet } from "react-icons/fa";
import SearchBar from './SearchBar';
import GlobalContext from '../GlobalContext';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
    const {navbarRefresh, setNavbarRefresh} = useContext(GlobalContext);
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [data, setData] = useState({"balance" : 0});
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        
        const username = localStorage.getItem('username')
        if (username) {
            fetch(`https://finapi.rrex.cc/getWallet?username=${username}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setNavbarRefresh(false);
                })
                .catch(error => {
                    setError(error.message);
                })
        }
      }, [navbarRefresh]);



    return (
    <nav className="bg-woodsmoke-900 bg-cover border-b-1 border-woodsmoke-700  font-body p-4 md:p-5 overflow-visible">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-mercury-200 text-lg md:text-4xl font-logo font-normal">
            <NavLink to="/" className="hover:text-transparent hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-san-marino-500 hover:bg-clip-text text-mercury-200 transition-all duration-300 ease-in-out">
              Finstox
            </NavLink>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu className='text-mercury-200'/>
          </button>
        </div>

        <ul
          className={`${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100 transition-all duration-300 ease-out overflow-visible md:flex flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0 justify-center md:justify-end items-start md:items-center text-sm md:text-lg lg:text-xl font-body font-medium text-mercury-200 w-full md:w-auto md:mt-0`}
        >
          {token && (
            <>
              <li className='mt-4 md:mt-0'>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-san-marino-400 opacity-100'
                      : 'navbar-link opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
                  }
                  onClick={() => setIsOpen(false)}
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
                  onClick={() => setIsOpen(false)}
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
                      : 'navbar-link opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out'
                  }
                  onClick={() => setIsOpen(false)}
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
                  : 'navbar-link opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out'
              }
              onClick={() => setIsOpen(false)}
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

