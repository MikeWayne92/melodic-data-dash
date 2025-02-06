import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DataPoint {
  name: string;
  value: number;
}

interface DataVisualizerProps {
  data: DataPoint[];
}

const DataVisualizer = ({ data }: DataVisualizerProps) => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  // Early return with message if no data
  if (!data || data.length === 0) {
    return (
      <div className="neomorph p-6">
        <h3 className="text-lg font-semibold mb-4">Data Visualization</h3>
        <p className="text-gray-600 text-center">No data available to visualize</p>
      </div>
    );
  }

  // Format data to ensure all required properties
  const formattedData = data.map(item => ({
    name: String(item.name || 'Unnamed'),
    value: Number(item.value || 0)
  }));

  return (
    <div className="neomorph p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Data Visualization</h3>
        <RadioGroup
          value={chartType}
          onValueChange={(value: 'bar' | 'line') => setChartType(value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bar" id="bar" />
            <Label htmlFor="bar">Bar Chart</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="line" id="line" />
            <Label htmlFor="line">Line Chart</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          {chartType === 'bar' ? (
            <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name"
                height={60}
                tick={{ angle: -45, textAnchor: 'end' }}
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#9FEDD7"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          ) : (
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name"
                height={60}
                tick={{ angle: -45, textAnchor: 'end' }}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#9FEDD7"
                strokeWidth={2}
                dot={{ fill: '#9FEDD7', r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataVisualizer;