# Deepsearch Chatbot Frontend

A modern, production-grade chatbot interface built with React, Vite, and featuring a stunning cosmic-themed UI. This application is fully optimized for deployment on Vercel.

## 🚀 Features

- **Modern React Architecture** - Built with functional components and React hooks
- **Fast Development** - Vite for lightning-fast builds and hot module replacement
- **Responsive Design** - Fully responsive UI that works on mobile, tablet, and desktop
- **Beautiful UI** - Dark theme with cosmic aesthetics and smooth animations
- **Modular Structure** - Clean, scalable component-based architecture
- **Production Ready** - Optimized for deployment on Vercel
- **Zero Dependencies** - Pure React with no external UI libraries
- **Accessible** - Semantic HTML and keyboard navigation support

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx
│   ├── Message.jsx
│   ├── MessageList.jsx
│   ├── ChatContainer.jsx
│   ├── InputArea.jsx
│   ├── TypingIndicator.jsx
│   └── EmptyState.jsx
├── pages/              # Page components
│   └── ChatBotPage.jsx
├── styles/             # CSS files
│   └── ChatBot.css
├── assets/             # Images and static files
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── index.css           # Global styles

public/                 # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd deepsearch-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (Optional)
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality




## 🎯 Performance Optimization

This project is optimized for performance:
- **Code Splitting** - Automatic with Vite
- **Lazy Loading** - React.lazy() ready
- **CSS Optimization** - Minified in production
- **Image Optimization** - Ready for optimization
- **Bundle Size** - ~40KB gzipped (React included)


## 📚 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Hosting**: Vercel
- **Styling**: CSS 3
- **Fonts**: Google Fonts (Outfit, Space Mono)



