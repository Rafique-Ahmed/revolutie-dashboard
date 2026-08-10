// src/pages/dashboard/components/Header.tsx
import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-[70px] flex items-center justify-between px-6">
      {/* Left - Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-[388px] h-[38px] rounded-full border border-[#D5D5D5] bg-[#F5F6FA] pl-12 pr-4 text-sm focus:outline-none focus:border-[#4880FF]"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-6">
        {/* Language */}
        <div className="flex items-center gap-2">
          <img src="/ukflag.png" alt="UK" className="w-10 h-[27px] rounded" />
          <span className="text-sm font-semibold text-[#646464]">English</span>
          <ChevronDown className="w-4 h-4 text-[#646464]" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            6
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <img
            src="/Allefvinicius343875unsplash.png"
            alt="User"
            className="w-11 h-11 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-bold text-[#404040]">Moni Roy</p>
            <p className="text-xs font-semibold text-[#565656]">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-[#646464]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
