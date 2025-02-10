import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {

    return (
    <footer>
        <div className="bg-woodsmoke-900 min-h-48 flex font-body justify-between items-center text-mercury-400 px-32">
            <div className="flex-col justify-between items-center">
                <div className="text-4xl font-logo font-medium">
                    Finstox
                </div>
                <div><a href="about">About</a></div>
                <div><a href="https://link">Customer Support</a></div>
                <div><a href="https://link">Terms of Service</a></div>
                <div><a href="https://link">Privacy Policy</a></div>
            </div>
            <div className="text-">
                <div className="text-4xl"><a href="https://github.com/rrex971/finstox"><FaGithub /></a></div>
            </div>
        </div>
    </footer>
)}

export default Footer;