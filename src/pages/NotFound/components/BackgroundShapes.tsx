// src/pages/NotFound/components/BackgroundShapes.tsx
import React from 'react';

export const BackgroundShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Background Color */}
      <div className="absolute inset-0 bg-[#4880FF]" />

      {/* Decorative Shapes Container */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Shape 1 - Top Left */}
        <svg
          className="absolute -left-[201px] -top-[722px] w-[895px] h-[895px] opacity-50"
          viewBox="0 0 720 585"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M272.5 895C519.647 895 720 694.647 720 447.5C720 315.376 401.153 424.916 310.095 343C230.823 271.687 387.523 0 272.5 0C25.3526 0 -175 200.353 -175 447.5C-175 694.647 25.3526 895 272.5 895Z"
            fill="#568AFF"
          />
        </svg>

        {/* Shape 2 - Top Right */}
        <svg
          className="absolute top-[181px] right-[-100px] w-[1042px] h-[1042px] opacity-50"
          viewBox="0 0 584 397"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5418"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.00222 -208.471C-41.9634 74.8981 147.247 345.119 430.616 395.085C582.105 421.796 520.972 34.0742 633.302 -53.7682C731.093 -130.241 1010.92 104.351 1034.17 -27.5294C1084.14 -310.898 894.927 -581.119 611.558 -631.085C328.189 -681.051 57.9678 -491.84 8.00222 -208.471Z"
            fill="#568AFF"
          />
        </svg>

        {/* Shape 3 - Bottom Right */}
        <svg
          className="absolute bottom-[-100px] right-[200px] w-[895px] h-[895px] opacity-60"
          viewBox="0 0 821 611"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.6"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M219.512 -233.502C-12.7303 -148.972 -132.476 107.822 -47.9461 340.065C-2.75693 464.221 259.396 252.235 372.979 298.067C471.861 337.967 417.534 646.863 525.62 607.523C757.863 522.994 877.608 266.199 793.079 33.9568C708.549 -198.286 451.755 -318.031 219.512 -233.502Z"
            fill="#568AFF"
          />
        </svg>

        {/* Shape 4 - Bottom Left */}
        <svg
          className="absolute bottom-[-200px] left-[-100px] w-[1150px] h-[1150px] opacity-50"
          viewBox="0 0 575 706"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1141.36 667.565C1196.5 354.826 987.683 56.597 674.944 1.4526C507.754 -28.0274 575.223 399.881 451.251 496.828C343.324 581.226 34.4959 322.32 8.83159 467.869C-46.3128 780.609 162.509 1078.84 475.248 1133.98C787.988 1189.13 1086.22 980.304 1141.36 667.565Z"
            fill="#568AFF"
          />
        </svg>
      </div>
    </div>
  );
};
