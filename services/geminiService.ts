
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Itinerary, InitialAttractionsResponse, FinalItineraryGeminiResponse } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // This will primarily be an issue during development if .env is not set up.
  // In a deployed environment, this variable should be configured.
  console.error("API_KEY environment variable not found.");
  // alert("Gemini API 金鑰未設定，請檢查環境變數。"); // Avoid alert in service file
}
const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion as we check above.

const MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

const parseJsonFromMarkdown = <T,>(text: string): T | null => {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Original text:", text);
    // Fallback: try parsing without fence removal if initial parse fails
    try {
        return JSON.parse(text.trim()) as T;
    } catch (e2) {
        console.error("Fallback JSON parsing also failed:", e2);
        return null;
    }
  }
};

export const generateInitialAttractions = async (userInput: string): Promise<string[]> => {
  if (!API_KEY) throw new Error("API 金鑰未設定。");
  const prompt = `
你是一位專門規劃台灣旅遊的AI助手。
根據以下使用者需求，請建議一個相關的景點、餐廳或活動的初步清單。
使用者需求：「${userInput}」
請專注於需求中提到的地點、興趣和活動類型。
請僅提供一個包含建議地點名稱的列表，每個地點名稱為一個字串。
輸出格式必須是JSON數組，例如：["景點A", "景點B", "餐廳C"]。
請提供 7 到 10 個建議。
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const attractions = parseJsonFromMarkdown<InitialAttractionsResponse>(response.text);
    
    if (attractions && Array.isArray(attractions)) {
      return attractions.filter(attr => typeof attr === 'string');
    }
    console.warn("Received non-array or invalid format for initial attractions:", attractions);
    return [];
  } catch (error) {
    console.error("Error calling Gemini API for initial attractions:", error);
    throw new Error("AI 建議景點時發生錯誤。");
  }
};

export const generateFinalItinerary = async (tripDescription: string, attractionNames: string[]): Promise<Itinerary> => {
  if (!API_KEY) throw new Error("API 金鑰未設定。");
  const prompt = `
你是一位專業的AI行程規劃師。
使用者正在規劃一趟旅遊，以下是他們的原始需求和最終選擇的景點清單：

原始需求：「${tripDescription}」
使用者選擇的景點清單：${JSON.stringify(attractionNames)}

請根據上述資訊，為使用者規劃一份詳細的每日行程表。
行程應考量地理位置的鄰近性、活動的邏輯順序，並符合原始需求中提到的天數和日期（如果提供）。
請為每個景點或活動提供簡短描述或建議停留時間。

輸出格式必須是JSON物件，結構如下：
{
  "title": "行程標題 (例如：台中三天兩夜精選遊)",
  "destination": "目的地 (例如：台中)",
  "duration": "行程天數 (例如：三天兩夜)",
  "dates": "行程日期 (例如：7月1日 - 7月3日，如果使用者有提供)",
  "days": [
    {
      "day": 1,
      "date": "日期 (例如：2024-07-01，如果可推斷或使用者提供)",
      "theme": "當日主題 (可選，例如：文藝探索日)",
      "activities": [
        "活動1 (例如：早上：參觀國立台灣美術館，欣賞藝術品 - 預計2-3小時)",
        "活動2 (例如：中午：於[推薦餐廳名]享用特色午餐)",
        "活動3 (例如：下午：漫步審計新村，逛文創小店 - 預計2小時)"
      ]
    }
  ]
}
請確保 'activities' 列表中的每個字符串都是一個完整的活動描述。
如果原始需求中包含具體日期，請嘗試在 'dates' 欄位和每日的 'date' 欄位中反映出來。
如果沒有具體日期，可以省略 'dates' 和每日的 'date' 欄位，或者用概括性描述。
目的地、天數、日期等資訊請盡量從原始需求中提取。
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const parsedItinerary = parseJsonFromMarkdown<FinalItineraryGeminiResponse>(response.text);

    if (parsedItinerary && parsedItinerary.title && Array.isArray(parsedItinerary.days)) {
      return parsedItinerary as Itinerary; // Cast, assuming structure matches Itinerary
    }
    console.error("Invalid itinerary format received:", parsedItinerary);
    throw new Error("AI 回傳的行程格式不正確。");
  } catch (error) {
    console.error("Error calling Gemini API for final itinerary:", error);
    throw new Error("AI 規劃行程時發生錯誤。");
  }
};
    