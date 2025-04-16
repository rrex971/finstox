import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import transition from "../transition";
import TradingViewWidget from "../components/TradingViewWidget";

const Stock = () => {
    const params = useParams();
    const symbol = params.symbol;
    const [liveTimeout, setLiveTimeout] = useState(null);
    
    const [stock, setStock] = useState({
        "name" : "",
        "symbol" : "",
        "price" : "",
        "onedaychange" : "",
        "onedaychangepercent" : "",
        "positive" : true,
        "logo" : ""
    });
    useEffect(() => {
        let timer = null;
        const apiCall = async () => {
            const response = await fetch(`http://localhost:8000/getStock?symbol=${symbol}`);
            const data = await response.json();
            console.log(data);
            setStock(data);
        }
        apiCall();
        fetch("http://localhost:8000/isMarketOpen")
            .then(response => response.text())
            .then(data => {
                if(data === "true") {
                    timer = setInterval(apiCall, 10000);
                    setLiveTimeout(timer);
                }
            });
        return () => {
            if(timer) {
                clearInterval(timer);
            }
        }
        }, [symbol]);

    useEffect(() => {
        return () => clearInterval(liveTimeout);
    }, [liveTimeout]);

    return (
        
        <div className="flex justify-between bg-woodsmoke-950 h-lvh font-body">
            <div className="flex-col w-full max-h-4/5 pl-48 py-12 mx-12">    
                <div className="flex align-center">
                    <div className="imagecontainer flex justify-center items-center bg-woodsmoke-50 w-24 h-24 rounded-lg mr-8">
                        <img className="contain" src={`http://localhost:8000/logos/${stock.symbol}.jpg`} alt="Stock Logo" />
                    </div>
                    <div className="flex-col w-full">
                        <div className="stockname text-4xl text-mercury-200">
                            {stock.name}
                        </div>
                        <div className="stockprice text-2xl text-mercury-400">
                            {(Math.round(stock.price * 100) / 100).toFixed(2)}
                        </div>
                        <div className="onedaychange text-xl text-emerald-400 mb-12">
                            {stock.positive ? "+" : "-"}
                            {(Math.round(stock.onedaychange * 100) / 100).toFixed(2)}
                            &nbsp;INR&nbsp;
                            ({stock.positive ? "+" : "-"}
                            {(Math.round(stock.onedaychangepercent * 100) / 100).toFixed(2)}%)
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
