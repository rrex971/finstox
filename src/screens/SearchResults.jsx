import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import transition from "../transition";
import LoadingScreen from "./LoadingScreen";
import ExploreStock from "../components/ExploreStock";


const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let cancel = false;
        const fetchResults = async () => {
            const response = await fetch(`http://localhost:8000/getSearchSuggestionsFull?query=${searchParams.get("q")}`);
            const data = await response.json();
            if (!cancel) {
                setData(data);
                setLoading(false);
            }
        }
        fetchResults();
        return () => {
            cancel = true;
        }
    }, [searchParams.get("q")]);
    return (
        <div className="h-fit min-h-screen text-4xl flex font-body justify-center pt-24 pb-24">
            {loading ? <LoadingScreen /> : (
            <div className="text-mercury-200 bg-woodsmoke-900 border-woodsmoke-700 border rounded-xl w-5/6 flex flex-col py-16 px-16 space-y-16">
                <div className="font-body font-bold pb-4">Search results for "{searchParams.get("q")}"</div>
                <div className="text-2xl flex flex-col divide-y divide-woodsmoke-700">
                    {Object.entries(data.suggestions).map(([key, value]) => (
                        <div key={key}>
                            <Link to={`/stock/${value.symbol}`}><ExploreStock key={value.symbol} data={value} /></Link>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    );
};

export default transition(SearchResults);
