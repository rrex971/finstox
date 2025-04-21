import React from "react";

const DashboardStock = (props) => {
    const totalBuyPrice = props.data.totalBuyPrice;
    const currentPrice = props.data.currentPrice * props.data.quantity;
    const change = props.data.change;
    const changePercent = props.data.changePercent;
    const positive = props.data.positive;

    return (
        <div className="text-sm md:text-xl flex h-24 md:h-36 justify-between font-body font-bold text-mercury-200 hover:bg-woodsmoke-700 rounded-lg transition-colors duration-300 px-4 md:px-8 my-2">
            <div className="imagecontainer flex items-center">
                <img className="w-12 md:w-16 rounded-lg mr-2" src={`https://finapi.rrex.cc/logos/${props.data.symbol}.jpg`} alt="stock" />
                <div className="stockname w-fit pr-2 md:pr-4 font-regular">
                    {props.data.name} 
                    <span className="text-mercury-400 font-normal block">{props.data.symbol}</span>
                </div>
            </div>
            
            <div className="price flex flex-col justify-center items-end text-mercury-400">
                <div className="md:text-2xl text-md">{currentPrice.toFixed(2)}</div>
                <div className={`onedaychange text-sm md:text-base text-nowrap ${positive ? "text-emerald-400" : "text-amaranth-500"}`}>
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

