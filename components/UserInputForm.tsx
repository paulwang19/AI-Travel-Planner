
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface UserInputFormProps {
  onSubmit: (description: string) => void;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description.trim());
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">第一步：告訴我們您的旅遊想法</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="tripDescription" className="block text-sm font-medium text-gray-700 mb-1">
            請描述您的旅遊需求：
          </label>
          <textarea
            id="tripDescription"
            name="tripDescription"
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            placeholder="例如：我想安排 7/1 ~ 7/3 三天兩夜去台中玩，想吃美食、逛市集、找適合拍照的景點..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p className="mt-1 text-xs text-gray-500">提示：越詳細的需求（例如天數、地點、喜好、必去景點），AI 規劃的行程會越精準！</p>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
          disabled={!description.trim()}
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          產生建議景點
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;
    