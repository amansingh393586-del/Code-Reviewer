# 🚀 AI-Powered Code Review Platform

A full-stack application that provides automated code review using Google's Gemini AI. The platform consists of a React frontend for code submission and a Node.js backend that processes the code through AI analysis.

⚠️ Note: This application only reviews prewritten code and does not generate new code. It provides detailed feedback on existing code but does not write or complete code snippets.

## 🌟 Features

- **Code Editor with AI Review**
  - Syntax highlighting
  - Language auto-detection
  - Dark theme interface
  - Mobile-responsive design

- **🤖 AI Code Review**

  🚀 Real-time code analysis
  
  📌 Detailed feedback on:
  - Code quality
  - Best practices
  - Performance optimization 
  - Potential bugs
  - Security considerations

  📝 Markdown-formatted results

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19
- ⚡ Vite
- ✨ PrismJS for syntax highlighting
- 📜 React Markdown
- 📡 Axios for API calls
- 📝 React Simple Code Editor

### Backend
- 🖥️ Node.js
- 🔄 Express
- 🧠 Google Generative AI (Gemini)
- 🌐 CORS
- 🔑 dotenv

## 📋 Prerequisites

🔹 Node.js (Latest LTS)

🔹 npm (Node Package Manager)

🔹 Google Gemini API Ke

## 🚀 Getting Started

1️⃣ Clone the Repository

    git clone https://github.com/SimerdeepSingh4/code-review.git
    cd ai-code-review

2️⃣ Backend Setup
    
    cd Backend
    npm install


📌 Create a .env file and add your API key
   ```bash
   GOOGLE_GEMINI_KEY=your_key_here
   ```
🔹 Start the Backend Server:
   ```bash
   npx nodemon
   ```

3️⃣ Frontend Setup
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

## 💻 How to Use?

1️⃣ Open http://localhost:5173 in your browser

2️⃣ Paste your code into the editor

3️⃣ Click "Review Code"

4️⃣ View AI-generated code insights!




## 🔧 API Endpoints

📌 Backend (`http://localhost:3000`)

- `GET /` - Health check
- `POST /ai/get-review` - Submit code for review

  ```json
  Body: { "code": "your_code_here" }
  ```

## 📁 Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── public/
└── BackEnd/
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   └── services/
    └── server.js
```
## 🌐 Live Demo
Try out the AI Code Review Platform here:
🔗 https://code-review-theta.vercel.app/

## ⚠️ Note:
This app is hosted on a free-tier server, so the first request may take a few seconds to respond. Please be patient while the backend spins up.

