import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import logo from '../../assets/logo-bach-khoa.png';

export default function MenteeNavbar() {
  return (
    <nav className="w-full bg-[#007FA2] text-white px-6 shadow-md">
      <div className="w-full mx-auto flex items-center justify-between h-14">
        {/* LEFT SIDE: Logo + Menu */}
        <div className="flex items-center">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-10 w-10 mr-6" />

          {/* Menu */}
          <div className="flex space-x-8 text-sm font-medium">
            <NavLink
              to="/mentee"
              end
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Trang chủ
            </NavLink>

            <NavLink
              to="/mentee/classes"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Danh sách lớp học
            </NavLink>

            <NavLink
              to="/mentee/exam-schedule"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Lịch thi
            </NavLink>

            <NavLink
              to="/mentee/register"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Đăng kí lớp học
            </NavLink>
          </div>
        </div>

        {/* RIGHT SIDE: Icons */}
        <div className="flex items-center space-x-6">
          {/* Bell */}
          <button className="hover:text-gray-200">
            <BellIcon className="h-6 w-6" />
          </button>

          {/* Message */}
          <button className="hover:text-gray-200">
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
          </button>

          {/* User Icon */}
          <button className="hover:text-gray-200">
            <UserCircleIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
    </nav>
  );
}
