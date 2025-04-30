import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { BarsFade } from "react-svg-spinners";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [resultHover, setResultHover] = useState(false);

    // Debounce the search term
    useEffect(() => {
        setLoading(true);
        let handler = null
        if(searchTerm!==""){
            handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
            }, 500); // 1-second delay
        } else {
            setDebouncedTerm(searchTerm);
        }
        return () => {
            clearTimeout(handler); 
        };
    }, [searchTerm]);
    


    useEffect(() => {
        if (debouncedTerm) {
        fetchResults(debouncedTerm);
        }
    }, [debouncedTerm]);

    const fetchResults = async (term) => {
        const response = await fetch(`https://finapi.rrex.cc/getSearchSuggestions?query=${term}`);
        const data = await response.json();
        setData(data);
        console.log(data);
        setLoading(false);
    };
    
    return (
        <div
            className={`relative flex flex-col justify-between items-center pr-4 rounded-lg border-1 border-woodsmoke-500 text-mercury-200 transition-all duration-500 ease-in-out h-fit`}
        >
            <div className="flex justify-between items-center w-full md:w-fit transition-all duration-500 ease-in-out">
                <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 placeholder:text-mercury-700 w-full md:w-48 transition-all duration-500 ease-in-out focus:outline-none focus:w-96"
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${e.target.value}`)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
                        setFocused(true);
                        console.log(resultHover);
                        if(!resultHover){

                            e.target.value = ""; 
                            setSearchTerm(""); 
                            setData({}); 
                            setFocused(false)}
                        }
                    }
                >
                </input>
                <FaSearch className="cursor-pointer w-8" onClick={() => navigate(`/search?q=${document.getElementById('search').value}`)}/>
            </div>
            {debouncedTerm && (
                <div
                    className={`absolute top-12 left-0 right-0 w-full z-50 bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col py-4 px-4 space-y-4 ${focused ? "opacity-100" : "opacity-0"} transition-all duration-500 ease-in-out`}
                    onMouseOver={() => setResultHover(true)}
                    onMouseLeave={() => setResultHover(false)}
                    onClick={(e) => {e.preventDefault();}}
                >
                    {loading ? (
                        <div className="py-2 flex justify-center items-center">
                            <BarsFade width="30" height="30" color="#FFFFFF" />
                        </div>
                    ) : (
                        <ul className="list-none pl-8 flex flex-col divide-y divide-woodsmoke-700">
                            {data?.suggestions?.map((suggestion) => (
                                <li key={suggestion.symbol} className="py-2 hover:bg-woodsmoke-800 transition-all duration-500 ease-in-out">
                                    <Link to={`/stock/${suggestion.symbol}`} className="text-mercury-200" onFocus= {() => {setFocused(true)}} onMouseUp={() => {setResultHover(false); setFocused(false)}}>
                                        <img className="w-8 inline mr-2" src={`https://finapi.rrex.cc/logos/${suggestion.symbol}.jpg`} alt="stock" />
                                        {suggestion.symbol}
                                        <span className="text-sm block text-mercury-400">{suggestion.name}</span>
                                    </Link>
                                </li>   
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
