
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-6 mt-4">
      <div className="flex items-center justify-center space-x-3">
        <SparklesIcon className="w-10 h-10 text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-800">
          AI 旅遊規劃助手
        </h1>
      </div>
      <p className="text-lg text-gray-600 mt-2">
        輸入您的旅遊需求，讓 AI 為您打造完美行程！
      </p>
    </header>
  );
};

export default Header;
    