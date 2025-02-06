import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DataVisualizerProps {
  data: any[];
}

const DataVisualizer = ({ data }: DataVisualizerProps) => {
  return (
    <div className="neomorph p-6 h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Listening Time Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#9FEDD7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataVisualizer;