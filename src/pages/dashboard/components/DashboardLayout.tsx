// src/pages/dashboard/components/DashboardLayout.tsx
import React from 'react';
import { MainLayout } from '../../../components/layout/MainLayout';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default DashboardLayout;
