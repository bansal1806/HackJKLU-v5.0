# HackJKLU v5.0

A high-performance 3D website for HackJKLU hackathon with Greek mythology theme, featuring stunning visuals, animations, and immersive experiences.

## 🎨 Features

- **Greek Mythology Theme**: Beautiful color palette inspired by ancient Greece
- **3D Models & Animations**: React Three Fiber integration for immersive 3D experiences
- **Multi-Page Routing**: React Router for seamless navigation
- **Performance Optimized**: Adaptive quality system, lazy loading, and smart caching
- **Responsive Design**: Works beautifully on all devices
- **Audio Integration**: Spatial audio support with Howler.js

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bansal1806/hackjklu_v5.0.git
cd hackjklu_v5.0

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the site.

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/              # 3D components (Scene, Model, Camera)
│   ├── audio/           # Audio management
│   ├── layout/          # Layout components
│   ├── navigation/      # Navigation components
│   ├── performance/     # Performance monitoring
│   └── sections/       # Page sections
├── config/              # Configuration (theme, quality presets)
├── hooks/               # Custom React hooks
├── pages/               # Page components
└── utils/               # Utility functions
```

## 🎨 Theme Colors

### Primary Colors
- **Blood Red**: `#6f1c16` - Primary accent, CTAs
- **Void Black**: `#000000` - Backgrounds
- **Terracotta**: `#7e4031` - Secondary accent, borders
- **Golden Amber**: `#ee8a3c` - Call-to-action, glow
- **Ivory Cream**: `#ffecd1` - Text, highlights

### Extended Palette
- Bronze, Olive Green, Marble White, Deep Wine, Gold Shimmer, Stone Gray

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **React Three Fiber** - 3D rendering
- **GSAP** - Animations
- **Howler.js** - Audio
- **Tailwind CSS** - Styling
- **Framer Motion** - UI animations

## 📚 Documentation

- [Tech Stack Guide](./TECH_STACK.md) - Complete technology overview
- [Example Usage](./EXAMPLE_USAGE.md) - Code examples
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

## 🎯 Performance

- Adaptive quality system (High/Medium/Low)
- LOD (Level of Detail) for 3D models
- Lazy loading for components
- Model caching with IndexedDB
- Smart post-processing

## 🚢 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📝 License

This project is for HackJKLU v5.0 event.

## 🔗 Links

- **Live Site**: [hackjklu-v5-0.vercel.app](https://hackjklu-v5-0.vercel.app)
- **Repository**: [github.com/bansal1806/hackjklu_v5.0](https://github.com/bansal1806/hackjklu_v5.0)

---

Built with ❤️ for HackJKLU v5.0
