
import React from 'react';
import { Itinerary, DayPlan } from '../types';
import { MapPinIcon, CalendarDaysIcon, SunIcon, SparklesIcon } from './icons/SparklesIcon'; // Using SparklesIcon as placeholder

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onReset: () => void;
}

const DayCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <div className="flex items-center mb-4">
      <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-3 shadow-md">
        {dayPlan.day}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-indigo-700">
          第 {dayPlan.day} 天 {dayPlan.date && `(${dayPlan.date})`}
        </h3>
        {dayPlan.theme && <p className="text-sm text-indigo-500">{dayPlan.theme}</p>}
      </div>
    </div>
    <ul className="space-y-3 list-none pl-0">
      {dayPlan.activities.map((activity, index) => (
        <li key={index} className="flex items-start text-gray-700">
          <SparklesIcon className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
          <span>{activity}</span>
        </li>
      ))}
    </ul>
  </div>
);


const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{itinerary.title}</h2>
        <div className="flex items-center justify-center space-x-4 text-gray-600">
          {itinerary.destination && (
            <span className="flex items-center"><MapPinIcon className="w-5 h-5 mr-1 text-red-500" />{itinerary.destination}</span>
          )}
          {itinerary.duration && (
            <span className="flex items-center"><CalendarDaysIcon className="w-5 h-5 mr-1 text-blue-500" />{itinerary.duration}</span>
          )}
          {itinerary.dates && (
            <span className="flex items-center"><SunIcon className="w-5 h-5 mr-1 text-yellow-500" />{itinerary.dates}</span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {itinerary.days.map((dayPlan) => (
          <DayCard key={dayPlan.day} dayPlan={dayPlan} />
        ))}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
        >
          重新規劃行程
        </button>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
    