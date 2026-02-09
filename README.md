# HackJKLU 5.0 🏛️

A high-performance, immersive 3D website for HackJKLU 5.0 hackathon featuring a stunning Greek mythology theme with cinematic parallax scrolling, interactive 3D elements, and atmospheric animations.

## ✨ Features

### 🎭 Greek Mythology Experience
- **Epic Parallax Journey**: Scroll through three divine realms - Zeus (Sky), Poseidon (Ocean), and Hades (Underworld)
- **Holographic Silhouettes**: Dynamic 3D god silhouettes that appear and transform as you scroll
- **Cloud Parallax System**: Multi-layered cloud animations with depth-based rendering
- **Ariadne's Thread Navigation**: Scroll progress indicator inspired by Greek mythology
- **Dome Gallery**: Interactive 3D sphere gallery showcasing event memories

### 🎨 Visual Excellence
- **Smooth Animations**: Powered by Framer Motion and GSAP
- **Particle Effects**: Atmospheric floating particles with realm-specific behaviors
- **Cloud Transitions**: Seamless page transitions with dynamic cloud effects
- **Responsive Design**: Optimized for all devices with adaptive quality systems
- **Color Transitions**: Smooth realm-based color scheme morphing

### 🚀 Performance Optimized
- **Lazy Loading**: Dynamic imports for heavy components
- **Adaptive Quality**: Screen size-based cloud count and particle optimization
- **Smart Caching**: Efficient resource management
- **DPR Optimization**: Capped pixel ratio for high-DPI displays
- **Frustum Culling**: Only render visible elements

### 📱 Multi-Page Application
- Home (Cloud Parallax)
- About
- Themes
- Prizes
- Events
- Itinerary
- Gallery (Dome Gallery)
- FAQ
- Partners
- Problem Statements

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/bansal1806/hackjklu_v5.0.git
cd HackJKLU-v5.0

# Install dependencies
npm install

# Start development server (with Turbopack)
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
HackJKLU-v5.0/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx             # Home page (Cloud Parallax)
│   │   ├── about/               # About page
│   │   ├── gallery/             # Dome Gallery page
│   │   ├── themes/              # Themes page
│   │   ├── prizes/              # Prizes page
│   │   ├── faq/                 # FAQ page
│   │   ├── itinerary/           # Event schedule
│   │   ├── partners/            # Partners/Sponsors
│   │   └── problem-statements/  # Problem statements
│   ├── components/
│   │   ├── 3d/                  # React Three Fiber 3D components
│   │   ├── audio/               # Howler.js audio management
│   │   ├── effects/             # Visual effects
│   │   ├── layout/              # Layout components (Header, Footer)
│   │   ├── navigation/          # Navigation components
│   │   ├── performance/         # Performance monitoring
│   │   ├── sections/            # Page sections (Hero, Story, FAQ)
│   │   ├── ui/                  # UI components (CountdownTimer, CloudTransition)
│   │   ├── DomeGallery.tsx      # 3D Dome Gallery component
│   │   └── ScrollSnapWrapper.tsx
│   ├── assets/                  # Static assets
│   ├── config/                  # Configuration files
│   ├── constants/               # Constants and enums
│   ├── context/                 # React Context providers
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   └── index.css                # Global styles
├── public/                      # Public assets (images, models, audio)
│   ├── Cloud1-4.webp           # Cloud textures
│   ├── Home/                    # Homepage assets (god silhouettes)
│   └── ...
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Theme & Design

### Color Palette

#### Primary Colors
- **Blood Red**: `#6f1c16` - Primary accent, CTAs
- **Void Black**: `#000000` - Backgrounds
- **Terracotta**: `#7e4031` - Secondary accent, borders
- **Golden Amber**: `#ee8a3c` / `#d4af37` - Highlights, glow effects
- **Ivory Cream**: `#ffecd1` - Text, highlights

#### Realm-Specific Colors
- **Zeus (Sky)**: `#2C3E50` - Slate blue background
- **Poseidon (Ocean)**: `#002b36` - Deep ocean teal
- **Hades (Underworld)**: `#241600` - Dark bronze/black

### Typography
- **Primary**: Cinzel Decorative (Headers)
- **Secondary**: Cormorant Garamond (Body)
- **UI**: System fonts for optimal performance

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type safety

