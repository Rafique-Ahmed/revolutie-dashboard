// src/pages/auth/components/AuthIllustration.tsx
import React from 'react';
import { motion } from 'framer-motion';

export const AuthIllustration: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="hidden lg:block flex-1"
    >
      <div className="flex p-3 items-start gap-2.5 w-full h-full">
        <div className="flex items-start gap-2.5 rounded-3xl w-full h-full bg-gradient-to-br from-[#367AFF] to-[#4C60E1] overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/10"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-white/5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Revolutie</h2>
            <p className="text-xl opacity-80">Modern SaaS Dashboard</p>
            <div className="mt-8 flex gap-4 justify-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                🚀
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                📊
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                🔐
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
