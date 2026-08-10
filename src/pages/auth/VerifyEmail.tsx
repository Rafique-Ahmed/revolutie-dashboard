// src/pages/auth/VerifyEmail.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailCheck } from 'lucide-react';
import { AuthLayout } from './components/AuthLayout';
import { Button } from '../../components/ui/Button';
import { fadeInUp } from '../../lib/utils';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = React.useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      // API call here
      console.warn('Resending verification email...');
    } catch (error) {
      console.error('Failed to resend:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="We've sent a verification link to your email address."
      footer={
        <motion.p
          variants={fadeInUp}
          className="text-[#367AFF] font-inter text-lg font-semibold w-full text-center cursor-pointer hover:text-[#2868E6] transition-colors"
          onClick={() => navigate('/login')}
        >
          Back to Sign in
        </motion.p>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[399px]">
        <motion.div
          variants={fadeInUp}
          className="w-24 h-24 rounded-full bg-[#367AFF]/10 flex items-center justify-center"
        >
          <MailCheck className="w-12 h-12 text-[#367AFF]" />
        </motion.div>

        <motion.p variants={fadeInUp} className="text-center text-[#6B7280]">
          Please check your email and click the verification link to activate your account.
        </motion.p>

        <motion.div variants={fadeInUp} className="w-full">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? 'Sending...' : 'Resend Verification Email'}
          </Button>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
