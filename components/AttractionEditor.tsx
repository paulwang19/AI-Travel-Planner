
import React, { useState, useEffect } from 'react';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SparklesIcon } from './icons/SparklesIcon';


interface AttractionEditorProps {
  initialAttractions: string[];
  onFinalize: (finalAttractions: string[]) => void;
  onBack: () => void;
}

const AttractionEditor: React.FC<AttractionEditorProps> = ({ initialAttractions, onFinalize, onBack }) => {
  const [attractions, setAttractions] = useState<string[]>([]);
  const [newAttraction, setNewAttraction] = useState<string>('');

  useEffect(() => {
    setAttractions(initialAttractions);
  }, [initialAttractions]);

  const handleAddAttraction = () => {
    if (newAttraction.trim() && !attractions.includes(newAttraction.trim())) {
      setAttractions([...attractions, newAttraction.trim()]);
      setNewAttraction('');
    }
  };

  const handleRemoveAttraction = (attractionToRemove: string) => {
    setAttractions(attractions.filter(attr => attr !== attractionToRemove));
  };

  const handleSubmit = () => {
    if (attractions.length > 0) {
      onFinalize(attractions);
    } else {
      // Optionally, add a small notification here if desired
      alert("請至少保留或新增一個景點。");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">第二步：調整您的景點清單</h2>
      
      {attractions.length === 0 && (
         <p className="text-center text-gray-500">AI 目前沒有建議任何景點，您可以手動新增想去的景點。</p>
      )}

      {attractions.length > 0 && (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {attractions.map((attraction, index) => (
            <div
              key={`${attraction}-${index}`}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150"
            >
              <span className="text-gray-700">{attraction}</span>
              <button
                onClick={() => handleRemoveAttraction(attraction)}
                className="p-1 text-red-500 hover:text-red-700 transition duration-150"
                aria-label={`移除 ${attraction}`}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 pt-4 border-t border-gray-200">
        <label htmlFor="newAttraction" className="block text-sm font-medium text-gray-700">
          新增景點：
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="newAttraction"
            value={newAttraction}
            onChange={(e) => setNewAttraction(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="例如：審計新村"
          />
          <button
            onClick={handleAddAttraction}
            type="button"
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-sm hover:bg-green-600 transition duration-150 flex items-center disabled:opacity-50"
            disabled={!newAttraction.trim()}
          >
            <PlusIcon className="w-5 h-5 mr-1" /> 新增
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3 pt-6">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition duration-150"
        >
          返回上一步
        </button>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
          disabled={attractions.length === 0}
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          產生最終行程
        </button>
      </div>
    </div>
  );
};

export default AttractionEditor;
    