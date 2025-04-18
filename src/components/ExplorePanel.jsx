import ExploreStock from "./ExploreStock";
import { Link } from "react-router";

const ExplorePanel = (props) => {
    return (
        <div className="h-fit w-2/5 text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col py-16 px-16 shadow-lg">
            <div className="font-bold text-4xl mb-12">{props.title}</div>
            <div className="stocks flex flex-col divide-y divide-woodsmoke-700">
                {Object.entries(props.data).map(([key, value]) => (
                    <Link to={`/stock/${value.symbol}`}><ExploreStock key={value.symbol} data={value} /></Link>
                ))}
            </div>
        </div>

    );
}

export default ExplorePanel;
