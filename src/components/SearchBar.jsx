import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

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
        const response = await fetch(`http://localhost:8000/getSearchSuggestions?query=${term}`);
        const data = await response.json();
        setData(data);
        console.log(data);
        setLoading(false);
    };
    const handleSearchInput = (e) => {
        const value = e.target.value;
        
    }
    return (
        <div
            className={`relative flex flex-col justify-between items-center pr-4 rounded-lg border-1 border-woodsmoke-500 text-mercury-200 transition-all duration-500 ease-in-out h-fit`}
        >
            <div className="flex items-center w-fit transition-all duration-500 ease-in-out">
                <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 placeholder:text-mercury-700 w-48 transition-all duration-500 ease-in-out focus:outline-none focus:w-96"
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${e.target.value}`)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
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
                    className={`absolute top-12 left-0 right-0 bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl flex flex-col py-4 px-4 space-y-4 z-50 ${focused ? "opacity-100" : "opacity-0"} transition-all duration-500 ease-in-out`}
                    onMouseEnter={() => setResultHover(true)}
                    onMouseLeave={() => setResultHover(false)}
                >
                    {loading ? (
                        <div className="py-2">Loading...</div>
                    ) : (
                        <ul className="list-none pl-8">
                            {data?.suggestions?.map((suggestion) => (
                                <li key={suggestion.symbol} className="py-2 hover:bg-woodsmoke-800 transition-all duration-500 ease-in-out">
                                    <Link to={`/stock/${suggestion.symbol}`} className="text-mercury-200" onMouseUp={() => {setResultHover(false); setFocused(false)}}>
                                        {suggestion.symbol} - {suggestion.name}
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
