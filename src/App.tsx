import { ReactLenis } from 'lenis/react';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { Story } from './components/sections/Story';
import { Characters } from './components/sections/Characters';
import { MapGallery } from './components/sections/MapGallery';
import { Episodes } from './components/sections/Episodes';

function App() {
  return (
    <ReactLenis root>
      <Layout>
        <Hero />
        <Story />
        <Characters />
        <MapGallery />
        <Episodes />
      </Layout>
    </ReactLenis>
  )
}

export default App
