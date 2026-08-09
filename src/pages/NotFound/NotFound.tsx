// src/pages/NotFound/NotFound.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NotFoundProps } from './NotFound.types';
import { BackgroundShapes } from './components/BackgroundShapes';
import { Illustration } from './components/Illustration';
import { Button } from '../../components/ui/Button';
import { pageVariants, staggerContainer, fadeInUp } from '../../lib/utils';

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
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Background Shapes */}
      <BackgroundShapes />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full max-w-[630px]"
        >
          {/* Card */}
          <motion.div
            variants={fadeInUp}
            className="relative bg-white rounded-3xl border border-[#B9B9B9] shadow-lg p-8"
          >
            {/* Illustration */}
            <div className="flex justify-center mb-8">
              <Illustration />
            </div>

            {/* Text Content */}
            <motion.div variants={fadeInUp} className="text-center">
              <motion.h1
                variants={fadeInUp}
                className="text-[32px] font-bold text-[#202224] tracking-[-0.0036em] mb-2"
              >
                {title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-[#6B7280] text-lg mb-8">
                {message}
              </motion.p>

              {/* Button */}
              <motion.div variants={fadeInUp}>
                <Button
                  onClick={handleClick}
                  variant="primary"
                  size="xl"
                  fullWidth
                  className="max-w-[418px] mx-auto"
                >
                  {buttonText}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
