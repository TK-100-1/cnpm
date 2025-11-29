import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline'; 

// Component này nhận vào các thông tin của lớp học (props)
const ClassRow = ({ courseCode, courseName, teacherName, classId, onClick}) => {
  return (
    <div
      onClick={onClick} 
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer mb-3"
    >
      {/* Phần thông tin bên trái */}
      <div className="flex items-center gap-4">
        {/* Thanh màu xanh trang trí */}
        <div className="w-1.5 h-12 bg-blue-600 rounded-full"></div>
        
        <div className="text-gray-800 text-lg">
          <span className="font-bold">{courseCode}</span>
          <span className="mx-2">-</span>
          <span className="font-medium">{courseName}</span>
          <span className="mx-2">-</span>
          <span>{teacherName}</span>
          <span className="mx-2">-</span>
          <span className="text-gray-500">{classId}</span>
        </div>
      </div>

      {/* Icon mũi tên bên phải */}
      <div className="text-gray-400">
        <ChevronRightIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ClassRow;