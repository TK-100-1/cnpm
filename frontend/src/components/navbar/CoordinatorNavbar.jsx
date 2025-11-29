import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import logo from '../../assets/logo-bach-khoa.png';

export default function CoordinatorNavbar() {
  return (
    <nav className="w-full bg-[#007FA2] text-white px-6 shadow-md">
      <div className="w-full mx-auto flex items-center justify-between h-14">
        {/* LEFT SIDE: Logo + Menu */}
        <div className="flex items-center">
          {/* Logo */}
          <img src={logo} alt="Logo12" className="h-10 w-10 mr-6" />

          {/* Menu */}
          <div className="flex space-x-8 text-sm font-medium">
            <NavLink
              to="/coordinator"
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
              to="/coordinator/manage"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Quản lý
            </NavLink>

            <NavLink
              to="/coordinator/complaints"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Khiếu nại
            </NavLink>

            <NavLink
              to="/coordinator/manual-class"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Ghép lớp thủ công
            </NavLink>

            <NavLink
              to="/coordinator/report"
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-2 bg-blue-700 rounded'
                  : 'px-3 py-2 hover:bg-blue-600 rounded'
              }
            >
              Báo cáo hoạt động
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