### 3D & Animation
- **[React Three Fiber 8.18](https://docs.pmnd.rs/react-three-fiber/)** - React renderer for Three.js
- **[@react-three/drei 9.122](https://github.com/pmndrs/drei)** - Three.js helpers
- **[@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)** - Post-processing effects
- **[Three.js 0.170](https://threejs.org/)** - 3D library
- **[GSAP 3.12](https://gsap.com/)** - Advanced animations
- **[Framer Motion 12](https://www.framer.com/motion/)** - React animations

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[@tsparticles/react](https://particles.js.org/)** - Particle effects

### Utilities
- **[Howler.js 2.2](https://howlerjs.com/)** - Audio management
- **[Lenis 1.3](https://lenis.darkroom.engineering/)** - Smooth scroll
- **[@use-gesture/react](https://use-gesture.netlify.app/)** - Gesture handling
- **[Leva](https://github.com/pmndrs/leva)** - Debug controls

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization

## 🎯 Key Features Explained

### Cloud Parallax System
The homepage features a custom-built parallax cloud system with:
- **Multi-layered rendering**: Background and foreground clouds on separate canvases
- **3D depth simulation**: Clouds positioned in virtual 3D space with Z-axis depth
- **Scroll-synchronized**: Cloud movement perfectly synced with scroll position
- **Realm transitions**: Dynamic color scheme changes (Zeus → Poseidon → Hades)
- **Performance optimized**: Adaptive cloud count, frustum culling, cached colors

### Dome Gallery
An interactive 3D sphere where images are mapped to a hemisphere:
- **Touch/Mouse controls**: Drag to rotate, scroll to zoom
- **Responsive tiles**: Adaptive sizing based on screen dimensions
- **Smooth interactions**: Inertia-based rotation
- **Performance aware**: Reduced particle count on smaller screens

### Cloud Transitions
Seamless page transitions using animated cloud overlays:
- **Cover transition**: Clouds sweep in from edges
- **Uncover transition**: Clouds part to reveal content
- **No flash**: Prevents white screen during navigation

## 🎮 Usage Examples

### Running in Development
```bash
npm run dev
```
The site will be available at `http://localhost:3000` with hot module replacement.

### Building for Production
```bash
npm run build
```
This creates an optimized production build in the `.next` folder.

### Starting Production Server
```bash
npm run start
```
Serves the production build locally for testing.

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- **Netlify**: Use the Next.js build plugin
- **Cloudflare Pages**: Configure for Next.js
- **Custom Server**: Use `npm run build && npm run start`

**Important**: Ensure environment variables are set if you add API integrations.

## ⚙️ Configuration

### Next.js Config (`next.config.ts`)
- Image optimization with Sharp
- Webpack customizations for GLSL loaders
- Static export configuration

### Tailwind Config
- Custom color scheme
- Greek-themed font families
- Animation utilities

### TypeScript Config
- Strict mode enabled
- Path aliases configured (`@/`)
- Next.js-specific settings

## 🎨 Customization

### Changing Realm Colors
Edit the color schemes in `src/app/page.tsx`:
```typescript
colorSchemes: Record<string, ColorScheme> = {
    sky: { background: [44, 62, 80], overlayColor: [44, 62, 80, 0.3] },
    ocean: { background: [0, 43, 54], overlayColor: [0, 43, 54, 0.3] },
    hades: { background: [36, 22, 0], overlayColor: [212, 175, 55, 0.25] }
};
```

### Adjusting Cloud Count
Modify the adaptive cloud count logic in the `handleResize` function:
```typescript
let cloudCount = 120; // Adjust base count
```

### Customizing Animations
Animation timings are controlled via Framer Motion's `useTransform`:
```typescript
const skyScale = useTransform(smoothScroll, [0, 0.1, 0.25], [1, 1.2, 1.5]);
```

## 📚 Documentation

- **[TECH_STACK.md](./TECH_STACK.md)** - Detailed technology overview
- **[EXAMPLE_USAGE.md](./EXAMPLE_USAGE.md)** - Code examples and patterns
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guidelines

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development setup
- Code style guidelines
- Pull request process
- Issue reporting

## 📝 License

This project is created for **HackJKLU 5.0** event at:
- **JK Lakshmipat University, Jaipur**
- February 2026

## 🔗 Important Links

- **🌐 Live Site**: [hackjklu-v5-0.vercel.app](https://hackjklu-v5-0.vercel.app)
- **📦 Repository**: [github.com/bansal1806/hackjklu_v5.0](https://github.com/bansal1806/hackjklu_v5.0)
- **🏛️ University**: [jklu.edu.in](https://jklu.edu.in)

## 🙏 Acknowledgments

- **Design Inspiration**: Greek mythology and ancient art
- **3D Libraries**: Three.js and React Three Fiber community
- **Optimization**: Next.js and Vercel teams

---

**Built with ❤️ for HackJKLU 5.0**  
*Where Innovation Meets Mythology* 🏛️⚡
