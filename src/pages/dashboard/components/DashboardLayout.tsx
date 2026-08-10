// src/pages/dashboard/components/DashboardLayout.tsx
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Sidebar />
      <div className="ml-[247px]">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
