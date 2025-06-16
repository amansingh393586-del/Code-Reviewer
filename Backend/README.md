# Code Review AI - Backend

A Node.js backend service that provides AI-powered code review using Google's Gemini API.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Navigate to the BackEnd directory
3. Install dependencies:

```bash
npm install
```

## Required Packages

The following npm packages are required:

- **@google/generative-ai** (^0.21.0) - Google's Generative AI SDK
- **express** (^4.21.2) - Web application framework
- **cors** (^2.8.5) - Cross-Origin Resource Sharing middleware
- **dotenv** (^16.4.7) - Environment variables loader
- **nodemon** (^3.0.0) - Development dependency for auto-restarting server

## Environment Variables

Create a `.env` file in the root directory with:

```env
GOOGLE_GEMINI_KEY=your_gemini_api_key_here
```

## Running the Server

Start the development server using:

```bash
npx nodemon
```

The server will run on http://localhost:3000

## API Endpoints

- `GET /` - Health check endpoint
- `POST /ai/get-review` - Submit code for AI review
  - Body: `{ "code": "your code here" }`

## Scripts

- `npx nodemon` - Start the development server with auto-reload
- `npm test` - Run tests (not implemented yet)