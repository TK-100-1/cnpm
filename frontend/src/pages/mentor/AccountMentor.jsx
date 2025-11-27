import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const AccountMentor = () => {
  // Mock Data - Dữ liệu giả lập từ ảnh
  const mentorInfo = {
    name: "Nguyễn Văn A",
    msgv: "24100XX",
    faculty: "Khoa học và Kỹ thuật máy tính - Ngành Khoa học máy tính",
    email: "Nguyenvana@hcmut.edu.vn",
    position: "Tiến sĩ", // Chức vụ
    expertise: "Khoa học máy tính, AI",
    bio: "Là một giảng viên giàu kinh nghiệm, đã có thâm niên trong nghề giảng dạy, tâm huyết luôn muốn chia sẻ nhiều hơn nữa với những người cùng đam mê, những khóa đào tạo do thầy đứng lớp vừa giúp truyền lửa cho học viên, vừa mang đến những kiến thức và kỹ năng sâu rộng mà bất kì nhà quản lý nào cũng mong muốn có được.",
    publications: [
      "Nguyễn V. A., Trần B., A Scalable Framework for Medical Text Classification, Journal of AI Research, 2023.",
      "Nguyễn V. A., Lê C., Distributed Data Processing for Large-scale Recommendation, IEEE Big Data, 2022.",
      "Nguyễn V. A., Lê C., Distributed Data Processing for Large-scale Recommendation, IEEE Big Data, 2022.",
      "Nguyễn V. A., Lê C., Distributed Data Processing for Large-scale Recommendation, IEEE Big Data, 2022.",
      "Nguyễn V. A., Lê C., Distributed Data Processing for Large-scale Recommendation, IEEE Big Data, 2022."
    ],
    teachingCourses: [
      "CO3029_242_Khai phá dữ liệu_Tên Giảng Viên",
      "CO3032_242_Khai phá dữ liệu_Tên Giảng Viên",
      "CO3031_242_Khai phá dữ liệu_Tên Giảng Viên",
      "CO3033_242_Khai phá dữ liệu_Tên Giảng Viên"
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-white min-h-screen">
      
      {/* 1. HEADER: Avatar + Tên + Nút Cập nhật */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        {/* Left: Avatar & Name */}
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mr-6 overflow-hidden">
             {/* Thay bằng thẻ <img> nếu có ảnh thật */}
            <UserCircleIcon className="w-24 h-24 text-blue-400 bg-blue-100 rounded-full" /> 
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
            {mentorInfo.name}
          </h1>
        </div>

        {/* Right: Button */}
        <button className="bg-[#007FA2] hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow transition duration-200">
          Cập nhật thông tin
        </button>
      </div>

      {/* 2. GRID LAYOUT: Left (Info) & Right (Details) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* === CỘT TRÁI (Chiếm 1 phần) === */}
        <div className="col-span-1 space-y-8">
          
          {/* Card 1: Thông tin người dùng */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-medium text-blue-600 mb-4">
              Thông tin người dùng
            </h2>
            <div className="space-y-4 text-sm md:text-base">
              <div>
                <p className="font-bold text-gray-900">Mã số giảng viên</p>
                <p className="text-gray-600 mt-1">{mentorInfo.msgv}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">Khoa - Chuyên ngành</p>
                <p className="text-gray-600 mt-1">{mentorInfo.faculty}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <p className="text-gray-600 mt-1">{mentorInfo.email}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">Chức vụ</p>
                <p className="text-gray-600 mt-1">{mentorInfo.position}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Các khóa học đang giảng dạy */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm h-fit">
            <h2 className="text-xl font-medium text-blue-600 mb-4">
              Các khóa học đang giảng dạy
            </h2>
            <div className="flex flex-col space-y-2">
              {mentorInfo.teachingCourses.map((course, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-[#007FA2] hover:underline text-sm md:text-base truncate"
                  title={course} // Hover để xem tên đầy đủ nếu bị cắt
                >
                  {course}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* === CỘT PHẢI (Chiếm 2 phần) === */}
        <div className="col-span-1 md:col-span-2">
          
          {/* Card 3: Chi tiết chuyên môn & Giới thiệu */}
          <div className="border border-gray-300 rounded-lg p-8 bg-white shadow-sm h-full">
            
            {/* Lĩnh vực chuyên môn */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Lĩnh vực chuyên môn</h3>
              <p className="text-gray-700">{mentorInfo.expertise}</p>
            </div>

            {/* Giới thiệu */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Giới thiệu</h3>
              <p className="text-gray-700 text-justify leading-relaxed">
                {mentorInfo.bio}
              </p>
            </div>

            {/* Các công trình nghiên cứu */}
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Các công trình nghiên cứu nổi bật</h3>
              <ul className="space-y-4">
                {mentorInfo.publications.map((pub, index) => (
                  <li key={index} className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {pub}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountMentor;