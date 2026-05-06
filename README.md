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

## 🚀 Deployment

### Deploy to Vercel

The project is fully configured for Vercel deployment:

1. **Push your code to GitHub** (or GitLab/Bitbucket)
   ```bash
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your repository
   - Vercel will automatically detect Vite settings
   - Click "Deploy"

**That's it!** Vercel will automatically:
- Run `npm install`
- Run `npm run build`
- Deploy the `dist/` folder
- Set up automatic deployments on push

### Environment Variables (Optional)
If you need to use environment variables:
1. Add them in Vercel dashboard under "Settings" > "Environment Variables"
2. Reference them in your code with `import.meta.env.VITE_*`

### Custom Domain
To set a custom domain:
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

## 🎨 Customization

### Modify Colors
Edit the CSS variables in `src/styles/ChatBot.css`:
```css
:root {
  --primary-dark: #0a0e27;
  --accent-glow: #00d4ff;
  --accent-purple: #7c3aed;
  /* ... more colors */
}
```

### Add New Pages
1. Create a new file in `src/pages/`
2. Import it in `src/App.jsx`
3. Update routing logic as needed

### Add New Components
1. Create component in `src/components/`
2. Export as default
3. Import and use in pages

## 🔌 Backend Integration

To connect with a backend API:

1. **Update your .env file**
   ```
   VITE_API_URL=https://your-api.com
   ```

2. **Create API utility** (`src/utils/api.js`)
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL;
   
   export async function sendMessage(message) {
     const response = await fetch(`${API_URL}/messages`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ message })
     });
     return response.json();
   }
   ```

3. **Update ChatBotPage.jsx**
   ```javascript
   import { sendMessage } from '../utils/api';
   
   const handleSendMessage = async (text) => {
     setMessages(prev => [...prev, { text, isUser: true }]);
     setIsLoading(true);
     
     try {
       const response = await sendMessage(text);
       setMessages(prev => [...prev, { text: response.reply, isUser: false }]);
     } catch (error) {
       console.error('Error:', error);
     } finally {
       setIsLoading(false);
     }
   };
   ```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 🎯 Performance Optimization

This project is optimized for performance:
- **Code Splitting** - Automatic with Vite
- **Lazy Loading** - React.lazy() ready
- **CSS Optimization** - Minified in production
- **Image Optimization** - Ready for optimization
- **Bundle Size** - ~40KB gzipped (React included)

## 🔐 Security

- XSS Protection - React escapes content by default
- HTTPS Ready - Works with HTTPS/WSS
- CORS Configured - Ready for backend integration
- Environment Variables - Sensitive data handled securely

## 📚 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Hosting**: Vercel
- **Styling**: CSS 3
- **Fonts**: Google Fonts (Outfit, Space Mono)

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include browser/OS information
4. Share relevant code snippets

## 🎓 Learning Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [CSS Grid & Flexbox](https://css-tricks.com)

---

**Ready to deploy?** Follow the Vercel deployment instructions above to get your chatbot live in minutes!

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
