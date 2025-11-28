import React, { useMemo, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from 'react-router-dom';
import { menteeRegisterCourses } from '../../data/menteeRegisterCourses';

export default function MenteeRegisterClass() {
  const [searchParams] = useSearchParams();
  const semester = searchParams.get('semester') || 'HK2/2025-2026';

  const [searchTerm, setSearchTerm] = useState(
    menteeRegisterCourses[0]?.id ?? ''
  );
  const [registeredSections, setRegisteredSections] = useState([]);

  // Mô phỏng lọc danh sách môn theo mã hoặc tên (searchTerm)
  const filteredCourses = useMemo(
    () =>
      menteeRegisterCourses.filter((c) =>
        `${c.id} ${c.name}`
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      ),
    [searchTerm]
  );

  const selectedCourse =
    filteredCourses[0] || menteeRegisterCourses[0] || null;

  const handleChooseSection = (course, section) => {
    const exists = registeredSections.some(
      (item) => item.courseId === course.id && item.sectionId === section.id
    );

    if (!exists) {
      setRegisteredSections((prev) => [
        ...prev,
        {
          courseId: course.id,
          courseName: course.name,
          sectionId: section.id,
          ...section,
        },
      ]);
    }
  };

  const handleRemoveSection = (courseId, sectionId) => {
    setRegisteredSections((prev) =>
      prev.filter(
        (item) => !(item.courseId === courseId && item.sectionId === sectionId)
      )
    );
  };

  // Nhóm các lớp đã đăng ký theo môn
  const groupedRegistered = useMemo(() => {
    const map = {};
    registeredSections.forEach((item) => {
      if (!map[item.courseId]) {
        map[item.courseId] = {
          courseId: item.courseId,
          courseName: item.courseName,
          sections: [],
        };
      }
      map[item.courseId].sections.push(item);
    });
    return Object.values(map);
  }, [registeredSections]);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6 space-y-8">
      {/* Tiêu đề trang */}
      <h1 className="text-lg font-semibold text-[#0056B3]">
        Sinh viên đăng ký môn học cần hỗ trợ {semester}
      </h1>

      {/* Chọn môn học */}
      <section className="space-y-3">
        <p className="text-sm text-gray-700 font-medium">Chọn môn học đăng ký</p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập mã hoặc tên môn cần đăng ký (ví dụ: CO3001, Công nghệ phần mềm)"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#0D99FF]"
        />

        {/* Bảng các nhóm lớp của môn đang chọn */}
        {selectedCourse && (
          <div className="border border-gray-300 rounded-md text-xs md:text-sm">
            {/* Header tên môn */}
            <div className="px-4 py-2 border-b border-gray-300 bg-gray-50 text-sm text-gray-800">
              {selectedCourse.name}
            </div>

            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-300 grid grid-cols-12 gap-2 font-semibold bg-white">
              <div className="col-span-1">Nhóm lớp</div>
              <div className="col-span-1 text-center">ĐK/SS</div>
              <div className="col-span-2">Giảng viên</div>
              <div className="col-span-1 text-center">Thứ</div>
              <div className="col-span-2 text-center">Thời gian</div>
              <div className="col-span-1 text-center">Phòng</div>
              <div className="col-span-1 text-center">CS</div>
              <div className="col-span-2 text-center">Tuần học</div>
              <div className="col-span-1 text-center" />
            </div>

            {/* Thông tin chi tiết lớp học */}
            {selectedCourse.sections.map((section) => (
              <div
                key={section.id}
                className="px-4 py-2 border-t border-gray-200 grid grid-cols-12 gap-2 items-center text-gray-700"
              >
                <div className="col-span-1 font-medium">{section.id}</div>
                <div className="col-span-1 text-center">{section.dkss}</div>
                <div className="col-span-2">{section.teacher}</div>
                <div className="col-span-1 text-center">{section.day}</div>
                <div className="col-span-2 text-center">
                  <div>{section.times[0]}</div>
                  <div>{section.times[1]}</div>
                </div>
                <div className="col-span-1 text-center">
                  <div>{section.rooms[0]}</div>
                  <div>{section.rooms[1]}</div>
                </div>
                <div className="col-span-1 text-center">{section.cs}</div>
                <div className="col-span-2 text-center">{section.weeks}</div>
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => handleChooseSection(selectedCourse, section)}
                    className="px-3 py-1 bg-[#0D99FF] text-white rounded text-xs hover:bg-[#0077cc]"
                  >
                    Chọn
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Danh sách môn học đã đăng ký */}
      <section className="space-y-3">
        <p className="text-sm text-gray-700 font-medium">
          Danh sách môn học đã đăng ký
        </p>

        <div className="space-y-4 text-xs md:text-sm">
          {groupedRegistered.length === 0 && (
            <div className="text-gray-500 text-sm">
              Chưa có môn học nào được đăng ký
            </div>
          )}

          {groupedRegistered.map((group) => (
            <div
              key={group.courseId}
              className="border border-gray-300 rounded-md overflow-hidden"
            >
              {/* Header tên môn */}
              <div className="px-4 py-2 border-b border-gray-300 bg-gray-50 text-sm text-gray-800">
                {group.courseName}
              </div>

              {/* Header bảng */}
              <div className="px-4 py-2 border-b border-gray-300 grid grid-cols-12 gap-2 font-semibold bg-white">
                <div className="col-span-1">Nhóm lớp</div>
                <div className="col-span-1 text-center">ĐK/SS</div>
                <div className="col-span-2">Giảng viên</div>
                <div className="col-span-1 text-center">Thứ</div>
                <div className="col-span-2 text-center">Thời gian</div>
                <div className="col-span-1 text-center">Phòng</div>
                <div className="col-span-1 text-center">CS</div>
                <div className="col-span-2 text-center">Tuần học</div>
                <div className="col-span-1 text-center" />
              </div>

              {/* Các lớp đã chọn */}
              {group.sections.map((section) => (
                <div
                  key={section.sectionId}
                  className="px-4 py-2 border-t border-gray-200 grid grid-cols-12 gap-2 items-center text-gray-700"
                >
                  <div className="col-span-1 font-medium">{section.sectionId}</div>
                  <div className="col-span-1 text-center">{section.dkss}</div>
                  <div className="col-span-2">{section.teacher}</div>
                  <div className="col-span-1 text-center">{section.day}</div>
                  <div className="col-span-2 text-center">
                    <div>{section.times[0]}</div>
                    <div>{section.times[1]}</div>
                  </div>
                  <div className="col-span-1 text-center">
                    <div>{section.rooms[0]}</div>
                    <div>{section.rooms[1]}</div>
                  </div>
                  <div className="col-span-1 text-center">{section.cs}</div>
                  <div className="col-span-2 text-center">{section.weeks}</div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() =>
                        handleRemoveSection(group.courseId, section.sectionId)
                      }
                      className="text-red-500 hover:text-red-600 leading-none"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
