// src/pages/NotFound/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundProps } from './NotFound.types';
import { BackgroundShapes } from './components/BackgroundShapes';
import { Illustration } from './components/Illustration';

export const NotFound: React.FC<NotFoundProps> = ({
  title = "Looks like you've got lost….",
  message = "The page you're looking for doesn't exist.",
  buttonText = 'Back to Dashboard',
  onButtonClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Shapes */}
      <BackgroundShapes />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-[630px]">
          {/* Card */}
          <div className="relative bg-white rounded-3xl border border-[#B9B9B9] shadow-lg p-8">
            {/* Illustration */}
            <div className="flex justify-center mb-8">
              <Illustration />
            </div>

            {/* Text Content */}
            <div className="text-center">
              <h1 className="text-[32px] font-bold text-[#202224] tracking-[-0.0036em] mb-2">
                {title}
              </h1>
              <p className="text-[#6B7280] text-lg mb-8">{message}</p>

              {/* Button */}
              <button
                onClick={handleClick}
                className="w-full max-w-[418px] mx-auto bg-[#4880FF] hover:bg-[#3770E6] text-white font-bold text-xl py-4 px-6 rounded-lg transition-colors duration-200"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
