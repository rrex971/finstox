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
            <div className="flex font-body justify-center pt-8 md:pt-24">
                <div className="w-11/12 md:w-5/6  text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col items-start py-4 md:py-16 px-4 md:px-16">
                    <div className="font-bold text-4xl mb-4 md:mb-12">Active Total PnL</div>
                    <div className="stocks grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-y-4 md:gap-x-4 md:gap-y-0 justify-evenly font-bold divide-y md:divide-x md:divide-y-0 divide-dashed divide-woodsmoke-700">
                        <div className="totalInvested text-lg md:text-2xl">
                            Total Invested
                            <span className="block text-2xl md:text-4xl">{holdings.total.totalInvested.toFixed(2)}</span>
                        </div>
                        <div className="currentAmount text-lg md:text-2xl">
                            Current Amount
                            <span className="block text-2xl md:text-4xl">{holdings.total.totalCurrent.toFixed(2)}</span>
                        </div>
                        <div className={`onedaychange text-2xl md:text-4xl text-nowrap ${holdings.total.totalChange >= 0 ? "text-emerald-400" : "text-amaranth-500"}`}>
                            Total PnL
                            <span className="block text-2xl md:text-4xl">
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
            <div className="flex font-body justify-center pb-16 md:pb-24">
                <div className="w-11/12 md:w-5/6  text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col py-4 md:py-16 px-4 md:px-16">
                    <div className="font-bold text-4xl mb-4 md:mb-12">Holdings</div>
                    <div className="stocks flex flex-col divide-y divide-woodsmoke-700">
                    { holdings.holdings.length !== 0 ?
                        holdings.holdings.map(stock => (
                            <Link to={`/stock/${stock.symbol}`}><DashboardStock key={stock.symbol} data={stock} /></Link>
                        )) : 
                        <div className="text-xl italic text-mercury-800">No stock holdings</div>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

