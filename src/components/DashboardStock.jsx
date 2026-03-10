import React from "react";
import API_BASE from "../apiConfig";

const DashboardStock = (props) => {
    const totalBuyPrice = props.data.totalBuyPrice;
    const currentPrice = props.data.currentPrice * props.data.quantity;
    const change = props.data.change;
    const changePercent = props.data.changePercent;
    const positive = props.data.positive;

    return (
        <div className="text-xs md:text-sm flex h-16 md:h-20 justify-between font-body font-bold text-mercury-200 hover:bg-woodsmoke-700 rounded-lg transition-colors duration-200 px-2 md:px-5 my-1">
            <div className="imagecontainer flex items-center">
                <img className="w-9 md:w-12 rounded-md mr-2" src={`${API_BASE}/logos/${props.data.symbol}.jpg`} alt="stock" />
                <div className="stockname w-fit pr-2 md:pr-3 font-regular">
                    {props.data.name} 
                    <span className="text-mercury-400 font-semibold tracking-wide font-mono block text-xs">{props.data.symbol}</span>
                </div>
            </div>
            
            <div className="price flex flex-col justify-center items-end text-mercury-400 tabular-nums">
                <div className="md:text-lg text-sm">{currentPrice.toFixed(2)}</div>
                <div className={`onedaychange text-xs md:text-xs text-nowrap ${positive ? "text-emerald-400" : "text-amaranth-500"}`}>
                    {positive ? "+" : "-"}
                    {change.toFixed(2)}
                    &nbsp;INR&nbsp;
                    ({positive ? "+" : "-"}
                    {changePercent.toFixed(2)}%)
                </div>
            </div>
        </div>
    )
}

export default DashboardStock;

