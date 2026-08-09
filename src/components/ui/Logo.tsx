// src/components/ui/Logo.tsx
import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3"
    >
      <div className="w-8 h-8 relative">
        <svg
          width="32"
          height="21"
          viewBox="0 0 32 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-5 absolute left-0 top-0"
        >
          <path
            d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z"
            fill="#367AFF"
          />
        </svg>
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[9px] h-[9px] absolute left-[21px] top-[18px]"
        >
          <path
            d="M1.62624 0C1.35556 1.14048 0.784104 2.16504 0 2.98592L6.35198 9.3164L8.66319 7.01304L1.62624 0Z"
            fill="#367AFF"
          />
        </svg>
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[5px] h-2.5 absolute left-[18px] top-[21px]"
        >
          <path
            d="M2.92104 0C2.12747 0.80776 1.12462 1.41056 0 1.7212L2.31137 10.318L5.4685 9.47488L2.92104 0Z"
            fill="#367AFF"
          />
        </svg>
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-1.5 h-[9px] absolute left-3 top-[23px]"
        >
          <path
            d="M5.68933 0.0296005C5.16755 0.163281 4.62066 0.23432 4.05706 0.23432C3.45325 0.23432 2.86854 0.15272 2.31346 0L0 8.60464L3.15712 9.44768L5.68933 0.0296005Z"
            fill="#367AFF"
          />
        </svg>
        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[9px] h-[9px] absolute left-[5px] top-[21px]"
        >
          <path
            d="M9.23744 1.74664C8.13 1.42056 7.14498 0.81008 6.36762 0L0 6.346L2.3112 8.64936L9.23744 1.74664Z"
            fill="#367AFF"
          />
        </svg>
        <svg
          width="11"
          height="6"
          viewBox="0 0 11 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-2.5 h-[5px] absolute left-px top-[18px]"
        >
          <path
            d="M10.382 2.94896C9.618 2.13376 9.06147 1.12288 8.79657 0L0 2.34904L0.845954 5.49544L10.382 2.94896Z"
            fill="#367AFF"
          />
        </svg>
      </div>
      <p className="text-[#232323] font-inter text-2xl font-semibold leading-[1.1em] tracking-[-0.04em]">
        Revolutie
      </p>
    </motion.div>
  );
};
