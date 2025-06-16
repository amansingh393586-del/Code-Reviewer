# Code Review AI - Frontend

A React-based web application that provides AI-powered code review using a custom backend service.

## Features

- 🖥️ Interactive code editor with syntax highlighting
- 🎨 Dark theme interface
- 📱 Responsive design for mobile and desktop
- 🔍 Automatic language detection
- ✨ Real-time code review using AI
- 📝 Markdown rendering for review results

## Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **PrismJS** - Code syntax highlighting
- **React Markdown** - Markdown rendering
- **React Simple Code Editor** - Code editor component

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Navigate to the Frontend directory
3. Install dependencies:

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Configuration

- **Vite** - Configuration in `vite.config.js`
- **ESLint** - Configuration in `eslint.config.js`
- **React** - Version 19.0.0 with strict mode enabled

## API Integration

The frontend communicates with a backend service running on `http://localhost:3000` for code review functionality. The main endpoint used is:

- `POST /ai/get-review` - Submit code for AI review
