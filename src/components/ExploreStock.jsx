import React from "react";


const ExploreStock = (props) => {
    return (
        <div className="flex h-36 justify-between font-body font-bold text-mercury-200 hover:bg-woodsmoke-700 rounded-lg transition-colors duration-300 px-8 my-2">
            <div className="imagecontainer flex items-center">
                
                <img className="w-16 rounded-lg mr-2" src={`https://finapi.rrex.cc/logos/${props.data.symbol}.jpg`} alt="stock" />
                <div className="stockname w-fit pr-4 font-regular">
                    {props.data.name} 
                    <span className="text-mercury-400 font-normal block">{props.data.symbol}</span>
                </div>
            </div>
            
            <div className="price flex flex-col justify-center items-end text-mercury-400">
                <div className="font-md">{(Math.round(props.data.price * 100) / 100).toFixed(2)}</div>
                <div className={`onedaychange text-sm text-nowrap ${props.data.positive ? "text-emerald-400" : "text-amaranth-500"}`}>
                    {props.data.positive ? "+" : "-"}
                    {(Math.round(props.data.onedaychange * 100) / 100).toFixed(2)}
                    &nbsp;INR&nbsp;
                    ({props.data.positive ? "+" : "-"}
                    {(Math.round(props.data.onedaychangepercent * 100) / 100).toFixed(2)}%)
                </div>
            </div>

        </div>
    )
}

export default ExploreStock;
