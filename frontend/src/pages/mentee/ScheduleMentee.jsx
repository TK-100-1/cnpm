import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ScheduleMentee = () => {
  // 1. Cấu hình thời gian
  const startHour = 7;
  const endHour = 21;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  // 2. Dữ liệu ngày trong tuần (Mock data giống ảnh)
  const days = [
    { day: 'T2', date: '27/10', fullDate: '2025-10-27' },
    { day: 'T3', date: '28/10', fullDate: '2025-10-28' }, 
    { day: 'T4', date: '29/10', fullDate: '2025-10-29' },
    { day: 'T5', date: '30/10', fullDate: '2025-10-30' },
    { day: 'T6', date: '31/10', fullDate: '2025-10-31' },
    { day: 'T7', date: '01/11', fullDate: '2025-11-01' },
    { day: 'CN', date: '02/11', fullDate: '2025-11-02' },
  ];

  // 3. Dữ liệu Lịch học (Sự kiện)
  const events = [
    {
      id: 1,
      dayIndex: 0, // T2 (0 là thứ 2, 1 là thứ 3...)
      start: 7,    // Bắt đầu 07:00
      end: 9,      // Kết thúc 09:00
      title: 'CO3001 - Công nghệ phần mềm',
      lecturer: 'Tên Giảng Viên'
    },
    {
      id: 2,
      dayIndex: 2, // T4
      start: 10,   // Bắt đầu 10:00
      end: 12,     // Kết thúc 12:00
      title: 'CO3001 - Công nghệ phần mềm',
      lecturer: 'Tên Giảng Viên'
    }
  ];

  // Hàm tính toán vị trí và chiều cao của block lịch
  const getEventStyle = (event) => {
    const duration = event.end - event.start;
    const topPosition = (event.start - startHour) * 60; // 60px mỗi giờ
    const height = duration * 60; 
    return {
      top: `${topPosition}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* HEADER: Tiêu đề + Dropdown + Tháng */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <h1 className="text-3xl font-bold text-blue-700">Lịch</h1>
          
          {/* Dropdown giả lập */}
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 bg-white shadow-sm">
            <span className="mr-2">Tất cả các khóa học</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 md:mt-0">
          <h2 className="text-2xl font-medium text-blue-600">Tháng 10 năm 2025</h2>
        </div>
      </div>

      {/* SCHEDULE GRID */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        
        {/* Row 1: Header Ngày */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          {/* Cột trống góc trái (cho giờ) */}
          <div className="py-4 border-r border-gray-100"></div>
          
          {/* Các ngày trong tuần */}
          {days.map((day, index) => (
            <div key={index} className="py-4 text-center border-r border-gray-100 last:border-r-0">
              <div className="font-bold text-gray-800 text-lg">{day.day}</div>
              <div className="text-gray-500 text-sm">{day.date}</div>
            </div>
          ))}
        </div>

        {/* Row 2: Body Lịch */}
        <div className="grid grid-cols-8 relative" style={{ height: `${hours.length * 60}px` }}>
          
          {/* Cột 1: Giờ (Time Slots) */}
          <div className="border-r border-gray-100 bg-white">
            {hours.map((hour) => (
              <div key={hour} className="h-[60px] text-xs text-gray-500 text-right pr-2 pt-1 relative -top-1">
                {`${hour.toString().padStart(2, '0')}:00`}
              </div>
            ))}
          </div>

          {/* Cột 2-8: Các ngày & Sự kiện */}
          {days.map((dayItem, colIndex) => (
            <div key={colIndex} className="relative border-r border-gray-100 last:border-r-0">
              {/* Dòng kẻ mờ phân chia giờ */}
              {hours.map((h, i) => (
                <div key={i} className="h-[60px] border-b border-gray-50 w-full absolute top-0 left-0" style={{ top: `${i * 60}px` }}></div>
              ))}

              {/* Render Sự kiện (Events) */}
              {events
                .filter(e => e.dayIndex === colIndex)
                .map((event) => (
                  <div
                    key={event.id}
                    className="absolute w-full px-1 py-1 z-10"
                    style={getEventStyle(event)}
                  >
                    <div className="bg-[#FFFDE7] border border-yellow-200 text-gray-800 h-full w-full rounded p-2 text-center flex flex-col justify-center items-center shadow-sm text-xs md:text-sm overflow-hidden">
                      <p className="font-semibold mb-1">
                        [{event.start.toString().padStart(2, '0')}:00 - {event.end.toString().padStart(2, '0')}:00]
                      </p>
                      <p className="font-bold text-gray-900 mb-1 line-clamp-2">
                        {event.title}
                      </p>
                      <p className="text-gray-600 italic">
                        {event.lecturer}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleMentee;