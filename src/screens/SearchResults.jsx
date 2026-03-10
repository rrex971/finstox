import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import transition from "../transition";
import LoadingScreen from "./LoadingScreen";
import ExploreStock from "../components/ExploreStock";
import API_BASE from "../apiConfig";


const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let cancel = false;
        const fetchResults = async () => {
            const response = await fetch(`${API_BASE}/getSearchSuggestionsFull?query=${searchParams.get("q")}`);
            if (response.ok) {
                const data = await response.json();
                if (!cancel) {
                    setData(data);
                    setLoading(false);
                }
            } else if (response.status === 400) {
                const error = await response.json();
                console.log(error.detail);
            }
        }
        fetchResults();
        return () => {
            cancel = true;
        }
    }, [searchParams.get("q")]);
    return (
        <div className="h-fit min-h-screen text-2xl md:text-4xl font-body px-6 md:px-12 lg:px-16 xl:px-24 pt-8 md:pt-24 pb-24">
            {loading ? <LoadingScreen /> : (
            <div className="text-mercury-200 bg-woodsmoke-900 border-woodsmoke-700 border rounded-xl w-full flex flex-col py-4 md:py-16 px-4 md:px-16 space-y-0 md:space-y-16">
                <div className="font-body font-bold pb-4">Search results for "{searchParams.get("q")}"</div>
                <div className="text-2xl flex flex-col divide-y divide-woodsmoke-700">
                    {data.suggestions.map(suggestion => (
                        <div key={suggestion.symbol}>
                            <Link to={`/stock/${suggestion.symbol}`}><ExploreStock key={suggestion.symbol} data={suggestion} /></Link>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    );
};

export default transition(SearchResults);

