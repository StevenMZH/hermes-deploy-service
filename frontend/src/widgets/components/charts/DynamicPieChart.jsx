import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const DEFAULT_COLORS = [
  '#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#A28BFF',
  '#FF6384', '#36A2EB', '#FFCE56', '#B3E283', '#FF9F40'
];

export default function DynamicPieChart({
  title=null,
  data,
  width = 500,
  height = 300,
  radius = 100,
  showLabels = true,
  centerLegend = true
}) {
  if (!data || data.length === 0)
    return <p className="pieChart-no-data">No data to display.</p>;

  const totalValue = data.reduce((sum, item) => sum + item.amount, 0);
  const availableColors = [...DEFAULT_COLORS];

  const processedData = data.map((item) => {
    const color =
      item.color && item.color.trim() !== ''
        ? item.color
        : availableColors.shift() || DEFAULT_COLORS[0];

    return {
      name: item.name,
      value: item.amount,
      color,
      percentage: ((item.amount / totalValue) * 100).toFixed(2),
    };
  });

  return (
    <div className="card">
      <div className="pieChart-container">
            {title && <p className='h5'>{title}</p>}
            <PieChart width={width} height={height}>
              <Pie
                data={processedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                stroke="var(--border2)"
                outerRadius={radius}
                label={showLabels ? ({ name, percentage }) => `${name} (${percentage}%)` : false}
              >
                {processedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value} (${props.payload.percentage}%)`,
                  name,
                ]}
              />
            </PieChart>

            <div className={`pieChart-legend ${!centerLegend && "pieChart-legend-left"}`}>
              {processedData.map((item, index) => (
                <div key={index} className="pieChart-legend-item">
                  <div
                    className="pieChart-legend-color"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}: {item.percentage}%</span>
                </div>
              ))}
            </div>
        </div>
    </div>
      );
}
