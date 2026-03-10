import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';

const PredictionChart = ({ historicalPrices, predictedPrices, lastHistoricalDate }) => {
    // build chart data: historical + predicted
    const chartData = [];

    // historical data points
    if (historicalPrices && historicalPrices.length > 0) {
        historicalPrices.forEach(pt => {
            chartData.push({
                date: pt.date,
                label: new Date(pt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
                historical: pt.close,
                predicted: null,
            });
        });
    }

    // bridge: last historical point is also first predicted point
    if (predictedPrices && predictedPrices.length > 0 && chartData.length > 0) {
        const lastHistorical = chartData[chartData.length - 1];
        lastHistorical.predicted = lastHistorical.historical;
    }

    // predicted data points
    if (predictedPrices && predictedPrices.length > 0) {
        const baseDate = lastHistoricalDate ? new Date(lastHistoricalDate) : new Date();
        predictedPrices.forEach((price, i) => {
            const d = new Date(baseDate);
            d.setDate(d.getDate() + i + 1);
            // skip weekends
            while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
            chartData.push({
                date: d.toISOString().slice(0, 10),
                label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
                historical: null,
                predicted: price,
            });
        });
    }

    // compute Y domain with some padding
    const allPrices = chartData.map(d => d.historical ?? d.predicted).filter(Boolean);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const padding = (maxPrice - minPrice) * 0.1 || 5;

    const upward = predictedPrices && predictedPrices.length > 1 && predictedPrices[predictedPrices.length - 1] > predictedPrices[0];

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;
        const pt = payload[0]?.payload;
        const price = pt?.historical ?? pt?.predicted;
        const isPredicted = pt?.historical == null;
        return (
            <div className="bg-woodsmoke-800 border border-woodsmoke-600 rounded-lg px-3 py-2 text-sm shadow-lg">
                <div className="text-mercury-400">{label}</div>
                <div className={`font-semibold ${isPredicted ? (upward ? 'text-emerald-400' : 'text-amaranth-400') : 'text-mercury-200'}`}>
                    ₹{price?.toFixed(2)}
                    {isPredicted && <span className="text-mercury-500 text-xs ml-1">(predicted)</span>}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-56 mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis
                        dataKey="label"
                        tick={{ fill: '#888', fontSize: 11 }}
                        tickLine={false}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        domain={[Math.floor(minPrice - padding), Math.ceil(maxPrice + padding)]}
                        tick={{ fill: '#888', fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={v => `₹${v}`}
                        width={65}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {lastHistoricalDate && (
                        <ReferenceLine
                            x={new Date(lastHistoricalDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            stroke="#555"
                            strokeDasharray="4 4"
                            label={{ value: 'Today', fill: '#888', fontSize: 11, position: 'top' }}
                        />
                    )}
                    <Line
                        type="monotone"
                        dataKey="historical"
                        stroke="#e4e4e4"
                        strokeWidth={2}
                        dot={false}
                        connectNulls={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke={upward ? '#34d399' : '#f43f5e'}
                        strokeWidth={2}
                        strokeDasharray="6 3"
                        dot={{ r: 3, fill: upward ? '#34d399' : '#f43f5e' }}
                        connectNulls={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PredictionChart;
