import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import hook chuyển trang
import { menteeClassesList } from "../../data/menteeClassesData";
import { MagnifyingGlassIcon, FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import ClassRow from '../../components/ClassRow'; 

const MenteeClassesList = () => {
  // Khởi tạo biến điều hướng
  const navigate = useNavigate();

  const [filter, setFilter] = useState("ongoing"); 
  const [searchTerm, setSearchTerm] = useState("");
  
  const classes = menteeClassesList || [];

  const filteredClasses = classes.filter((classItem) => {
    const matchStatus = filter === "all" ? true : classItem.status === filter;
    const matchSearch = classItem.name 
      ? classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      : true;
    return matchStatus && matchSearch;
  });

  // Hàm xử lý khi sinh viên bấm vào một lớp học
  const handleClassClick = (classId) => {
    // Chuyển hướng đến đường dẫn chi tiết của Mentee
    // Ví dụ: /mentee/classes/CO3001
    navigate(`/mentee/classes/${classId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Các khóa học của tôi
        </h1>

        {/* --- THANH CÔNG CỤ (Giữ nguyên) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-3 relative">
             <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2.5 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-gray-700 cursor-pointer"
             >
                <option value="ongoing">Đang diễn ra</option>
                <option value="completed">Đã kết thúc</option>
                <option value="upcoming">Sắp diễn ra</option>
                <option value="all">Tất cả</option>
             </select>
             <FunnelIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
          </div>

          <div className="md:col-span-6 relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm môn học..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
          </div>

          <div className="md:col-span-3 relative">
             <select className="w-full p-2.5 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-gray-700 cursor-pointer">
                <option>Mới nhất</option>
                <option>Tên A-Z</option>
             </select>
             <ArrowsUpDownIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
          </div>
        </div>

        {/* --- DANH SÁCH LỚP HỌC --- */}
        <div className="flex flex-col gap-3">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((item) => (
              <ClassRow 
                key={item.id}
                courseCode={item.code}       
                courseName={item.name}
                teacherName={item.teacher}
                classId={item.classId}
                
                onClick={() => handleClassClick(item.id)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
                Không tìm thấy lớp học nào.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MenteeClassesList;