// src/components/CustomLineChart.jsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dữ liệu mẫu (Điều chỉnh dữ liệu này để phù hợp với hình ảnh bạn cung cấp)
const lineChartData = [
    { x: 0, line1: 45, line2: 30 },
    { x: 1, line1: 58, line2: 50 },
    { x: 2, line1: 25, line2: 20 },
    { x: 3, line1: 40, line2: 35 },
    { x: 4, line1: 58, line2: 50 },
    { x: 5, line1: 50, line2: 40 },
    { x: 6, line1: 60, line2: 35 },
    { x: 7, line1: 30, line2: 15 }, // Đường màu cam nhạt tụt xuống thấp
    { x: 8, line1: 58, line2: 40 },
    { x: 9, line1: 35, line2: 10 },
    { x: 10, line1: 45, line2: 25 },
    { x: 11, line1: 50, line2: 35 },
    { x: 12, line1: 55, line2: 45 },
];

const CustomLineChart = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <ResponsiveContainer width={400} height={200}>
                <LineChart
                    data={lineChartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    {/* Lưới tọa độ (Bỏ lưới ngang để giống hình mẫu) */}
                    <CartesianGrid horizontal={false} stroke="#ccc" /> 
                    
                    {/* Trục X đã được chỉnh sửa */}
                    <XAxis 
                        dataKey="x" 
                        type="number" 
                        allowDuplicatedCategory={false} 
                        axisLine={{ stroke: 'black' }} 
                        tickLine={false} 
                        // 🚨 CHỈNH SỬA: Ép hiển thị tất cả 13 điểm dữ liệu (từ 0 đến 12)
                        tickCount={13} 
                        domain={[0, 12]}
                        interval={0} // Đảm bảo tất cả nhãn được hiển thị
                    />
                    
                    {/* Trục Y đã được chỉnh sửa */}
                    <YAxis 
                        type="number" 
                        axisLine={{ stroke: 'black' }} 
                        tickLine={false} 
                        // 🚨 CHỈNH SỬA: Thêm nhiều giá trị đánh dấu hơn (0, 10, 20, 30, 40, 50, 60)
                        ticks={[0, 10, 20, 30, 40, 50, 60]} 
                        domain={[0, 60]}
                    />
                    
                    <Tooltip />
                    
                    {/* Đường dữ liệu thứ nhất (Màu tím đậm) */}
                    <Line 
                        type="monotone" 
                        dataKey="line1" 
                        stroke="#905D97" 
                        dot={{ r: 4 }} // Đánh dấu các điểm dữ liệu
                        strokeWidth={2}
                    />
                    
                    {/* Đường dữ liệu thứ hai (Màu cam nhạt) */}
                    <Line 
                        type="monotone" 
                        dataKey="line2" 
                        stroke="#EAA999" 
                        dot={{ r: 4 }} 
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;