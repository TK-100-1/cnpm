import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

/**
 * @param {Array} classes - Danh sách các lớp cần hiển thị
 * @param {Function} onAction - Hàm xử lý khi bấm nút (Chọn hoặc Xóa)
 * @param {String} type - 'available' (cho bảng tìm kiếm) hoặc 'registered' (cho bảng đã đăng ký)
 */
const OpenClassTable = ({ classes, onAction, type = 'available' }) => {
  if (!classes || classes.length === 0) return null;

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white mb-6">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3">Nhóm lớp</th>
            <th className="px-6 py-3">SS Tối đa</th>
            <th className="px-6 py-3">Thứ</th>
            <th className="px-6 py-3">Thời gian</th>
            <th className="px-6 py-3">CS</th>
            <th className="px-6 py-3">Tuần học</th>
            <th className="px-6 py-3 text-center">
              {type === 'available' ? 'Tác vụ' : 'Tình trạng'}
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-900">{item.group}</td>
              <td className="px-6 py-4">{item.maxStudent}</td>
              <td className="px-6 py-4">{item.day}</td>
              <td className="px-6 py-4">{item.time}</td>
              <td className="px-6 py-4">{item.campus}</td>
              <td className="px-6 py-4 font-mono text-xs">{item.weeks}</td>
              
              {/* Cột Tác vụ: Thay đổi dựa theo 'type' */}
              <td className="px-6 py-4 flex justify-center items-center gap-3">
                
                {type === 'available' ? (
                  // === TRƯỜNG HỢP 1: Bảng tìm kiếm ===
                  <button
                    onClick={() => onAction(item)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-xs font-semibold"
                  >
                    Chọn
                  </button>
                ) : (
                  // === TRƯỜNG HỢP 2: Bảng đã đăng ký ===
                  <>
                    <span className="bg-cyan-600 text-white px-3 py-1.5 rounded text-xs font-medium">
                      Chờ xác nhận
                    </span>
                    <button 
                      onClick={() => onAction(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenClassTable;