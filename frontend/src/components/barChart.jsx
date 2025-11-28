// src/components/CustomBarChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dữ liệu mẫu (Điều chỉnh dữ liệu này để phù hợp với hình ảnh bạn cung cấp)
const barChartData = [
  { name: 'A', value1: 40, value2: 50 },
  { name: 'B', value1: 10, value2: 20 },
  { name: 'C', value1: 30, value2: 15 },
  { name: 'D', value1: 35, value2: 30 },
  { name: 'E', value1: 55, value2: 60 },
  { name: 'F', value1: 45, value2: 40 },
  { name: 'G', value1: 5, value2: 2 },
  { name: 'H', value1: 25, value2: 15 },
  { name: 'I', value1: 45, value2: 55 },
];


const CustomBarChart = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <ResponsiveContainer width={400} height={200}>
        <BarChart
          data={barChartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* Lưới tọa độ xám mờ phía sau */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" /> 
          
          {/* Trục X (không hiển thị chữ) */}
          <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
          
          {/* Trục Y (không hiển thị chữ) */}
          <YAxis tick={false} axisLine={false} tickLine={false} /> 
          
          {/* Tooltip khi di chuột */}
          <Tooltip /> 
          
          {/* Các cột dữ liệu */}
          <Bar dataKey="value1" fill="#BB5C93" barSize={8} /> {/* Màu hồng đậm */}
          <Bar dataKey="value2" fill="#5F4B6E" barSize={8} /> {/* Màu tím đậm */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;