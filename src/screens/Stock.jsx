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
        "website" : "",
        "industry": ""
    });
    useEffect(() => {
        let timer = null;
        const apiCall = async () => {
            const response = await fetch(`https://api.finstox.rrex.cc/getStock?symbol=${symbol}`);
            const data = await response.json();
            console.log(data);
            setStock(data);
        }
        apiCall();
        fetch("https://api.finstox.rrex.cc/isMarketOpen")
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
                    <div className="imagecontainer flex justify-center items-center bg-woodsmoke-700 w-24 h-24 rounded-lg mr-8">
                        <img className="w-24 h-24 contain rounded-lg" src={`https://api.finstox.rrex.cc/logos/${stock.symbol}.jpg`} alt="Stock Logo" />
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
                <div className="h-fit text-mercury-200 text-xl bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col space-y-4 py-4 px-4">
                    <div className="website-info">
                        <span className="block text-xl text-mercury-200">Website</span>
                        <span className="block text-lg text-mercury-400 underline">
                            <a href={`https://${stock.website}`}>{stock.website}</a>
                        </span>
                    </div>
                    <div className="industry-info">
                        <span className="block text-xl text-mercury-200">Industry</span>
                        <span className="block text-lg text-mercury-400">
                            {stock.industry}
                        </span>
                    </div>
                </div>
                <div className="mt-4 h-fit text-mercury-200 text-xl bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col space-y-4 py-4 px-4">
                    <div className="percent-prediction">
                        <span className="block text-xl text-mercury-200">AI Price Prediction</span>
                        <span className="block text-lg text-mercury-400 ">
                            Movement in next 7 days: <span className="text-emerald-500">+24.50 (+7.14%)</span>
                        </span>
                    </div>
                    <div className="forecast-price">
                        <span className="block text-xl text-mercury-200">7-day Forecast</span>
                        <div className="grid grid-cols-7 text-sm pt-2">
                            <div className="p-2 justify-center items-center w-14 rounded-sm border border-woodsmoke-700">
                                329.4
                            </div>
                            <div className="p-2 justify-center items-center w-14 rounded-sm border border-woodsmoke-700">
                                324.37
                            </div>
                            <div className="p-2 justify-center items-center w-14 rounded-sm border border-woodsmoke-700">
                                333.87
                            </div>
                            <div className="p-2 justify-center items-center w-14 rounded-sm border border-woodsmoke-700">
                                341.1
                            </div>
                            <div className="p-2 justify-center items-center w-14 rounded-sm border border-woodsmoke-700">
                                348.4
                            </div>
                            <div className="p-2 justify-center items-center w-14 rounded-sm border border-woodsmoke-700">
                                354.32
                            </div>
                            <div className="p-2 justify-center items-center w-14 rounded-sm border border-woodsmoke-700">
                                360.55
                            </div>
                        </div>
                    </div>
                    <div className="forecast-price">
                        <span className="block text-xl text-mercury-200">AI Verdict</span>
                        <div className="block text-lg text-emerald-500">
                            Worth Buying!
                        </div>
                            
                    </div>
                </div>
            </div>

        </div>
    )
}

export default transition(Stock);
