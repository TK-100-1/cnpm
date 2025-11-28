import React from 'react';
import { useParams } from 'react-router-dom';
import { menteeClassesDetail } from '../../data/menteeClassesData';

// Trang xem thông tin lớp học cho mentee
// Lấy dữ liệu theo id trên URL (không cần backend)
export default function MenteeClassDetail() {
  const { id } = useParams();
  const classData = menteeClassesDetail[id];

  if (!classData) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-md p-10 text-center text-gray-700">
        Không tìm thấy thông tin lớp học
      </div>
    );
  }

  const { code, name, semester, instructor, email, groups } = classData;

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
      {/* Tiêu đề*/}
      <div className="border-b border-gray-200 px-10 py-8">
        <h1 className="text-2xl font-semibold text-[#0056B3]">
          [{code}] {name}_{semester}_{instructor}_{groups}
        </h1>
      </div>

      {/* Thông tin chi tiết lớp học */}
      <div className="px-10 py-8 space-y-8">
        {/* Thông báo */}
        <section>
          <div className="border border-gray-300 rounded-md p-6 bg-white">
            <h2 className="text-base font-semibold mb-4">Thông báo</h2>
            <div className="text-sm leading-relaxed text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Môn học:</span> {name} ({code})
              </p>
              <p>
                <span className="font-semibold">Giảng viên:</span> {instructor}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {email}
              </p>
              <p className="font-semibold pt-3">Thời khóa biểu:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>{groups} - Thứ 2 tiết 2, 3 phòng H6-201</li>
                <li>{groups} - Thứ 4 tiết 4, 5 phòng H6-201</li>
                <li>{groups} - Thứ 6 tiết 10, 11 phòng H6-301</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tài liệu môn học */}
        <section>
          <div className="border border-gray-300 rounded-md p-6 bg-white">
            <h2 className="text-base font-semibold mb-4">Tài liệu môn học</h2>

            <div className="space-y-2 text-sm text-[#007FA2]">
              {Array.from({ length: 4 }).map((_, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center space-x-2 hover:underline"
                >
                  {/* Icon PDF giả lập */}
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-[#0D99FF] text-[10px] font-semibold text-white mr-1">
                    PDF
                  </span>
                  <span>{`Chapter 1 - Content ${index + 1}`}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Tài liệu tham khảo */}
        <section>
          <div className="border border-gray-300 rounded-md p-6 bg-white">
            <h2 className="text-base font-semibold mb-4">Tài liệu tham khảo</h2>

            <div className="space-y-2 text-sm text-[#007FA2]">
              {Array.from({ length: 3 }).map((_, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#0D99FF] text-[11px] font-semibold text-[#0D99FF] mr-1">
                    i
                  </span>
                  <span>{`Chapter 1 - Content ${index + 1}`}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
