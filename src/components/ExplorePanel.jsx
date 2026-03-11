import ExploreStock from "./ExploreStock";
import { Link } from "react-router";

const ExplorePanel = (props) => {
    return (
        <div className="h-fit w-full text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-800 rounded-xl flex flex-col py-3 md:py-5 px-3 md:px-6">
            <div className="font-bold text-xl md:text-2xl mb-1.5 flex items-center gap-2">
                {props.icon}
                {props.title}
            </div>
            <div className="stocks flex flex-col divide-y divide-woodsmoke-700">
                {Object.entries(props.data).map(([key, value]) => (
                    <Link key={value.symbol} to={`/stock/${value.symbol}`}><ExploreStock data={value} /></Link>
                ))}
            </div>
        </div>

    );
}

export default ExplorePanel;
