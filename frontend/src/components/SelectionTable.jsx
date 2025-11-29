import React from 'react';

/**
 * @param {Array} data - Dữ liệu hiển thị
 * @param {Array} selectedIds - Danh sách ID đang được chọn
 * @param {Function} onToggle - Hàm xử lý khi tick vào checkbox
 * @param {String} type - 'mentee' (hiện MSSV) hoặc 'mentor' (hiện MSCB)
 * @param {Boolean} singleSelection - Nếu true, chỉ được chọn 1 người (cho Mentor)
 */
const SelectionTable = ({ data, selectedIds, onToggle, type = 'mentee', singleSelection = false }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden h-[400px] flex flex-col">
      {/* Header tìm kiếm giả lập */}
      <div className="p-3 border-b bg-gray-50">
        <input 
          type="text" 
          placeholder={`Tìm kiếm tên hoặc ${type === 'mentee' ? 'MSSV' : 'MSCB'}...`}
          className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Bảng dữ liệu - Có thanh cuộn nếu danh sách dài */}
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-3 w-10">STT</th>
              <th className="px-4 py-3 w-24">{type === 'mentee' ? 'MSSV' : 'MSCB'}</th>
              <th className="px-4 py-3">Họ và tên</th>
              <th className="px-4 py-3 w-16 text-center">Chọn</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item, index) => {
              // Kiểm tra xem item này có đang được chọn không
              const isChecked = selectedIds.includes(item.id);
              
              // Nếu là chế độ singleSelection (Mentor), và đã có người khác được chọn, 
              // ta có thể làm mờ các ô còn lại (tuỳ chọn), ở đây tôi để checkbox hoạt động kiểu Radio
              
              return (
                <tr key={item.id} className={`border-b hover:bg-blue-50 transition ${isChecked ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-mono">{type === 'mentee' ? item.mssv : item.mscb}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-center">
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => onToggle(item.id)}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </td>
                </tr>
              );
            }) : (
               <tr><td colSpan="4" className="text-center py-4">Không có dữ liệu</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectionTable;