import { React, use, useEffect, useState } from "react";
import { useParams } from "react-router";
import transition from "../transition";
import TradingViewWidget from "../components/TradingViewWidget";

const Stock = () => {
    const params = useParams();
    const symbol = params.symbol;
    
    
    const [stock, setStock] = useState("");

    useEffect(() => {
        
        const apiCall = async () => {
            //const response = await fetch(`/api/stock?symbol=${symbol}`);
            //const data = await response.json();
            //setStock(data.sName);
            setStock("Eternal")
        }
        apiCall();
    }, [symbol]);

    return (
        
        <div className="flex justify-between bg-woodsmoke-950 h-lvh font-body">
            <div className="flex-col w-full max-h-4/5 pl-48 py-12 mx-12">    
                <div className="flex align-center">
                    <div>
                        <img className="w-24 rounded-lg mr-8" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEXMIC7////MHizIAADFAADjnaDJABTJABDJAAvLEyXKDiHKABjfio713N334+T+/Pzuw8XOMz3ac3jjmZ3YaW7mpajy09XrurzehIj78vPWX2X57O3OLjnnq67POELqtbfUVFvRRk3cfIDvysvgkZRwo2MTAAABl0lEQVRIie1XyXKrMBBUS4A2QJgYsAy22f7/G9PEVXYOySHcXj36gEYz05pFKhAC6UmKP0KeUojU/JlHpknFsIO3xRS7eGIv7cCBA/8mpHX7eK6+/cCU7gscvbfbzFKSwm0Tb5S2QrWoFDWZdt9eN/L+kRMX5/PqMXqRp+esqaYkX85uuhWxqE0OtM1g5qVtvjFtjQ2lKrfhLICV0qMD+qRAoE5+Oahqe7bmTbwUC81jhZAHFAMJLRCLgF5dp0QB9QO45TPQFMD0DumSD0by1CctwhXoNBNIIpakXnouMDJVx4TKhEJtX0S9ArMioVYFStrulGcLpCvKtQH8AyFj5E4xwvVF9MyhutZ0zllfQydF8jQxiwjNIIFN7RMb0CYlwqtGO+JZewQ7EU1BJ9bkuJyI6G7PHgEXKukyv/bT1qEnCjX27NlJl7FSVSzVGntfx9A1od0yLCe3kDn79z5atUELqwehpTDKi0wZ4ZSRNsu8p4lRjJRaDNnPJ0/++hV6Wn63Hzhw4L/C7ovu7qv17sv8rt+He4pPCPcV/XGQRsAAAAAASUVORK5CYII=" alt="stock" />
                    </div>
                    <div className="flex-col w-full">
                        <div className="stockname text-4xl text-mercury-200">
                            {stock}
                        </div>
                        <div className="stockprice text-2xl text-mercury-400">
                            216.45 INR 
                        </div>
                        <div className="onedaychange text-xl text-emerald-400 mb-12">
                            +1.20 INR (+0.5%)
                        </div>
                    </div>
                </div>
                <TradingViewWidget symbol={symbol}/>
            </div>
            <div className="trading-buttons pr-48 py-12 flex-col font-body font-bold">
                <div className="buybutton bg-emerald-500 text-3xl text-mercury-200 rounded-lg px-48 py-6 my-4 transition-colors duration-300
                                hover:bg-emerald-600">Buy</div>
                <div className="sellbutton bg-amaranth-500 text-3xl text-mercury-200 rounded-lg px-48 py-6 my-4 transition-colors duration-300
                                hover:bg-amaranth-600">Sell</div>
            </div>

        </div>
    )
}

export default transition(Stock);