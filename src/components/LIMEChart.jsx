import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ReferenceLine
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-woodsmoke-800 border border-woodsmoke-700 rounded-lg px-3 py-2 text-sm">
                <p className="text-mercury-200 font-semibold">{data.feature}</p>
                <p className={`${data.weight >= 0 ? 'text-emerald-400' : 'text-amaranth-400'}`}>
                    Weight: {data.weight >= 0 ? '+' : ''}{data.weight.toFixed(4)}
                </p>
                <p className="text-mercury-400 text-xs mt-1">
                    {data.weight >= 0 ? 'Pushes prediction higher' : 'Pushes prediction lower'}
                </p>
            </div>
        );
    }
    return null;
};

const LIMEChart = ({ limeData }) => {
    if (!limeData) return null;

    const { features, weights, fidelity_score } = limeData;

    // Build chart data sorted by absolute weight
    const chartData = features
        .map((feature, i) => ({
            feature,
            weight: weights[i],
            absWeight: Math.abs(weights[i]),
            fill: weights[i] >= 0 ? '#52dd92' : '#fc7087',
        }))
        .sort((a, b) => b.absWeight - a.absWeight);

    return (
        <div className="w-full">
            <div className="text-sm text-mercury-300 mb-3 bg-woodsmoke-950 p-3 rounded-lg border border-woodsmoke-800">
                <strong className="text-mercury-100 block mb-1">Specific Decision Breakdown:</strong>
                Exactly how much each technical indicator contributed to making <em className="text-mercury-100 font-medium">this exact</em> 7-day prediction.
            </div>
            <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 36)}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4f4f4f" horizontal={false} />
                    <XAxis
                        type="number"
                        tick={{ fill: '#adadad', fontSize: 12 }}
                        axisLine={{ stroke: '#4f4f4f' }}
                        tickLine={{ stroke: '#4f4f4f' }}
                    />
                    <YAxis
                        type="category"
                        dataKey="feature"
                        tick={{ fill: '#e0e0e0', fontSize: 12 }}
                        axisLine={{ stroke: '#4f4f4f' }}
                        tickLine={false}
                        width={95}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <ReferenceLine x={0} stroke="#7b7b7b" strokeDasharray="3 3" />
                    <Bar dataKey="weight" radius={[0, 4, 4, 0]} maxBarSize={24}>
                        {chartData.map((entry) => (
                            <Cell key={entry.feature} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Fidelity Score */}
            {fidelity_score != null && (
                <div className="mt-4 flex items-center space-x-3">
                    <div className="text-sm text-mercury-300 font-medium">Explanation Accuracy (Trust Score):</div>
                    <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-woodsmoke-700 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${Math.min(fidelity_score * 100, 100)}%`,
                                    background: `linear-gradient(90deg, #658fcb, #52dd92)`,
                                }}
                            />
                        </div>
                        <span className="text-mercury-200 text-sm font-semibold">
                            {fidelity_score.toFixed(2)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LIMEChart;
