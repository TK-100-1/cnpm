import React from 'react';
import { Link } from 'react-router-dom';
import { menteeClassesList } from '../../data/menteeClassesData';

export default function MenteeClasses() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white rounded-md shadow-sm border border-gray-200">
        <div className="px-8 py-8 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-[#0056B3]">Các lớp học của tôi</h1>
        </div>

        {/* Mô phỏng bộ lọc và danh sách lớp */}
        <div className="px-8 py-6 space-y-6">
            <section className="border border-gray-200 rounded-md bg-[#fafafa]">
                <div className="px-5 py-4 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-800">Tổng quan về lớp học</h2>
                </div>

                <div className="px-5 py-4 flex flex-col md:flex-row gap-3 md:items-center text-sm">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 outline-none focus:ring-1 focus:ring-[#0D99FF]"
                        defaultValue="all"
                        >
                        <option value="all">All</option>
                    </select>

                    <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 outline-none focus:ring-1 focus:ring-[#0D99FF]"
                    />

                    <button className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 flex items-center justify-between min-w-[180px]">
                        <span>Sort by short name</span>
                        <span className="ml-2 text-gray-500 text-xs">▼</span>
                    </button>

                    <button className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 flex items-center min-w-[80px] justify-between">
                        <span>List</span>
                        <span className="ml-2 text-gray-500 text-xs">▼</span>
                    </button>
                </div>
            </section>

            {/* Danh sách lớp theo học kỳ */}
            <section className="border border-gray-200 rounded-md bg-white overflow-hidden">
                {/* Header học kỳ */}
                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                    <span className="text-[#0D99FF] text-lg">•</span>
                    <span className="font-semibold">Học kỳ (Semester) 1/2025-2026</span>
                    </div>
                </div>

                {/* Các lớp */}
                <div>
                    {menteeClassesList.map((cls, index) => (
                    <div
                        key={cls.id}
                        className={`flex items-stretch px-5 py-4 text-sm ${
                        index !== menteeClassesList.length - 1
                            ? 'border-b border-gray-200'
                            : ''
                        }`}
                    >
                        {/* Ô màu đại diệm */}
                    <div className="w-40 mr-4">
                        <div
                            className={`h-24 rounded-md bg-gradient-to-r ${cls.color} opacity-90`}
                        />
                        </div>

                        {/* Thông tin lớp */}
                        <div className="flex-1 flex flex-col justify-center">
                        <div className="text-xs text-gray-500 mb-1">| {cls.code}</div>
                        <Link
                            to={`/mentee/classes/${cls.id}`}
                            className="text-[#0D99FF] hover:underline text-sm"
                        >
                            {cls.title}
                        </Link>
                        <div className="text-sm text-gray-700 mt-1">{cls.shortName}</div>
                        </div>

                        <div className="flex items-center pl-4 text-gray-400 text-lg cursor-pointer">
                        •••
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
  );
}

