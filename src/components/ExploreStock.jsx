import React from "react";


const ExploreStock = (props) => {
    return (
        <div className="flex h-36 justify-between font-body font-bold text-mercury-200 border-woodsmoke-700 border-b py-8 px-4">
            <div className="imagecontainer flex items-center">
                
                <img className="w-16 rounded-lg mr-2" src={`http://localhost:8000/logos/${props.data.symbol}.jpg`} alt="stock" />
                <div className="stockname pr-16 font-regular">
                    {props.data.name} 
                    <span className="text-mercury-400 font-normal block">{props.data.symbol}</span>
                </div>
            </div>
            
            <div className="price flex flex-col justify-center text-mercury-400 w-fit">
                <div>{(Math.round(props.data.price * 100) / 100).toFixed(2)}</div>
                <div className={`onedaychange text-sm ${props.data.positive ? "text-emerald-400" : "text-amaranth-500"}`}>
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
