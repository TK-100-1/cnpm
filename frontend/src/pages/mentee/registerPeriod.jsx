import React from 'react';
import { useNavigate } from 'react-router-dom';

const registrationBatches = [
  {
    id: 'HK251',
    term: 'HK251',
    title: 'Đăng ký các học phần có nhu cầu học HK1/2025-2026',
    startTime: '21/08/2025 10:00',
    endTime: '29/08/2025 07:00',
  },
  {
    id: 'HK252',
    term: 'HK252',
    title: 'Đăng ký các học phần có nhu cầu học HK2/2025-2026',
    startTime: '21/12/2025 10:00',
    endTime: '29/12/2025 07:00',
  },
];

export default function MenteeRegisterPeriod() {
  const navigate = useNavigate();

  const handleRegister = (batch) => {
    navigate(`/mentee/register/classes?semester=${batch.term}`);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6">
      {/* Tiêu đề */}
      <h1 className="text-lg font-semibold text-[#0056B3] mb-6">
        Chọn đợt đăng ký môn học
      </h1>

      {/* Bảng các đợt đăng ký */}
      <div className="border border-gray-300 rounded-md overflow-hidden text-xs md:text-sm">
        {/* Header */}
        <div className="grid grid-cols-12 bg-[#2d7fbf] text-white font-semibold">
          <div className="col-span-1 px-4 py-2">STT</div>
          <div className="col-span-6 px-4 py-2">Đợt đăng ký</div>
          <div className="col-span-5 px-4 py-2">Thời gian đăng ký</div>
        </div>

        {/* Dòng dữ liệu */}
        {registrationBatches.map((batch, index) => (
          <div
            key={batch.id}
            className="grid grid-cols-12 border-t border-gray-200 bg-white hover:bg-gray-50"
          >
            <div className="col-span-1 px-4 py-3 flex items-center">
              {index + 1}
            </div>

            <div className="col-span-6 px-4 py-3">
              <button
                type="button"
                onClick={() => handleRegister(batch)}
                className="text-[#0056B3] hover:underline font-semibold"
              >
                {batch.id}
              </button>
              <span className="ml-2 text-gray-700">
                {batch.title} -{' '}
                <span className="text-gray-500">Đăng ký môn học</span>
              </span>
            </div>

            <div className="col-span-5 px-4 py-3 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <span>
                <span className="font-semibold">Từ:</span> {batch.startTime}
              </span>
              <span>
                <span className="font-semibold">Đến:</span> {batch.endTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


