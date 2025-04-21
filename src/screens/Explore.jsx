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
    const [liveTimeout, setLiveTimeout] = useState(null);
    useEffect(() => {
        let cancel = false;
        let timer = null;
        const fetchTopGainers = async () => {
            const response = await fetch(`https://finapi.rrex.cc/getTopGainers`);
            const data = await response.json();
            if (!cancel) {
                setData1(data);
                setLoading1(false);
            }
        }
        const fetchTopLosers = async () => {
            const response = await fetch(`https://finapi.rrex.cc/getTopLosers`);
            const data = await response.json();
            if (!cancel) {
                setData2(data);
                setLoading2(false);
            }
        }
        const apiCall = async () => {
            await fetchTopGainers();
            await fetchTopLosers();
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
            cancel = true;
            if(timer) {
                clearInterval(timer);
            }
        }
    }, []);
    useEffect(() => {
        return () => clearInterval(liveTimeout);
    }, [liveTimeout]);
    return (
        <div className="h-fit min-h-screen text-xl flex flex-col md:flex-row justify-evenly font-body pt-8 md:pt-24">
            {loading1 || loading2 ? <LoadingScreen /> : 
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 mb-24">
                <ExplorePanel title="Top Gainers" data={data1} />
                <ExplorePanel title="Top Losers" data={data2} />
            </div>
        }
            
        </div>
    )
}

export default transition(Explore);
