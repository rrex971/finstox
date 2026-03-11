import { useEffect, useState, useRef } from "react";
import transition from "../transition";
import ExploreStock from "../components/ExploreStock";
import { Link } from "react-router";
import ExplorePanel from "../components/ExplorePanel";
import LoadingScreen from "./LoadingScreen";
import { motion, AnimatePresence } from "motion/react";
import { FaArrowUp, FaArrowDown, FaFire, FaIndustry, FaChartLine, FaChevronDown } from "react-icons/fa";
import API_BASE from "../apiConfig";

const SECTORS = [
    { index: "NIFTY BANK", label: "Banking" },
    { index: "NIFTY IT", label: "IT" },
    { index: "NIFTY PHARMA", label: "Pharma" },
    { index: "NIFTY AUTO", label: "Auto" },
    { index: "NIFTY FMCG", label: "FMCG" },
    { index: "NIFTY ENERGY", label: "Energy" },
    { index: "NIFTY METAL", label: "Metal" },
];

const SectorPanel = ({ sector }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancel = false;
        const fetchSector = async () => {
            try {
                const res = await fetch(`${API_BASE}/getSectorStocks?sector=${encodeURIComponent(sector.index)}`);
                const data = await res.json();
                if (!cancel && data.stocks) {
                    setStocks(data.stocks);
                    setLoading(false);
                }
            } catch {
                if (!cancel) setLoading(false);
            }
        };
        fetchSector();
        return () => { cancel = true; };
    }, [sector.index]);

    return (
        <div className="h-fit w-full text-mercury-200">
            <div className="font-bold text-lg md:text-xl mb-1.5 flex items-center gap-2">
                <FaIndustry className="text-accent-400 text-sm" />
                {sector.label}
            </div>
            {loading ? (
                <div className="py-4 flex justify-center text-mercury-600 text-sm">Loading…</div>
            ) : (
                <div className="stocks flex flex-col divide-y divide-woodsmoke-700">
                    {stocks.slice(0, 5).map((stock) => (
                        <Link key={stock.symbol} to={`/stock/${stock.symbol}`}>
                            <ExploreStock data={stock} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const MostActivePanel = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancel = false;
        const fetchActive = async () => {
            try {
                const res = await fetch(`${API_BASE}/getMostActive`);
                const data = await res.json();
                if (!cancel && Array.isArray(data)) {
                    setStocks(data);
                    setLoading(false);
                }
            } catch {
                if (!cancel) setLoading(false);
            }
        };
        fetchActive();
        return () => { cancel = true; };
    }, []);

    return (
        <div className="h-fit w-full text-mercury-200 bg-woodsmoke-900 border border-woodsmoke-800 rounded-xl flex flex-col py-3 md:py-5 px-3 md:px-6">
            <div className="font-bold text-lg mb-1 flex items-center gap-2">
                <FaFire className="text-orange-400 text-sm" />
                Most Active
            </div>
            <div className="text-xs text-mercury-600 mb-1.5">By volume · NIFTY 50</div>
            {loading ? (
                <div className="py-4 flex justify-center text-mercury-600 text-sm">Loading…</div>
            ) : (
                <div className="stocks flex flex-col divide-y divide-woodsmoke-700">
                    {stocks.map((stock) => (
                        <Link key={stock.symbol} to={`/stock/${stock.symbol}`}>
                            <ExploreStock data={stock} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const MarketOverviewBar = () => {
    const [indices, setIndices] = useState([]);

    useEffect(() => {
        let cancel = false;
        const fetchOverview = async () => {
            try {
                const res = await fetch(`${API_BASE}/getMarketOverview`);
                const data = await res.json();
                if (!cancel && Array.isArray(data)) setIndices(data);
            } catch { /* ignore */ }
        };
        fetchOverview();
        return () => { cancel = true; };
    }, []);

    if (indices.length === 0) return null;

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {indices.map((idx) => (
                <div key={idx.name} className="bg-woodsmoke-900 border border-woodsmoke-800 rounded-xl px-4 py-3.5 flex items-center justify-between">
                    <div>
                        <div className="text-mercury-400 text-xs font-semibold tracking-wide uppercase">{idx.name}</div>
                        <div className="text-mercury-100 text-xl font-bold tabular-nums">{Number(idx.last).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className={`text-sm font-semibold tabular-nums flex items-center gap-1 ${idx.positive ? "text-emerald-400" : "text-amaranth-500"}`}>
                        {idx.positive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                        {idx.positive ? "+" : ""}{idx.pChange}%
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

const Explore = () => {
    const [gainers, setGainers] = useState({});
    const [losers, setLosers] = useState({});
    const [loadingGL, setLoadingGL] = useState(true);
    const [liveTimeout, setLiveTimeout] = useState(null);
    const [activeSector, setActiveSector] = useState(0);
    const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);

    useEffect(() => {
        let cancel = false;
        let timer = null;
        const fetchGL = async () => {
            try {
                const [g, l] = await Promise.all([
                    fetch(`${API_BASE}/getTopGainers`).then(r => r.json()),
                    fetch(`${API_BASE}/getTopLosers`).then(r => r.json()),
                ]);
                if (!cancel) {
                    setGainers(g);
                    setLosers(l);
                    setLoadingGL(false);
                }
            } catch {
                if (!cancel) setLoadingGL(false);
            }
        };
        fetchGL();
        fetch(`${API_BASE}/isMarketOpen`)
            .then(r => r.text())
            .then(d => {
                if (d === "true") {
                    timer = setInterval(fetchGL, 10000);
                    setLiveTimeout(timer);
                }
            });
        return () => { cancel = true; if (timer) clearInterval(timer); };
    }, []);

    useEffect(() => {
        return () => clearInterval(liveTimeout);
    }, [liveTimeout]);

    if (loadingGL) return <LoadingScreen />;

    return (
        <div className="min-h-screen font-body px-4 md:px-10 lg:px-14 xl:px-20 pt-6 md:pt-10 pb-12">

            {/* Market Overview */}
            <MarketOverviewBar />

            {/* Top Gainers + Top Losers row */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <ExplorePanel title="Top Gainers" icon={<FaArrowUp className="text-emerald-400" />} data={gainers} />
                <ExplorePanel title="Top Losers" icon={<FaArrowDown className="text-amaranth-500" />} data={losers} />
            </motion.div>

            {/* Most Active + Sector panels */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* Most Active */}
                <MostActivePanel />

                {/* Sector Browser */}
                <div className="lg:col-span-2 flex flex-col bg-woodsmoke-900 border border-woodsmoke-800 rounded-xl py-3 md:py-5 px-3 md:px-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-xl flex items-center gap-2 text-mercury-200">
                            <FaChartLine className="text-accent-400" />
                            Sector Stocks
                        </div>
                    </div>

                    {/* Sector Tabs — desktop */}
                    <div className="hidden md:flex flex-wrap gap-2 mb-3">
                        {SECTORS.map((s, i) => (
                            <button
                                key={s.index}
                                onClick={() => setActiveSector(i)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors duration-200 cursor-pointer
                                    ${activeSector === i
                                        ? "bg-accent-500 text-mercury-100"
                                        : "bg-woodsmoke-800 text-mercury-400 hover:bg-woodsmoke-700"
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Sector dropdown — mobile */}
                    <div className="md:hidden mb-3 relative">
                        <button
                            onClick={() => setSectorDropdownOpen(!sectorDropdownOpen)}
                            className="w-full flex items-center justify-between bg-woodsmoke-800 text-mercury-200 rounded-lg px-4 py-2.5 text-sm font-semibold cursor-pointer"
                        >
                            {SECTORS[activeSector].label}
                            <FaChevronDown className={`text-xs transition-transform duration-200 ${sectorDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {sectorDropdownOpen && (
                                <motion.div
                                    className="absolute z-20 top-full mt-1 w-full bg-woodsmoke-800 border border-woodsmoke-700 rounded-lg overflow-hidden shadow-xl"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {SECTORS.map((s, i) => (
                                        <button
                                            key={s.index}
                                            onClick={() => { setActiveSector(i); setSectorDropdownOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors ${
                                                activeSector === i ? "bg-accent-500/20 text-accent-300" : "text-mercury-300 hover:bg-woodsmoke-700"
                                            }`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <SectorPanel key={SECTORS[activeSector].index} sector={SECTORS[activeSector]} />
                </div>
            </motion.div>
        </div>
    );
};

export default transition(Explore);
