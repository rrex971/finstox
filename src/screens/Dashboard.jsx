import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import DashboardStock from "../components/DashboardStock";
import LoadingScreen from "./LoadingScreen";

const Dashboard = () => {
    const [holdings, setHoldings] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHoldings = async () => {
            const response = await fetch(`https://finapi.rrex.cc/getHoldings?username=${localStorage.getItem("username")}`);
            const data = await response.json();
            setHoldings(data);
            setLoading(false);
        }
        fetchHoldings();
    }, []);
    if(loading) {
        return <LoadingScreen />
    }
    return (
        <div className="main h-fit min-h-screen flex-col justify-center items-center space-y-4">
            <div className="flex font-body justify-center pt-24">
                <div className="w-5/6 text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col py-16 px-16">
                    <div className="font-bold text-4xl mb-12">Active Total PnL</div>
                    <div className="stocks grid grid-cols-3 gap-x-4 justify-evenly font-bold divide-x divide-dashed divide-woodsmoke-700">
                        <div className="totalInvested text-2xl">
                            Total Invested
                            <span className="block text-4xl">{holdings.total.totalInvested.toFixed(2)}</span>
                        </div>
                        <div className="currentAmount text-2xl">
                            Current Amount
                            <span className="block text-4xl">{holdings.total.totalCurrent.toFixed(2)}</span>
                        </div>
                        <div className={`onedaychange text-4xl text-nowrap ${holdings.total.totalChange >= 0 ? "text-emerald-400" : "text-amaranth-500"}`}>
                            Total PnL
                            <span className="block text-4xl">
                                {holdings.total.totalChange >= 0 ? "+" : "-"}
                                {(Math.abs(holdings.total.totalChange)).toFixed(2)}
                                &nbsp;INR&nbsp;
                                ({holdings.total.totalChange >= 0 ? "+" : "-"}
                                {(Math.abs(holdings.total.totalChangePercent)).toFixed(2)}%)
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex font-body justify-center pb-24">
                <div className="w-5/6 text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col py-16 px-16">
                    <div className="font-bold text-4xl mb-12">Holdings</div>
                    <div className="stocks flex flex-col divide-y divide-woodsmoke-700">
                        {holdings.holdings.map(stock => (
                            <Link to={`/stock/${stock.symbol}`}><DashboardStock key={stock.symbol} data={stock} /></Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

