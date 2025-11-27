import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // Dùng icon có sẵn hoặc thay bằng thẻ img nếu có ảnh

const AccountMentee = () => {
  // Mock data - Dữ liệu giả lập giống trong ảnh
  const userInfo = {
    name: "Nguyễn Văn A",
    mssv: "24100XX",
    major: "Khoa học và Kỹ thuật máy tính - Ngành Khoa học máy tính",
    email: "Nguyenvanva@hcmut.edu.vn",
    country: "Việt Nam"
  };

  const courses = [
    "CO3029_242_Khai phá dữ liệu_Tên Giảng Viên",
    "CO3032_242_Khai phá dữ liệu_Tên Giảng Viên",
    "CO3031_242_Khai phá dữ liệu_Tên Giảng Viên",
    "CO3033_242_Khai phá dữ liệu_Tên Giảng Viên"
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* 1. Header: Avatar + Tên */}
      <div className="flex items-center mb-10">
        {/* Avatar giả lập (Hình tròn xanh dương) */}
        <div className="w-24 h-24 rounded-full bg-blue-300 flex items-center justify-center overflow-hidden mr-6 shadow-sm">
             {/* Nếu có ảnh thật thì dùng thẻ <img src="..." /> */}
            <UserCircleIcon className="w-24 h-24 text-blue-500 bg-blue-200 rounded-full" /> 
        </div>
        
        {/* Tên người dùng */}
        <h1 className="text-3xl font-bold text-blue-700">
          {userInfo.name}
        </h1>
      </div>

      {/* 2. Grid Layout: 2 Cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Cột trái: Thông tin người dùng */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm h-full">
          <h2 className="text-xl font-medium text-blue-600 mb-6">
            Thông tin người dùng
          </h2>
          
          <div className="space-y-4 text-gray-800">
            <div>
              <p className="font-semibold text-sm text-gray-900">Mã số sinh viên</p>
              <p className="text-gray-600 mt-1">{userInfo.mssv}</p>
            </div>
            
            <div>
              <p className="font-semibold text-sm text-gray-900">Khoa - Chuyên ngành</p>
              <p className="text-gray-600 mt-1">{userInfo.major}</p>
            </div>

            <div>
              <p className="font-semibold text-sm text-gray-900">Email</p>
              <p className="text-gray-600 mt-1">{userInfo.email}</p>
            </div>

            <div>
              <p className="font-semibold text-sm text-gray-900">Quốc gia</p>
              <p className="text-gray-600 mt-1">{userInfo.country}</p>
            </div>
          </div>
        </div>

        {/* Cột phải: Các khóa học */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm h-full">
          <h2 className="text-xl font-medium text-blue-600 mb-6">
            Các khóa học đang tham gia
          </h2>
          
          <div className="flex flex-col space-y-3">
            {courses.map((course, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
              >
                {course}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountMentee;