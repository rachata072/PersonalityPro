# Personality WebApp

A modern web application for discovering your personality type through MBTI and Enneagram assessments. Built with React, TypeScript, and Tailwind CSS, featuring a beautiful and responsive design.

## ✨ Features

- **MBTI Personality Test**
  - Complete personality assessment based on Myers-Briggs Type Indicator
  - Interactive question interface
  - Detailed type descriptions and analysis
  - Progress tracking during the test

- **Enneagram Assessment**
  - Comprehensive Enneagram type evaluation
  - User-friendly question format
  - In-depth type descriptions
  - Visual progress indicator

- **Modern User Experience**
  - Smooth animations and transitions
  - Responsive design for all devices
  - Intuitive navigation
  - Beautiful gradient themes
  - Loading states and error handling

- **Additional Features**
  - Save and review your results
  - Share results on social media
  - Navigation between questions
  - Quit and resume functionality

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rachata072/PersonalityPro.git
cd personality-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts

### Project Structure

```
personality-webapp/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API and business logic
│   ├── data/         # Mock data and types
│   ├── styles/       # Global styles
│   └── assets/       # Images and static files
├── public/           # Static assets
├── dist/            # Production build output
└── config files     # Configuration files
```

### Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Social Sharing**: React Share
- **Icons**: Heroicons

## 📦 Deployment

This project is configured for deployment on Netlify:

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Environment variables: None required
4. Redirects: Configured in `netlify.toml`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern web applications
- MBTI and Enneagram type descriptions from various psychology resources
- Icons from Heroicons
- Community feedback and contributions 