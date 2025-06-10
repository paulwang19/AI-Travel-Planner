
import React, { useState, useCallback } from 'react';
import { AppStep, Itinerary } from './types';
import UserInputForm from './components/UserInputForm';
import AttractionEditor from './components/AttractionEditor';
import ItineraryDisplay from './components/ItineraryDisplay';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { generateInitialAttractions, generateFinalItinerary } from './services/geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.INPUT_DESCRIPTION);
  const [tripDescription, setTripDescription] = useState<string>('');
  const [suggestedAttractions, setSuggestedAttractions] = useState<string[]>([]);
  const [finalItinerary, setFinalItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDescriptionSubmit = useCallback(async (description: string) => {
    setTripDescription(description);
    setIsLoading(true);
    setError(null);
    try {
      const attractions = await generateInitialAttractions(description);
      setSuggestedAttractions(attractions);
      setCurrentStep(AppStep.EDIT_ATTRACTIONS);
    } catch (err) {
      console.error("Error generating initial attractions:", err);
      setError('無法產生建議景點，請稍後再試或調整您的需求描述。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAttractionsFinalized = useCallback(async (finalAttractions: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const itinerary = await generateFinalItinerary(tripDescription, finalAttractions);
      setFinalItinerary(itinerary);
      setCurrentStep(AppStep.VIEW_ITINERARY);
    } catch (err) {
      console.error("Error generating final itinerary:", err);
      setError('無法產生最終行程，請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  }, [tripDescription]);

  const handleReset = () => {
    setCurrentStep(AppStep.INPUT_DESCRIPTION);
    setTripDescription('');
    setSuggestedAttractions([]);
    setFinalItinerary(null);
    setError(null);
    setIsLoading(false);
  };
  
  const renderStepContent = () => {
    if (isLoading) {
      return <LoadingSpinner text={currentStep === AppStep.INPUT_DESCRIPTION || currentStep === AppStep.EDIT_ATTRACTIONS && suggestedAttractions.length === 0 ? "AI 正在為您搜羅景點..." : "AI 正在規劃您的行程..."} />;
    }

    if (error) {
      return (
        <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
          <p className="font-semibold text-lg mb-2">發生錯誤</p>
          <p>{error}</p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
          >
            重新開始
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case AppStep.INPUT_DESCRIPTION:
        return <UserInputForm onSubmit={handleDescriptionSubmit} />;
      case AppStep.EDIT_ATTRACTIONS:
        return (
          <AttractionEditor
            initialAttractions={suggestedAttractions}
            onFinalize={handleAttractionsFinalized}
            onBack={handleReset}
          />
        );
      case AppStep.VIEW_ITINERARY:
        return finalItinerary && <ItineraryDisplay itinerary={finalItinerary} onReset={handleReset} />;
      default:
        return <p>未知的步驟</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 selection:bg-indigo-200 selection:text-indigo-900">
      <Header />
      <main className="container mx-auto max-w-3xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-10 my-8">
        {renderStepContent()}
      </main>
    </div>
  );
};

export default App;
    