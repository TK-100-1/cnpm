import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import logo from '../../assets/logo-bach-khoa.png';

export default function MentorNavbar() {
  return (
    <nav className="w-full bg-[#007FA2] text-white px-6 shadow-md">
      <div className="w-full mx-auto flex items-center justify-between h-14">
        {/* LEFT: Logo + Menu */}
        <div className="flex items-center">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-10 w-10 mr-6" />

          {/* Menu */}
          <div className="flex space-x-8 text-sm font-medium">
            <NavLink
              to="/mentor"
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
              to="/mentor/classes"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Lớp học phụ trách
            </NavLink>

            <NavLink
              to="/mentor/teaching-schedule"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Lịch giảng dạy
            </NavLink>

            <NavLink
              to="/mentor/open-class"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Đăng kí mở lớp
            </NavLink>
          </div>
        </div>

        {/* RIGHT: Icons */}
        <div className="flex items-center space-x-6">
          {/* Bell */}
          <button className="hover:text-gray-200">
            <BellIcon className="h-6 w-6" />
          </button>

          {/* Message */}
          <button className="hover:text-gray-200">
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
          </button>

          {/* User */}
          <Link to="/mentor/account" className="hover:text-gray-200">
            <UserCircleIcon className="h-7 w-7" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
