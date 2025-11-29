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
    <nav className="w-full bg-[#0388b4] text-white shadow-md">
      <div className="w-full mx-auto flex items-center justify-between h-[58px]">
        {/* LEFT SIDE: Logo + Menu */}
        <div className="flex items-center">
          {/* Logo */}
          <img src={logo} alt="Logo12" className="ml-[32px] w-[39px] h-10 object-cover" />

          {/* Menu */}
          <div className="ml-[24px] flex text-base font-semibold">
            <NavLink
              to="/coordinator"
              end
              className={({ isActive }) =>
                isActive
                  ? 'w-[120px] h-[58px] flex items-center justify-center bg-[#044cc8]'
                  : 'w-[120px] h-[58px] flex items-center justify-center hover:bg-[#0477a1]'
              }
            >
              Trang chủ
            </NavLink>

            <NavLink
              to="/coordinator/manage"
              className={({ isActive }) =>
                isActive
                  ? "w-[120px] h-[58px] flex items-center justify-center bg-[#044cc8]"
                  : "w-[120px] h-[58px] flex items-center justify-center hover:bg-[#0477a1]"
              }
            >
              Quản lý
            </NavLink>

            <NavLink
              to="/coordinator/complaints"
              className={({ isActive }) =>
                isActive
                  ? "w-[120px] h-[58px] flex items-center justify-center bg-[#044cc8]"
                  : "w-[120px] h-[58px] flex items-center justify-center hover:bg-[#0477a1]"
              }
            >
              Khiếu nại
            </NavLink>

            <NavLink
              to="/coordinator/manual-class"
              className={({ isActive }) =>
                isActive
                  ? "w-[170px] h-[58px] flex items-center justify-center bg-[#044cc8]"
                  : "w-[170px] h-[58px] flex items-center justify-center hover:bg-[#0477a1]"
              }
            >
              Ghép lớp thủ công
            </NavLink>

            <NavLink
              to="/coordinator/report"
              className={({ isActive }) =>
                isActive
                  ? "w-[170px] h-[58px] flex items-center justify-center bg-[#044cc8]"
                  : "w-[170px] h-[58px] flex items-center justify-center hover:bg-[#0477a1]"
              }
            >
              Báo cáo hoạt động
            </NavLink>
          </div>
        </div>

        {/* Push content to right margin */}
        <div className="flex-1" />

        {/* RIGHT SIDE: Icons */}
        <div className="flex items-center">
          {/* Bell (Icon 1) */}
          <button className="hover:text-gray-200 mr-[18px]">
            <BellIcon className="h-[25px] w-[25px]" />
          </button>

          {/* Message (Icon 2) */}
          <button className="hover:text-gray-200 mr-[18px]">
            <ChatBubbleLeftEllipsisIcon className="h-[25px] w-[25px]" />
          </button>

          {/* User Icon (Icon 3) */}
          <button className="hover:text-gray-200 mr-[18px]">
            <UserCircleIcon className="h-[40px] w-[40px]" />
          </button>
        </div>
      </div>
    </nav>
  );
}
