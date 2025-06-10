
import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = "處理中，請稍候..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-4">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="text-lg text-indigo-600 font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
    