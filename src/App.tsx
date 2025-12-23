import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Themes } from './pages/Themes';
import { PrizesPage } from './pages/Prizes';
import { Partners } from './pages/Partners';
import { Itinerary } from './pages/Itinerary';
import { SpeakersPage } from './pages/Speakers';
import { Gallery } from './pages/Gallery';
import { FAQPage } from './pages/FAQ';
import { TeamPage } from './pages/Team';
import { EventsPage } from './pages/Events';

function App() {
  return (
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/prizes" element={<PrizesPage />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
      </Layout>
  );
}

export default App;
