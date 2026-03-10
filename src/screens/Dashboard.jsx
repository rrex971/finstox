import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FaChartPie, FaWallet, FaArrowUp, FaArrowDown, FaBoxOpen } from "react-icons/fa";
import DashboardStock from "../components/DashboardStock";
import LoadingScreen from "./LoadingScreen";
import API_BASE from "../apiConfig";

const StatCard = ({ icon, label, value, sub, color }) => (
    <motion.div
        className="bg-woodsmoke-900 border border-woodsmoke-800 rounded-xl px-4 py-4 flex flex-col gap-0.5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
        <div className="flex items-center gap-2 text-mercury-400 text-xs font-semibold tracking-wide uppercase">
            {icon}
            {label}
        </div>
        <div className={`text-2xl md:text-3xl font-bold tabular-nums ${color || "text-mercury-100"}`}>
            {value}
        </div>
        {sub && <div className="text-sm text-mercury-500 tabular-nums">{sub}</div>}
    </motion.div>
);

const Dashboard = () => {
    const [holdings, setHoldings] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHoldings = async () => {
            const response = await fetch(`${API_BASE}/getHoldings?username=${localStorage.getItem("username")}`);
            const data = await response.json();
            setHoldings(data);
            setLoading(false);
        }
        fetchHoldings();
    }, []);

    if (loading) {
        return <LoadingScreen />
    }

    const { total } = holdings;
    const pnlPositive = total.totalChange >= 0;

    return (
        <div className="min-h-screen font-body px-4 md:px-10 lg:px-14 xl:px-20 pt-6 md:pt-10 pb-12 space-y-5">

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatCard
                    icon={<FaWallet className="text-accent-400" />}
                    label="Total Invested"
                    value={`₹${total.totalInvested.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                />
                <StatCard
                    icon={<FaChartPie className="text-accent-400" />}
                    label="Current Value"
                    value={`₹${total.totalCurrent.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                />
                <StatCard
                    icon={pnlPositive ? <FaArrowUp className="text-emerald-400" /> : <FaArrowDown className="text-amaranth-500" />}
                    label="Total P&L"
                    value={`${pnlPositive ? "+" : "-"}₹${Math.abs(total.totalChange).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    sub={`${pnlPositive ? "+" : "-"}${Math.abs(total.totalChangePercent).toFixed(2)}%`}
                    color={pnlPositive ? "text-emerald-400" : "text-amaranth-500"}
                />
            </div>

            {/* Holdings list */}
            <motion.div
                className="w-full text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-800 rounded-xl flex flex-col py-4 md:py-6 px-4 md:px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="font-bold text-xl mb-3 flex items-center gap-2">
                    <FaChartPie className="text-accent-400" />
                    Holdings
                </div>
                <div className="stocks flex flex-col divide-y divide-woodsmoke-700">
                    {holdings.holdings.length !== 0 ?
                        holdings.holdings.map(stock => (
                            <Link key={stock.symbol} to={`/stock/${stock.symbol}`}><DashboardStock data={stock} /></Link>
                        )) :
                        <div className="py-12 flex flex-col items-center gap-3 text-mercury-600">
                            <FaBoxOpen className="text-4xl" />
                            <span className="text-lg">No stock holdings yet</span>
                            <Link to="/explore" className="text-accent-400 hover:text-accent-300 text-sm font-semibold">
                                Browse stocks →
                            </Link>
                        </div>
                    }
                </div>
            </motion.div>
        </div>
    );
}

export default Dashboard;

