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
      <div className="bg-woodsmoke-800 border border-woodsmoke-700 rounded-xl px-3 py-2 text-sm">
        <p className="text-mercury-200 font-semibold">{data.feature}</p>
        <p className={`${data.value >= 0 ? 'text-emerald-400' : 'text-amaranth-400'}`}>
          Impact: {data.value >= 0 ? '+' : ''}{data.value.toFixed(4)}
        </p>
      </div>
    );
  }
  return null;
};

const SHAPChart = ({ shapData, mode = 'global' }) => {
  if (!shapData) return null;

  const { features, values, base_value } = shapData;

  // Build chart data sorted by absolute value
  const chartData = features
    .map((feature, i) => ({
      feature,
      value: values[i],
      absValue: Math.abs(values[i]),
    }))
    .sort((a, b) => b.absValue - a.absValue);

  if (mode === 'global') {
    // Global Feature Importance: horizontal bars ranked by mean |SHAP|
    return (
      <div className="w-full">
        <div className="text-sm text-mercury-300 mb-3 bg-woodsmoke-950 p-3 rounded-xl border border-woodsmoke-800">
          <strong className="text-mercury-100 block mb-1">Overall Feature Impact:</strong>
          Factors with longer bars have the strongest general influence on the AI's price predictions.
        </div>
        <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 36)}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#353535" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: '#adadad', fontSize: 11 }}
              axisLine={{ stroke: '#353535' }}
              tickLine={{ stroke: '#353535' }}
            />
            <YAxis
              type="category"
              dataKey="feature"
              tick={{ fill: '#e0e0e0', fontSize: 11 }}
              axisLine={{ stroke: '#353535' }}
              tickLine={false}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey="absValue" radius={[0, 4, 4, 0]} maxBarSize={24}>
              {chartData.map((entry, index) => {
                // Gradient from high-impact (bright) to low-impact (dim)
                const intensity = 1 - (index / chartData.length) * 0.6;
                return (
                  <Cell
                    key={entry.feature}
                    fill={`rgba(101, 143, 203, ${intensity})`}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Waterfall mode: show positive/negative contributions
  // Build waterfall data with cumulative positions
  const waterfallData = chartData.map((item) => ({
    feature: item.feature,
    value: item.value,
    fill: item.value >= 0 ? '#52dd92' : '#fc7087',
  }));

  return (
    <div className="w-full">
      <div className="text-sm text-mercury-300 mb-3 bg-woodsmoke-950 p-3 rounded-xl border border-woodsmoke-800">
        <strong className="text-mercury-100 block mb-1">Average Expected Price: {base_value?.toFixed(2) ?? 'N/A'}</strong>
        Green bars show factors pushing the predicted price <span className="text-emerald-400 font-semibold">higher</span>; red bars show factors pulling it <span className="text-amaranth-400 font-semibold">lower</span>.
      </div>
      <ResponsiveContainer width="100%" height={Math.max(300, waterfallData.length * 36)}>
        <BarChart
          data={waterfallData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#353535" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: '#adadad', fontSize: 11 }}
            axisLine={{ stroke: '#353535' }}
            tickLine={{ stroke: '#353535' }}
          />
          <YAxis
            type="category"
            dataKey="feature"
            tick={{ fill: '#e0e0e0', fontSize: 11 }}
            axisLine={{ stroke: '#353535' }}
            tickLine={false}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <ReferenceLine x={0} stroke="#7b7b7b" strokeDasharray="3 3" />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={24}>
            {waterfallData.map((entry) => (
              <Cell key={entry.feature} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SHAPChart;
