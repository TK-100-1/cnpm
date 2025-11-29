import React, { useState } from 'react';

const ClassSelectionModal = ({ isOpen, onClose, onConfirm, mentor, menteesCount }) => {
  const [selectedClassId, setSelectedClassId] = useState("");

  if (!isOpen || !mentor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 animate-fade-in-down">
        
        {/* Header Modal */}
        <h3 className="text-lg font-bold text-blue-700 mb-2">
          Xác nhận ghép nối các học viên vào lớp:
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Bạn đang ghép <span className="font-bold text-black">{menteesCount} học viên</span> vào lớp của Giảng viên <span className="font-bold text-black">{mentor.name}</span>.
        </p>

        {/* Danh sách lớp để chọn (Radio button) */}
        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
          {mentor.classes && mentor.classes.length > 0 ? (
            mentor.classes.map((cls) => (
              <label 
                key={cls.id} 
                className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${selectedClassId === cls.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              >
                <input 
                  type="radio" 
                  name="class-selection"
                  value={cls.id}
                  checked={selectedClassId === cls.id}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">{cls.name}</span>
              </label>
            ))
          ) : (
            <p className="text-red-500 text-sm">Giảng viên này chưa mở lớp nào.</p>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
          >
            Hủy
          </button>
          <button 
            onClick={() => onConfirm(selectedClassId)}
            disabled={!selectedClassId} // Không cho bấm nếu chưa chọn lớp
            className={`px-4 py-2 text-white rounded font-medium ${selectedClassId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Xác nhận
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClassSelectionModal;