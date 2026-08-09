// src/pages/NotFound/components/Illustration.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '../../../lib/utils';

// Individual SVG parts with animation
const ExclamationMark = ({ delay = 0 }: { delay?: number }) => (
  <motion.g
    initial={{ scale: 0, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay,
    }}
  >
    <path
      d="M79.5899 45.705H74.4844V38.7503C74.4844 32.9521 69.7781 28.2519 63.9724 28.2519C58.1667 28.2519 53.4604 32.9521 53.4604 38.7503V45.705H28.9301L46.5941 15.8392C49.5465 10.8468 47.8878 4.4095 42.889 1.46097C37.8901 -1.48833 31.4444 0.168935 28.492 5.16052L1.46116 50.864C-0.458079 54.1093 -0.487794 58.1337 1.38268 61.4072C3.25392 64.6806 6.73811 66.7016 10.5126 66.7016H53.4612V98.3404C53.4612 104.139 58.1674 108.839 63.9732 108.839C69.7789 108.839 74.4852 104.139 74.4852 98.3404V66.7016H79.5907C85.3964 66.7016 90.1027 62.0015 90.1027 56.2033C90.1019 50.4052 85.3956 45.705 79.5899 45.705Z"
      fill="#FD9E28"
    />
  </motion.g>
);

export const Illustration: React.FC = () => {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      className="relative w-[390px] h-[297px] mx-auto"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 390 297"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main background */}
        <motion.path
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          d="M376.598 0H13.4024C6.00082 0 0 6.00152 0 13.4057V283.519C0 290.923 6.00082 296.925 13.4024 296.925H376.597C383.999 296.925 389.999 290.923 389.999 283.519V13.4057C390 6.00152 383.999 0 376.598 0Z"
          fill="#1685FB"
        />

        {/* Side accent */}
        <motion.path
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          d="M34.9827 283.515V13.4065C34.9827 5.99695 28.9796 0 21.5795 0H0C7.4001 0 13.4032 5.99695 13.4032 13.4065V283.514C13.4032 290.923 7.4001 296.92 0 296.92H21.5795C28.9796 296.92 34.9827 290.924 34.9827 283.515Z"
          fill="#4C60E1"
        />

        {/* Top bar */}
        <motion.path
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          d="M390 58.0518V13.4065C390 5.99695 383.997 0 376.597 0H13.4032C6.00311 0.000761905 0 5.99771 0 13.4065V58.0518H390Z"
          fill="#E3F4FF"
        />

        {/* Top bar side accent */}
        <motion.path
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          d="M34.9827 58.0518V13.4065C34.9827 5.99695 28.9796 0 21.5795 0H0C7.4001 0 13.4032 5.99695 13.4032 13.4065V58.0518H34.9827Z"
          fill="#BDDFF4"
        />

        {/* Circles with bounce animation */}
        {[
          { cx: 44, cy: 29, fill: '#54DDAC', delay: 0.4 },
          { cx: 63, cy: 29, fill: '#FDC142', delay: 0.5 },
          { cx: 82, cy: 29, fill: '#FC3E81', delay: 0.6 },
        ].map((circle, index) => (
          <motion.circle
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: circle.delay,
            }}
            cx={circle.cx}
            cy={circle.cy}
            r="6"
            fill={circle.fill}
          />
        ))}

        {/* Bar indicators */}
        <motion.rect
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          x="105"
          y="23"
          width="33"
          height="12"
          rx="6"
          fill="#BDDFF4"
        />

        <motion.rect
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          x="277"
          y="23"
          width="51"
          height="12"
          rx="6"
          fill="#E3F4FF"
        />

        <motion.rect
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          x="11"
          y="266"
          width="51"
          height="12"
          rx="6"
          fill="#E3F4FF"
        />

        <motion.rect
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.85 }}
          x="11"
          y="284"
          width="51"
          height="12"
          rx="6"
          fill="#E3F4FF"
        />

        {/* Exclamation Marks */}
        <g transform="translate(47, 85)">
          <ExclamationMark delay={0.9} />
          <g transform="translate(206, 0)">
            <ExclamationMark delay={1.1} />
          </g>
        </g>
      </svg>
    </motion.div>
  );
};
