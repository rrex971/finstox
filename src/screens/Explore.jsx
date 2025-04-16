import { useEffect, useState } from "react";
import transition from "../transition";
import ExploreStock from "../components/ExploreStock";
import { Link } from "react-router";
import ExplorePanel from "../components/ExplorePanel";
import LoadingScreen from "./LoadingScreen";

const Explore = () => {
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        let cancel = false;
        const fetchTopGainers = async () => {
            const response = await fetch(`http://localhost:8000/getTopGainers`);
            const data = await response.json();
            if (!cancel) {
                setData1(data);
                setLoading1(false);
            }
        }
        const fetchTopLosers = async () => {
            const response = await fetch(`http://localhost:8000/getTopLosers`);
            const data = await response.json();
            if (!cancel) {
                setData2(data);
                setLoading2(false);
            }
        }
        fetchTopGainers();
        fetchTopLosers();
        return () => {
            cancel = true;
        }
    }, []);
    return (
        <div className="h-fit min-h-screen text-xl flex justify-evenly font-body pt-24">
            {loading1 || loading2 ? <LoadingScreen /> : 
            <div className="flex justify-center space-x-8 mb-24">
                <ExplorePanel title="Top Gainers" data={data1} />
                <ExplorePanel title="Top Losers" data={data2} />
            </div>
        }
            
        </div>
    )
}

export default transition(Explore);
