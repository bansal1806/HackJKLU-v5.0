import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Themes } from './pages/Themes';
import { PrizesPage } from './pages/Prizes';
import { Partners } from './pages/Partners';
import { Itinerary } from './pages/Itinerary';
import { Gallery } from './pages/Gallery';
import { FAQPage } from './pages/FAQ';
import { EventsPage } from './pages/Events';
import { ComingSoonOverlay } from './components/ui/ComingSoonOverlay';
import { PageNavigation } from './components/navigation/PageNavigation';
import { SpeakersPage } from './pages/Speakers';
import { CloudTest } from './pages/CloudTest';
import { WhySponsor } from './pages/WhySponsor';
import { CallForProblemStatements } from './pages/CallForProblemStatements';
import { TeamPage } from './pages/Team';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/prizes" element={<PrizesPage />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route
              path="/itinerary"
              element={
                <>
                  <ComingSoonOverlay>
                    <Itinerary />
                  </ComingSoonOverlay>
                  <PageNavigation />
                </>
              }
            />
            <Route
              path="/gallery"
              element={
                <>
                  <Gallery />
                  <PageNavigation />
                </>
              }
            />
            <Route
              path="/faq"
              element={
                <>
                  <FAQPage />
                  <PageNavigation />
                </>
              }
            />
            <Route path="/events"
              element={
                <>
                  <ComingSoonOverlay>
                    <EventsPage />
                  </ComingSoonOverlay>
                  <PageNavigation />
                </>
              }
            />
            <Route path="/sponsor" element={<WhySponsor />} />
            <Route path="/problem-statements" element={<CallForProblemStatements />} />
            <Route path="/challenges" element={<Navigate to="/" replace />} />
            <Route path="/cloud-test" element={<CloudTest />} />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
