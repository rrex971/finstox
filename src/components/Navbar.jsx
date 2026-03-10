import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router';
import { FaWallet, FaCompass, FaChartBar, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import SearchBar from './SearchBar';
import GlobalContext from '../GlobalContext';
import API_BASE from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';

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
            fetch(`${API_BASE}/getWallet?username=${username}`)
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

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-accent-400'
            : 'text-mercury-300 hover:text-mercury-100 transition-colors duration-200';

    const menuVariants = {
        closed: { height: 0, opacity: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
        open: { height: 'auto', opacity: 1, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } }
    };

    return (
        <nav className="bg-woodsmoke-950/90 backdrop-blur-xl border-b border-woodsmoke-800/60 font-body sticky top-0 z-50">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 xl:px-16 py-3 md:py-4">
                <div className="flex justify-between items-center w-full md:w-auto">
                    <NavLink to="/" className="text-mercury-100 text-xl md:text-2xl font-logo font-medium hover:text-accent-400 transition-colors duration-200">
                        Finstox
                    </NavLink>
                    <button className="md:hidden text-mercury-300 hover:text-mercury-100 transition-colors p-1" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Desktop nav */}
                <ul className="hidden md:flex flex-row space-x-6 items-center text-sm font-semibold tracking-wide">
                    {token && (
                        <>
                            <li>
                                <NavLink to="/explore" className={navLinkClass}>
                                    <span className="flex items-center gap-1.5"><FaCompass size={14} /> Explore</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard" className={navLinkClass}>
                                    <span className="flex items-center gap-1.5"><FaChartBar size={14} /> Dashboard</span>
                                </NavLink>
                            </li>
                            <li><SearchBar /></li>
                            <li>
                                <NavLink to="/wallet" className={navLinkClass}>
                                    <span className="flex items-center gap-1.5">
                                        <FaWallet size={14} />
                                        <span className="tabular-nums">₹{parseFloat(data.balance).toFixed(2)}</span>
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        {token ? (
                            <NavLink to="/logout" className="border border-mercury-700 hover:border-mercury-500 text-mercury-300 hover:text-mercury-100 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5">
                                <FaSignOutAlt size={13} /> Logout
                            </NavLink>
                        ) : (
                            <NavLink to="/login" className="bg-accent-500 hover:bg-accent-600 text-mercury-100 px-5 py-1.5 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center gap-1.5">
                                <FaSignInAlt size={13} /> Login
                            </NavLink>
                        )}
                    </li>
                </ul>

                {/* Mobile nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul variants={menuVariants} initial="closed" animate="open" exit="closed" className="md:hidden flex flex-col w-full space-y-4 pt-4 pb-2 text-base font-semibold overflow-hidden">
                            {token && (
                                <>
                                    <li><NavLink to="/explore" className={navLinkClass}><span className="flex items-center gap-2"><FaCompass size={16} /> Explore</span></NavLink></li>
                                    <li><NavLink to="/dashboard" className={navLinkClass}><span className="flex items-center gap-2"><FaChartBar size={16} /> Dashboard</span></NavLink></li>
                                    <li><SearchBar /></li>
                                    <li><NavLink to="/wallet" className={navLinkClass}><span className="flex items-center gap-2"><FaWallet size={16} /> <span className="tabular-nums">₹{parseFloat(data.balance).toFixed(2)}</span></span></NavLink></li>
                                </>
                            )}
                            <li>
                                {token ? (
                                    <NavLink to="/logout" className="border border-mercury-700 text-mercury-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 w-fit">
                                        <FaSignOutAlt size={14} /> Logout
                                    </NavLink>
                                ) : (
                                    <NavLink to="/login" className="bg-accent-500 text-mercury-100 px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 w-fit">
                                        <FaSignInAlt size={14} /> Login
                                    </NavLink>
                                )}
                            </li>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar;

