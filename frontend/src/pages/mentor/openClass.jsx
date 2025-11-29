import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import OpenClassTable from "../../components/OpenClassTable"; // Import bảng tái sử dụng
import { allOpenClasses } from "../../data/openClassesData";  // Import data

const MentorOpenClass = () => {
  // State cho ô tìm kiếm
  const [inputCode, setInputCode] = useState(""); // Giá trị người dùng đang gõ
  const [searchCode, setSearchCode] = useState(""); // Giá trị dùng để tìm kiếm (sau khi nhấn Enter/Search)

  // State lưu danh sách lớp "Có thể đăng ký" (Lấy tất cả ban đầu)
  const [availableList, setAvailableList] = useState(allOpenClasses);

  // State lưu danh sách lớp "Đã đăng ký"
  const [registeredList, setRegisteredList] = useState([]);

  // --- LOGIC TÌM KIẾM ---
  // Lọc danh sách availableList theo mã môn mà người dùng đã nhập
  const displayedAvailableClasses = availableList.filter(
    (cls) => searchCode && cls.code.toLowerCase().includes(searchCode.toLowerCase())
  );

  // --- LOGIC CHỌN LỚP ---
  const handleSelectClass = (classItem) => {
    // Thêm vào danh sách đã đăng ký
    setRegisteredList([...registeredList, classItem]);

    // Xóa khỏi danh sách có thể đăng ký (để không chọn lại được)
    setAvailableList(availableList.filter((c) => c.id !== classItem.id));
  };

  // --- LOGIC XÓA LỚP (Thùng rác) ---
  const handleDeleteClass = (classId) => {
    // Tìm lớp cần xóa
    const classToRestore = registeredList.find((c) => c.id === classId);
    
    // Xóa khỏi danh sách đã đăng ký
    setRegisteredList(registeredList.filter((c) => c.id !== classId));

    // (Tùy chọn) Trả lại vào danh sách có thể đăng ký nếu muốn
    if (classToRestore) {
      setAvailableList([...availableList, classToRestore]);
    }
  };

  // --- LOGIC GOM NHÓM DANH SÁCH ĐÃ ĐĂNG KÝ ---
  // Kết quả mong muốn: { "CO3001": [classA, classB], "MT1005": [classC] }
  const groupedRegisteredClasses = registeredList.reduce((acc, curr) => {
    const key = `${curr.code} - ${curr.name}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-sm min-h-[80vh]">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Giảng viên đăng ký mở lớp hỗ trợ HK2/2025-2026
        </h1>
        <p className="text-gray-600 mb-8">Giảng viên chọn môn học đăng ký mở lớp</p>

        {/* === PHẦN 1: TÌM KIẾM === */}
        <div className="mb-8">
            <div className="relative max-w-md">
                <input 
                    type="text" 
                    className="w-full p-3 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                    placeholder="Nhập mã môn học (VD: CO3001)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setSearchCode(inputCode)}
                />
                <button 
                  onClick={() => setSearchCode(inputCode)}
                  className="absolute right-2 top-2 bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700"
                >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* === PHẦN 2: BẢNG KẾT QUẢ TÌM KIẾM === */}
        {searchCode && (
            <div className="mb-12 animate-fade-in">
                {displayedAvailableClasses.length > 0 ? (
                    <>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                           {displayedAvailableClasses[0].code} - {displayedAvailableClasses[0].name}
                        </h2>
                        
                        {/* Sử dụng Component Bảng với type='available' */}
                        <OpenClassTable 
                            classes={displayedAvailableClasses} 
                            onAction={handleSelectClass} 
                            type="available" 
                        />
                    </>
                ) : (
                    <p className="text-red-500 italic">Không tìm thấy lớp học nào với mã này hoặc lớp đã được chọn.</p>
                )}
            </div>
        )}

        {/* === PHẦN 3: DANH SÁCH ĐÃ ĐĂNG KÝ (Gom nhóm) === */}
        {registeredList.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Danh sách môn học đã đăng ký mở lớp
                </h2>

                {/* Duyệt qua từng nhóm môn học để hiển thị */}
                {Object.keys(groupedRegisteredClasses).map((groupKey) => (
                    <div key={groupKey} className="mb-8">
                        {/* Tên môn học */}
                        <h3 className="text-md font-semibold text-gray-600 mb-3 ml-1 border-l-4 border-blue-500 pl-3">
                            {groupKey}
                        </h3>

                        {/* Bảng các lớp thuộc môn đó - type='registered' */}
                        <OpenClassTable 
                            classes={groupedRegisteredClasses[groupKey]} 
                            onAction={handleDeleteClass} 
                            type="registered" 
                        />
                    </div>
                ))}
            </div>
        )}

        {/* Footer */}
        <div className="mt-8 flex justify-end">
             <button className="border border-gray-400 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 cursor-not-allowed opacity-70">
                Giảng viên gửi yêu cầu mở lớp bổ sung tại đây
             </button>
        </div>

      </div>
    </div>
  );
};

export default MentorOpenClass;