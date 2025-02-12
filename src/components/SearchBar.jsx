import React from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center pr-4 rounded-lg bg-woodsmoke-700 border-1 border-woodsmoke-500 text-mercury-200">
            <input
                id="search"
                type="text"
                placeholder="Search..."
                className="px-4 py-2 placeholder:text-mercury-700 w-96 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${e.target.value}`)}>
            </input>
            <FaSearch className="cursor-pointer" onClick={() => navigate(`/search?q=${document.getElementById('search').value}`)}/>
        </div>

    );
};

export default SearchBar;
