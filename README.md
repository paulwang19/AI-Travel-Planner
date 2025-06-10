# AI 旅遊規劃助手

使用 Google Gemini API 的旅遊行程安排助手的網頁應用程式，使用者只需輸入旅遊需求描述，AI 便會自動搜尋相關地點，考量地理位置與活動順序，產生可供調整的景點列表，最終生成一份完整的行程計畫。

## 特色

- 智慧需求分析: 根據需求輸入想法、停靠站、天數、興趣偏好。
- AI 景點建議: AI 會根據您的需求，推薦一系列相關的景點。
- 彈性景點編輯: 自由新增、移除或修改 AI 建議的景點清單。
- 簡潔易用介面: 直觀的操作流程，讓行程規劃輕鬆上手。

## 環境需求

- 網頁瀏覽器，例如: Chrome, Firefox, Edge。
- Google Gemini API 金鑰。

## 本地建置

### 需求

- Node.js

### 步驟

1. Install dependencies: `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app: `npm run dev`
