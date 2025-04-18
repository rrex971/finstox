import React from "react";
import transition from "../transition"; 
import { Link } from "react-router";
import { FaChartPie, FaRobot, FaLock } from "react-icons/fa";

const Home = () => {
    return (
        <div className="text-mercury-200 font-body">

            <section className="container mx-auto px-6 py-24 md:py-32 lg:py-48">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="md:w-1/2 text-center md:text-left flex-col font-head space-y-6">
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                            Trade smart, grow fast.
                        </h1>
                        <p className="font-light font-body text-2xl lg:text-3xl text-mercury-300">
                            Finstox provides the tools and insights you need to navigate the stock market confidently.
                        </p>
                        <div className="pt-4">
                            <Link to="/register" className="bg-mercury-200 text-san-marino-500 hover:text-mercury-200 hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-san-marino-500 font-bold py-3 px-8 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105">
                                Get Started Today
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <img src="grow.svg" className="max-w-xs md:max-w-md lg:max-w-lg" alt="Financial growth illustration" />
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold font-head mb-4">Why Finstox?</h2>
                    <p className="text-xl text-mercury-300 mb-12">Everything you need to succeed in one platform.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-woodsmoke-900 border border-woodsmoke-700 p-8 rounded-lg shadow-lg flex flex-col items-center">
                            <FaChartPie className="w-16 h-16 text-san-marino-500 mb-4" />
                            <h3 className="text-2xl font-bold font-head mb-3">Real-Time Data</h3>
                            <p className="text-mercury-300">
                                Access up-to-date market data directly from the stock exchanges, alongside charts, and insights to make informed decisions.
                            </p>
                        </div>
                        <div className="bg-woodsmoke-900 border border-woodsmoke-700 p-8 rounded-lg shadow-lg flex flex-col items-center">
                            <FaRobot className="w-16 h-16 text-emerald-600 mb-4" />
                            <h3 className="text-2xl font-bold font-head mb-3">Advanced Tools</h3>
                            <p className="text-mercury-300">
                                Use our revolutionary algo-trading AI models to ensure you make smart trading decisions.                             
                            </p>
                        </div>
                        <div className="bg-woodsmoke-900 border border-woodsmoke-700 p-8 rounded-lg shadow-lg flex flex-col items-center">
                            <FaLock className="w-16 h-16 text-amaranth-600 mb-4" />
                            <h3 className="text-2xl font-bold font-head mb-3">Secure & Reliable</h3>
                            <p className="text-mercury-300">
                                Trade with confidence on our platform built with industry-leading security standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                 <div className="container mx-auto px-6 text-center">
                     <h2 className="text-4xl font-bold font-head mb-12">Get Started in Minutes</h2>
                     <div className="flex flex-col md:flex-row justify-around items-start gap-10">
                        <div className="flex flex-col items-center max-w-xs">
                            <div className="bg-san-marino-900 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
                            <h3 className="text-xl font-semibold font-head mb-2">Create Account</h3>
                            <p className="text-mercury-300">Sign up quickly and securely with our easy onboarding process.</p>
                        </div>
                        <div className="flex flex-col items-center max-w-xs">
                            <div className="bg-san-marino-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
                             <h3 className="text-xl font-semibold font-head mb-2">Fund & Explore</h3>
                             <p className="text-mercury-300">Add funds to your account and explore the platform's features.</p>
                         </div>
                         <div className="flex flex-col items-center max-w-xs">
                             <div className="bg-san-marino-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
                             <h3 className="text-xl font-semibold font-head mb-2">Start Trading</h3>
                             <p className="text-mercury-300">Analyze the market, place your trades, and manage your portfolio.</p>
                         </div>
                     </div>
                 </div>
            </section>

            <section className="bg-woodsmoke-900 border-t border-woodsmoke-700 text-mercury-200 py-16">
                 <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-head mb-4">Ready to Elevate Your Trading?</h2>
                    <p className="text-xl mb-8">Join the leagues of many successful traders on Finstox.</p>
                    <Link to="/register" className="bg-mercury-200 text-san-marino-500 hover:text-mercury-200 hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-san-marino-500 font-bold py-3 px-8 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105">
                        Open Your Account
                    </Link>
                 </div>
            </section>


        </div>
    );
};

export default transition(Home); 

