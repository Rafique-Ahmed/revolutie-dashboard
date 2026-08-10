// src/components/layout/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../pages/dashboard/components/Sidebar';
import { Header } from '../../pages/dashboard/components/Header';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-[72px]' : 'ml-[247px]'
      }`}>
        <Header />
        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
