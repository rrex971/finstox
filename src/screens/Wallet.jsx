import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import { FaX } from "react-icons/fa6";

const Wallet = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [depositMenuOpen, setDepositMenuOpen] = useState(false);
    const [withdrawMenuOpen, setWithdrawMenuOpen] = useState(false);
    const [uname, setUname] = useState()
    useEffect(() => {
        const username = localStorage.getItem('username')
        if (username) {
            setUname(username);
            fetch(`http://localhost:8000/getWallet?username=${username}`)
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
    }, []);

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
                stiffness: 500,
                damping: 20
            },
            duration: 200
        }
    };

    if (loading) {
        return <LoadingScreen />
    } else {
        return (
            <div className="h-fit min-h-screen text-4xl flex font-body justify-center pt-24 pb-24">
                <div className="text-mercury-200 bg-woodsmoke-900 border-woodsmoke-700 border rounded-xl w-5/6 flex flex-col py-16 px-16 space-y-16">
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
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-woodsmoke-900 border-woodsmoke-700 border rounded-lg p-4 shadow-3xl/70 w-1/2"
                                    variants={popupVariants}
                                    initial="hidden"
                                    animate={depositMenuOpen ? "visible" : "hidden"}
                                >
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const amount = parseFloat(e.target.amount.value);
                                        fetch(`http://localhost:8000/deposit`, {
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
                                        <input className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500" type="number" step="0.01" id="amount" />
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
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-woodsmoke-900 border-woodsmoke-700 border rounded-lg p-4 shadow-3xl/70 w-1/2"
                                    variants={popupVariants}
                                    initial="hidden"
                                    animate={withdrawMenuOpen ? "visible" : "hidden"}
                                >
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const amount = parseFloat(e.target.amount.value);
                                        fetch(`http://localhost:8000/withdraw`, {
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
                                        <input className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500" type="number" step="0.01" id="amount" />
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


