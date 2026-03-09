import React, { useState } from 'react';
import SHAPChart from './SHAPChart';
import LIMEChart from './LIMEChart';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle } from "react-icons/fa";

const tabs = [
    { id: 'shap-global', label: 'SHAP Global', icon: '📊' },
    { id: 'shap-local', label: 'SHAP Local', icon: '🔍' },
    { id: 'lime', label: 'LIME', icon: '🧪' },
];

const XAIExplanation = ({ shapData, limeData }) => {
    const [activeTab, setActiveTab] = useState('shap-global');
    const [showInfo, setShowInfo] = useState(false);

    if (!shapData && !limeData) return null;

    return (
        <div className="w-full mt-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-fuchsia-500 to-san-marino-500 rounded-full" />
                    <span className="text-xl text-mercury-200 font-bold">AI Decision Transparency (XAI)</span>
                </div>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="flex items-center space-x-1 text-sm text-mercury-400 hover:text-fuchsia-400 transition-colors"
                >
                    <FaInfoCircle />
                    <span>How it works</span>
                </button>
            </div>

            {/* Info Box */}
            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-4"
                    >
                        <div className="bg-woodsmoke-900 border border-woodsmoke-700 rounded-lg p-4 text-sm text-mercury-300">
                            <p className="mb-2"><strong className="text-mercury-100">Explainable AI (XAI)</strong> helps you understand <em>why</em> the AI predicted this specific price.</p>
                            <ul className="list-disc pl-5 space-y-1 text-mercury-400">
                                <li><strong>SHAP Global:</strong> Shows which technical indicators (like Volume or Moving Averages) are generally most important across all predictions.</li>
                                <li><strong>SHAP Local:</strong> A waterfall breakdown showing exactly how much each factor pushed today's prediction price up (green) or down (red).</li>
                                <li><strong>LIME:</strong> A simplified "local" view focusing purely on the most impactful features for this specific prediction, along with an accuracy trust score.</li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tab Bar */}
            <div className="flex space-x-1 bg-woodsmoke-950 rounded-lg p-1 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              relative flex-1 flex items-center justify-center space-x-1.5
              px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
              ${activeTab === tab.id
                                ? 'text-mercury-100'
                                : 'text-mercury-500 hover:text-mercury-300'
                            }
            `}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="xai-tab-bg"
                                className="absolute inset-0 bg-woodsmoke-700 rounded-md"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                        <span className="relative z-10">{tab.icon}</span>
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'shap-global' && (
                        <SHAPChart shapData={shapData} mode="global" />
                    )}
                    {activeTab === 'shap-local' && (
                        <SHAPChart shapData={shapData} mode="waterfall" />
                    )}
                    {activeTab === 'lime' && (
                        <LIMEChart limeData={limeData} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default XAIExplanation;
