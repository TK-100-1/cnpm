import React, { useState } from 'react';
import { initialMentees, mentorsList, departments } from '../../data/coordinatorMatchClassData';
import SelectionTable from '../../components/SelectionTable';
import ClassSelectionModal from '../../components/ClassSelectionModal';

const ManualClassAssign = () => {
  // --- STATE ---
  const [mentees, setMentees] = useState(initialMentees); // Danh sách Mentee gốc
  const [mentors] = useState(mentorsList);                // Danh sách Mentor gốc
  
  const [selectedKhoa, setSelectedKhoa] = useState("");   // Filter Khoa
  
  const [selectedMenteeIds, setSelectedMenteeIds] = useState([]); // Array ID
  const [selectedMentorId, setSelectedMentorId] = useState(null); // Single ID

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LOGIC FILTER ---
  // Lọc Mentee theo Khoa
  const filteredMentees = selectedKhoa 
    ? mentees.filter(m => m.department === selectedKhoa) 
    : mentees;

  // Lọc Mentor theo Khoa
  const filteredMentors = selectedKhoa 
    ? mentors.filter(m => m.department === selectedKhoa) 
    : mentors;

  // --- LOGIC CHECKBOX ---
  
  // Xử lý chọn Mentee (Chọn nhiều)
  const handleToggleMentee = (id) => {
    setSelectedMenteeIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Xử lý chọn Mentor (Chỉ chọn 1)
  const handleToggleMentor = (id) => {
    setSelectedMentorId(prev => (prev === id ? null : id));
  };

  // --- LOGIC MODAL & CONFIRM ---

  const handleOpenModal = () => {
    if (selectedMenteeIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 học viên!");
      return;
    }
    if (!selectedMentorId) {
      alert("Vui lòng chọn 1 giảng viên!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmAssign = (classId) => {
    console.log("Đã ghép", selectedMenteeIds, "vào lớp", classId);

    const remainingMentees = mentees.filter(m => !selectedMenteeIds.includes(m.id));
    setMentees(remainingMentees);

    setSelectedMenteeIds([]);
    setSelectedMentorId(null);
    setIsModalOpen(false);

    alert("Ghép lớp thành công!");
  };

  // Tìm thông tin Mentor đang được chọn để truyền vào Modal
  const currentSelectedMentor = mentors.find(m => m.id === selectedMentorId);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Dropdown chọn Khoa */}
          <div className="w-full md:w-1/3">
            <select 
              value={selectedKhoa}
              onChange={(e) => setSelectedKhoa(e.target.value)}
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded shadow-md focus:outline-none cursor-pointer appearance-none"
              style={{ backgroundImage: 'none' }} // Tùy chỉnh CSS nếu cần
            >
              <option value="" className="bg-white text-gray-800">Tất cả các Khoa</option>
              {departments.map(dept => (
                <option key={dept} value={dept} className="bg-white text-gray-800">{dept}</option>
              ))}
            </select>
          </div>

          {/* Buttons Action */}
          <div className="flex gap-3">
            <button 
              onClick={handleOpenModal}
              disabled={selectedMenteeIds.length === 0 || !selectedMentorId}
              className={`px-6 py-2 rounded font-bold shadow-md transition ${
                (selectedMenteeIds.length > 0 && selectedMentorId) 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Ghép nối
            </button>
          </div>
        </div>

        {/* Main Content: 2 Bảng song song */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bảng Trái: Mentee */}
          <div>
            <h2 className="font-bold text-gray-700 mb-2">Danh sách Học viên chờ ghép ({filteredMentees.length})</h2>
            <SelectionTable 
              data={filteredMentees} 
              selectedIds={selectedMenteeIds} 
              onToggle={handleToggleMentee} 
              type="mentee" 
            />
            <p className="text-xs text-gray-500 mt-2 text-right">Đã chọn: {selectedMenteeIds.length}</p>
          </div>

          {/* Bảng Phải: Mentor */}
          <div>
            <h2 className="font-bold text-gray-700 mb-2">Danh sách Giảng viên ({filteredMentors.length})</h2>
            <SelectionTable 
              data={filteredMentors} 
              selectedIds={selectedMentorId ? [selectedMentorId] : []} 
              onToggle={handleToggleMentor} 
              type="mentor" 
              singleSelection={true} 
            />
             <p className="text-xs text-gray-500 mt-2 text-right">
                {selectedMentorId ? "Đã chọn 1 giảng viên" : "Chưa chọn giảng viên"}
             </p>
          </div>

        </div>

        {/* Modal Confirm */}
        <ClassSelectionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmAssign}
          mentor={currentSelectedMentor}
          menteesCount={selectedMenteeIds.length}
        />

      </div>
    </div>
  );
};

export default ManualClassAssign;