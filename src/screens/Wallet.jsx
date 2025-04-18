import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import { FaX } from "react-icons/fa6";
import GlobalContext from "../GlobalContext";
import { nav } from "motion/react-client";

const Wallet = () => {
    const {navbarRefresh, setNavbarRefresh} = useContext(GlobalContext);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [depositMenuOpen, setDepositMenuOpen] = useState(false);
    const [withdrawMenuOpen, setWithdrawMenuOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [uname, setUname] = useState()
    useEffect(() => {
        const username = localStorage.getItem('username')
        if (username) {
            setLoading(true);
            setRefresh(false);
            setNavbarRefresh(true);
            setUname(username);
            fetch(`https://finapi.rrex.cc/getWallet?username=${username}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setLoading(false);

                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                })
        }
    }, [refresh]);

    const popupVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 1000,
                damping: 100
            },
            duration: 200
        }
    };

    if (loading) {
        return <LoadingScreen />
    } else {
        return (
            <div className="h-fit min-h-screen text-4xl flex font-body justify-center pt-24 pb-24">
                <div className="h-fit text-mercury-200 bg-woodsmoke-900 border-woodsmoke-700 border rounded-xl w-5/6 flex flex-col pt-16 pb-32 px-16 space-y-16">
                    <div className="font-head font-bold pb-4">Wallet</div>
                    <div className="flex justify-between items-center">
                        {error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <div className="font-body">
                                {data ? (
                                    <div className="flex flex-col text-2xl space-x-4">
                                        Your balance is
                                        <span className="block text-6xl font-bold text-mercury-50">₹{data.balance ? (Math.round(data.balance * 100) / 100).toFixed(2) : '0.00'}</span>
                                    </div>
                                ) : (
                                    <div>No balance information available.</div>
                                )}
                            </div>
                        )}
                        <div className="flex flex-col w-1/3 space-x-4">
                            {depositMenuOpen && (
                                <motion.div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-woodsmoke-900 border-woodsmoke-700 border rounded-lg p-4 w-1/2 shadow-2xl"
                                    variants={popupVariants}
                                    initial="hidden"
                                    animate={depositMenuOpen ? "visible" : "hidden"}
                                >
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const amount = parseFloat(e.target.amount.value);
                                        fetch(`https://finapi.rrex.cc/deposit`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                username: uname,
                                                amount: amount
                                            })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                setData(data);
                                                setDepositMenuOpen(false);
                                                setRefresh(true);
                                            })
                                            .catch(error => {
                                                setError(error.message);
                                                setDepositMenuOpen(false);
                                            });
                                    }}>
                                        <div className="flex justify-between items-center">
                                            <label className="text-mercury-200" htmlFor="amount">Deposit amount (₹)</label>
                                            <button className="text-mercury-200 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500" type="button" onClick={() => setDepositMenuOpen(false)}><FaX /></button>
                                        </div>
                                        <input className="mt-8 w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500" type="text" pattern="^\d+(\.\d{1,2})?$" inputMode="decimal" id="amount" />
                                        <div className="flex justify-between items-center">
                                            <button className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500" type="submit">Submit</button>
                                            
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                            <button
                                className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500"
                                type="button"
                                onClick={() => setDepositMenuOpen(true)}
                            >
                                Deposit
                            </button>
                            {withdrawMenuOpen && (
                                <motion.div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-woodsmoke-900 border-woodsmoke-700 border rounded-lg p-4 w-1/2 shadow-2xl"
                                    variants={popupVariants}
                                    initial="hidden"
                                    animate={withdrawMenuOpen ? "visible" : "hidden"}
                                >
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const amount = parseFloat(e.target.amount.value);
                                        fetch(`https://finapi.rrex.cc/withdraw`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                username: uname,
                                                amount: amount
                                            })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                setData(data);
                                                setWithdrawMenuOpen(false);
                                                setRefresh(true);
                                            })
                                            .catch(error => {
                                                setError(error.message);
                                                setWithdrawMenuOpen(false);
                                            });
                                    }}>
                                        <div className="flex justify-between items-center">
                                            <label className="text-mercury-200" htmlFor="amount">Withdraw amount (₹)</label>
                                            <button className="text-mercury-200 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500" type="button" onClick={() => setWithdrawMenuOpen(false)}><FaX /></button>
                                        </div>
                                        <input className="mt-8 w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500" type="text" pattern="^\d+(\.\d{1,2})?$" inputMode="decimal" id="amount" />
                                        <div className="flex justify-between items-center">
                                            <button className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500" type="submit">Submit</button>
                                            
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                            <button
                                className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500"
                                type="button"
                                onClick={() => setWithdrawMenuOpen(true)}
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wallet;



