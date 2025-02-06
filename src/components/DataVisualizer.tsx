import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DataVisualizerProps {
  data: any[];
}

const DataVisualizer = ({ data }: DataVisualizerProps) => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

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
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#9FEDD7"
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <XAxis dataKey="name" />
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