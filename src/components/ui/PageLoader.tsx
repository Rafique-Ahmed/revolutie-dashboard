// src/components/ui/PageLoader.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-[#4880FF] animate-spin" />
        <p className="text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
};

export default PageLoader;
