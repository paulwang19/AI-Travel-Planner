
export enum AppStep {
  INPUT_DESCRIPTION = 'INPUT_DESCRIPTION',
  EDIT_ATTRACTIONS = 'EDIT_ATTRACTIONS',
  VIEW_ITINERARY = 'VIEW_ITINERARY',
}

export interface DayPlan {
  day: number;
  date?: string;
  theme?: string;
  activities: string[];
}

export interface Itinerary {
  title: string;
  destination: string;
  duration: string;
  dates?: string;
  days: DayPlan[];
}

// For parsing Gemini's initial list of attraction names
export type InitialAttractionsResponse = string[];

// For parsing Gemini's final itinerary JSON
export interface FinalItineraryGeminiResponse {
  title: string;
  destination: string;
  duration: string;
  dates?: string;
  days: Array<{
    day: number;
    date?: string;
    theme?: string;
    activities: string[];
  }>;
}
    