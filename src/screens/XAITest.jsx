import React from 'react';
import XAIExplanation from '../components/XAIExplanation';
import transition from '../transition';

// Test data based on paper's documented values (Table II)
const mockShapData = {
    features: [
        'Close Price', 'Volume', 'SMA_5', 'EMA_12', 'RSI_14',
        'MACD', 'SMA_20', 'Bollinger Upper', 'Daily Returns',
        'SMA_10', 'Bollinger Lower', 'EMA_26'
    ],
    values: [
        0.3421, 0.1856, 0.1234, 0.0987, 0.0765,
        0.0654, -0.0432, 0.0298, -0.0187,
        0.0098, -0.0045, 0.0023
    ],
    base_value: 1518.0
};

const mockLimeData = {
    features: [
        'Close Price', 'Volume', 'SMA_5', 'EMA_12', 'RSI_14',
        'MACD', 'SMA_20', 'Bollinger Upper', 'Daily Returns',
        'SMA_10', 'Bollinger Lower', 'EMA_26'
    ],
    weights: [
        1.4, 0.6, 0.3, 0.25, 0.15,
        0.12, -0.08, 0.05, -0.04,
        0.03, -0.02, 0.01
    ],
    fidelity_score: 0.87
};

const mockPredictedPrices = [1520.50, 1523.10, 1525.80, 1522.40, 1528.90, 1531.20, 1534.67];

const XAITest = () => {
    return (
        <div className="min-h-screen py-8 px-4 md:px-16 font-body">
            <h1 className="text-3xl font-bold text-mercury-200 mb-2">
                XAI Components Test Page
            </h1>
            <p className="text-mercury-400 mb-8">
                Testing SHAP and LIME visualizations with mock data from the paper (Table II).
            </p>

            {/* Mock Prediction Summary */}
            <div className="bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl p-4 mb-6">
                <h2 className="text-xl text-mercury-200 font-semibold mb-2">
                    Mock Prediction: RELIANCE
                </h2>
                <div className="text-mercury-400 mb-2">
                    7-Day Forecast:
                    <span className="text-emerald-400 ml-2">
                        +{(mockPredictedPrices[6] - mockPredictedPrices[0]).toFixed(2)} INR
                        ({((mockPredictedPrices[6] - mockPredictedPrices[0]) / mockPredictedPrices[0] * 100).toFixed(2)}%)
                    </span>
                </div>
                <div className="flex space-x-1 flex-wrap text-sm">
                    {mockPredictedPrices.map((price, index) => (
                        <div key={index} className="flex py-1 px-2 mb-1 items-center justify-center rounded-sm border border-woodsmoke-700">
                            <span className="text-mercury-300">Day {index + 1}: {price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* XAI Component */}
            <div className="bg-woodsmoke-900 border border-woodsmoke-700 rounded-xl p-4">
                <XAIExplanation
                    shapData={mockShapData}
                    limeData={mockLimeData}
                />
            </div>
        </div>
    );
};

export default transition(XAITest);
