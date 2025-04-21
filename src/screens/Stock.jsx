import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import transition from "../transition";
import TradingViewWidget from "../components/TradingViewWidget";
import LoadingScreen from "./LoadingScreen";
import BuyDialog from "../components/BuyDialog";
import SellDialog from "../components/SellDialog";
import { motion } from "motion/react";
import { NinetyRingWithBg } from "react-svg-spinners";

const Stock = () => {
    const params = useParams();
    const symbol = params.symbol;
    const [liveTimeout, setLiveTimeout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buyDialogOpen, setBuyDialogOpen] = useState(false);
    const [sellDialogOpen, setSellDialogOpen] = useState(false);
    const [showPrediction, setShowPrediction] = useState(false);
    const [predictionData, setPredictionData] = useState(null);
    const [fetchingPrediction, setFetchingPrediction] = useState(false);

    const fetchPredictionData = async () => {
        setFetchingPrediction(true);
        const response = await fetch(`https://finapi.rrex.cc/predict/${symbol}`);
        const data = await response.json();
        setPredictionData(data);
        setShowPrediction(true);
        setFetchingPrediction(false);

    }
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
            const response = await fetch(`https://finapi.rrex.cc/getStock?symbol=${symbol}`);
            const data = await response.json();
            console.log(data);
            setStock(data);
            setLoading(false);
        }
        apiCall();
        fetch("https://finapi.rrex.cc/isMarketOpen")
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
    
    if(loading) {
        return <LoadingScreen />
    }

    return (
        <div className="flex flex-col md:flex-row md:space-x-16 pb-8 md:mx-16 justify-between h-fit min-h-lvh font-body">
            { (buyDialogOpen || sellDialogOpen) && (
                <motion.div
                    className="absolute w-full h-full top-0 left-0 bluroverlay backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                </motion.div>
            )}
            <div className="flex-col w-full px-4 md:px-0 py-8 md:py-12">    
                <div className="flex align-center">
                    <div className="imagecontainer flex justify-center items-center bg-woodsmoke-700 w-fit h-fit rounded-lg mr-4 md:mr-8">
                        <img className="w-16 md:w-24 contain rounded-lg" src={`https://finapi.rrex.cc/logos/${stock.symbol}.jpg`} alt="Stock Logo" />
                    </div>
                    <div className="flex-col w-full">
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <div className="font-semibold stockname text-xl md:text-4xl text-mercury-200">
                                {stock.name}
                            </div>
                            <div className="stocksymbol text-md md:text-lg font-bold text-mercury-400 my-2 md:my-0 md:mx-4 border border-woodsmoke-700 rounded-xl px-2">
                                {stock.symbol}
                            </div>
                        </div>
                        <div className="stockprice text-lg md:text-2xl text-mercury-400">
                            {(Math.round(stock.price * 100) / 100).toFixed(2)}&nbsp;INR&nbsp;
                        </div>
                        <div className={`onedaychange text-md md:text-xl mb-12 ${stock.positive ? "text-emerald-400" : "text-amaranth-500"}`}>
                            {stock.positive ? "+" : "-"}
                            {(Math.round(stock.onedaychange * 100) / 100).toFixed(2)}
                            &nbsp;INR&nbsp;
                            ({stock.positive ? "+" : "-"}
                            {(Math.round(stock.onedaychangepercent * 100) / 100).toFixed(2)}%)
                        </div>
                    </div>
                </div>
                <div className="h-96 w-full md:h-2/3">
                    <TradingViewWidget symbol={symbol}/>
                </div>
            </div>
            <div className="sidebar w-full md:w-1/2 px-4 md:px-0 md:py-12 flex-col space-y-4 font-body font-bold">
                <div 
                    className="buybutton bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-emerald-700 text-3xl text-mercury-200 rounded-lg flex justify-center py-6 transition-colors duration-300
                                hover:bg-emerald-600"
                    onClick={() => setBuyDialogOpen(true)}
                >
                    Buy
                </div>
                <div 
                    className="sellbutton bg-gradient-to-br from-amaranth-400 via-amaranth-500 to-amaranth-600 hover:from-amaranth-500 hover:via-amaranth-600 hover:to-amaranth-700 text-3xl text-mercury-200 rounded-lg flex justify-center py-6 transition-colors duration-300
                                hover:bg-amaranth-600"
                    onClick={() => setSellDialogOpen(true)}
                >
                    Sell
                </div>
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
                <div className={`mt-4 w-full h-fit text-mercury-200 text-xl bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col space-y-4 py-4 px-4 ${fetchingPrediction ? "justify-center items-center" : ""}`}>
                    {!showPrediction ? (
                        fetchingPrediction ? (
                            <NinetyRingWithBg className="my-4" width="50" height="50" color="#FFFFFF" />
                        ) : (
                        <div className="get-prediction-button shadow-xl shadow-woodsmoke-700/50 hover:shadow-fuchsia-600/30 bg-mercury-200 hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-san-marino-500 border border-woodsmoke-700 text-xl text-san-marino-500 hover:text-mercury-200 rounded-lg px-4 py-2 my-2 transition-colors duration-300 cursor-pointer"
                                onClick={fetchPredictionData}
                            >
                                Get AI Prediction
                            </div>
                        )
                    ) : (
                        <>
                            <div className="percent-prediction">
                                <span className="block text-xl text-mercury-200">AI Price Prediction</span>
                                <span className="block text-lg text-mercury-400 ">
                                    Movement in next 7 days:&nbsp;
                                    <span className={`text-${predictionData.predicted_prices[6] > predictionData.predicted_prices[0] ? 'emerald' : 'amaranth'}-500`}>
                                        {predictionData.predicted_prices[6] > predictionData.predicted_prices[0] ? '+' : '-'}
                                        {Math.abs(predictionData.predicted_prices[6] - predictionData.predicted_prices[0]).toFixed(2)}
                                        ({((predictionData.predicted_prices[6] - predictionData.predicted_prices[0]) / predictionData.predicted_prices[0] * 100).toFixed(2)}%)
                                    </span>
                                </span>
                            </div>
                            <div className="forecast-price">
                                <span className="block text-xl text-mercury-200">7-day Forecast</span>
                                <div className="flex space-x-1 flex-wrap text-sm pt-2">
                                    {predictionData.predicted_prices.map((price, index) => (
                                        <div key={index} className="flex py-1 px-1 mb-1 items-center justify-center w-18 rounded-sm border border-woodsmoke-700">
                                            <span className="text-center w-full">{price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="forecast-price">
                                <span className="block text-xl text-mercury-200">AI Verdict</span>
                                <div className={`block text-lg ${predictionData.predicted_prices[6] > predictionData.predicted_prices[0] ? 'text-emerald-500' : 'text-amaranth-500'}`}>
                                    {predictionData.predicted_prices[6] > predictionData.predicted_prices[0] ? 'Worth Buying!' : 'Not Recommended'}
                                </div>
                            </div>
                            <div className="forecast-price">
                                <span className="block text-xl text-mercury-200">Predicted Price Graph</span>
                                <img className="rounded-lg mt-2" src={`https://finapi.rrex.cc/${predictionData.filename}`} alt="stock" />
                            </div>
                        </>
                    )}
                </div>
            </div>
            {buyDialogOpen && <BuyDialog open={buyDialogOpen} onClose={() => setBuyDialogOpen(false)} symbol={stock.symbol} price={stock.price} />}
            {sellDialogOpen && <SellDialog open={sellDialogOpen} onClose={() => setSellDialogOpen(false)} symbol={stock.symbol} price={stock.price} />}
        </div>
    )
}

export default transition(Stock);


