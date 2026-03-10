import React, { useRef, useEffect } from "react";
import transition from "../transition"; 
import { Link } from "react-router";
import { FaChartLine, FaBrain, FaShieldAlt, FaUserPlus, FaWallet, FaRocket, FaArrowRight, FaBolt, FaChartArea, FaLightbulb } from "react-icons/fa";
import AnimatedStockGraph from "../components/AnimatedStockGraph";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const stepsRef = useRef(null);
    const ctaRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero section
            gsap.from('.hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
            gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
            gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' });
            gsap.from('.hero-graph', { x: 60, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });

            // Stats bar
            gsap.fromTo('.stat-item',
                { y: 30, opacity: 0 },
                { scrollTrigger: { trigger: '.stats-bar', start: 'top 90%', toggleActions: 'play none none none' },
                  y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
            );

            // Feature cards
            gsap.fromTo('.feature-card',
                { y: 50, opacity: 0 },
                { scrollTrigger: { trigger: featuresRef.current, start: 'top 90%', toggleActions: 'play none none none' },
                  y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' }
            );

            // Steps
            gsap.fromTo('.step-item',
                { y: 40, opacity: 0 },
                { scrollTrigger: { trigger: stepsRef.current, start: 'top 90%', toggleActions: 'play none none none' },
                  y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
            );

            // CTA
            gsap.fromTo('.final-cta',
                { y: 30, opacity: 0 },
                { scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
                  y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="text-mercury-200 font-body">
            {/* Hero */}
            <section ref={heroRef} className="px-6 md:px-12 lg:px-16 xl:px-24 py-20 md:py-28 lg:py-36">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 lg:gap-20">
                    <div className="md:w-1/2 text-center md:text-left space-y-6">
                        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-head leading-tight text-mercury-100">
                            Trade smart,<br />grow fast.
                        </h1>
                        <p className="hero-sub text-lg md:text-xl lg:text-2xl text-mercury-400 max-w-xl">
                            Real-time market data, AI-powered predictions, and explainable insights — all in one platform.
                        </p>
                        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                            <Link to="/register" className="bg-accent-500 hover:bg-accent-600 text-mercury-100 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2">
                                Get Started <FaArrowRight size={14} />
                            </Link>
                            <Link to="/login" className="border border-woodsmoke-700 hover:border-mercury-600 text-mercury-300 hover:text-mercury-100 font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200">
                                Sign In
                            </Link>
                        </div>
                    </div>
                    <div className="hero-graph md:w-1/2 flex justify-center md:justify-end">
                        <AnimatedStockGraph />
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar border-y border-woodsmoke-800/60 bg-woodsmoke-950/60 py-10">
                <div className="px-6 md:px-12 lg:px-16 xl:px-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="stat-item">
                        <div className="text-3xl md:text-4xl font-bold text-accent-400 tabular-nums">1,800+</div>
                        <div className="text-mercury-500 text-sm mt-1">NSE Stocks</div>
                    </div>
                    <div className="stat-item">
                        <div className="text-3xl md:text-4xl font-bold text-emerald-400 tabular-nums">7-Day</div>
                        <div className="text-mercury-500 text-sm mt-1">AI Forecasts</div>
                    </div>
                    <div className="stat-item">
                        <div className="text-3xl md:text-4xl font-bold text-san-marino-400">LSTM</div>
                        <div className="text-mercury-500 text-sm mt-1">Deep Learning</div>
                    </div>
                    <div className="stat-item">
                        <div className="text-3xl md:text-4xl font-bold text-amaranth-400">XAI</div>
                        <div className="text-mercury-500 text-sm mt-1">Explainable AI</div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section ref={featuresRef} className="py-20 md:py-28">
                <div className="px-6 md:px-12 lg:px-16 xl:px-24">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold font-head mb-3">Why Finstox?</h2>
                        <p className="text-mercury-400 text-lg max-w-2xl mx-auto">Everything you need to trade with confidence.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="feature-card group bg-woodsmoke-900/80 border border-woodsmoke-800 p-8 rounded-2xl hover:border-accent-700/50 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-san-marino-900/60 flex items-center justify-center mb-5 group-hover:bg-san-marino-800/60 transition-colors">
                                <FaChartLine className="text-san-marino-400" size={22} />
                            </div>
                            <h3 className="text-xl font-bold font-head mb-2">Real-Time Data</h3>
                            <p className="text-mercury-400 text-sm leading-relaxed">
                                Live market data from NSE with interactive TradingView charts, gainers, losers, and sector breakdowns.
                            </p>
                        </div>
                        <div className="feature-card group bg-woodsmoke-900/80 border border-woodsmoke-800 p-8 rounded-2xl hover:border-accent-700/50 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-emerald-900/60 flex items-center justify-center mb-5 group-hover:bg-emerald-800/60 transition-colors">
                                <FaBrain className="text-emerald-400" size={22} />
                            </div>
                            <h3 className="text-xl font-bold font-head mb-2">AI Predictions</h3>
                            <p className="text-mercury-400 text-sm leading-relaxed">
                                LSTM neural networks trained on technical indicators deliver 7-day price forecasts with SHAP and LIME explanations.
                            </p>
                        </div>
                        <div className="feature-card group bg-woodsmoke-900/80 border border-woodsmoke-800 p-8 rounded-2xl hover:border-accent-700/50 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-amaranth-900/60 flex items-center justify-center mb-5 group-hover:bg-amaranth-800/60 transition-colors">
                                <FaShieldAlt className="text-amaranth-400" size={22} />
                            </div>
                            <h3 className="text-xl font-bold font-head mb-2">Secure Trading</h3>
                            <p className="text-mercury-400 text-sm leading-relaxed">
                                JWT authentication, encrypted passwords, and secure transaction handling for worry-free trading.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section ref={stepsRef} className="py-20 md:py-28 border-t border-woodsmoke-800/40">
                <div className="px-6 md:px-12 lg:px-16 xl:px-24">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold font-head mb-3">Get Started in Minutes</h2>
                        <p className="text-mercury-400 text-lg">Three simple steps to your first trade.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="step-item flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-accent-900/40 border border-accent-800/40 flex items-center justify-center mb-4">
                                <FaUserPlus className="text-accent-400" size={22} />
                            </div>
                            <h3 className="text-lg font-bold font-head mb-1">Create Account</h3>
                            <p className="text-mercury-400 text-sm">Sign up in seconds with just a username and password.</p>
                        </div>
                        <div className="step-item flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-san-marino-900/40 border border-san-marino-800/40 flex items-center justify-center mb-4">
                                <FaWallet className="text-san-marino-400" size={22} />
                            </div>
                            <h3 className="text-lg font-bold font-head mb-1">Fund & Explore</h3>
                            <p className="text-mercury-400 text-sm">Deposit funds and browse 1,800+ NSE-listed stocks.</p>
                        </div>
                        <div className="step-item flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-900/40 border border-emerald-800/40 flex items-center justify-center mb-4">
                                <FaRocket className="text-emerald-400" size={22} />
                            </div>
                            <h3 className="text-lg font-bold font-head mb-1">Start Trading</h3>
                            <p className="text-mercury-400 text-sm">Buy and sell with AI guidance and real-time data.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="bg-woodsmoke-900/50 border-t border-woodsmoke-800/40 py-20">
                <div className="final-cta px-6 md:px-12 lg:px-16 xl:px-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-head mb-4">Ready to Trade Smarter?</h2>
                    <p className="text-mercury-400 text-lg mb-8 max-w-xl mx-auto">Join Finstox and leverage AI-powered insights for better trading decisions.</p>
                    <Link to="/register" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-mercury-100 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 hover:scale-[1.02]">
                        Open Your Account <FaArrowRight size={14} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default transition(Home); 

