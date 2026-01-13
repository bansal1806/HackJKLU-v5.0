import { CosmicItinerary } from '../components/sections/CosmicItinerary';
import { PageNavigation } from '../components/navigation/PageNavigation';

import { SEOHead } from '../components/ui/SEOHead';

export function Itinerary() {
  return (
    <>
      <SEOHead
        title="Event Itinerary - HackJKLU v5.0"
        description="Check the complete schedule and itinerary for HackJKLU v5.0. Plan your hackathon experience from opening ceremony to final pitches."
        keywords="HackJKLU schedule, hackathon itinerary, event timeline, hackathon agenda"
        canonicalUrl="/itinerary"
      />
      <CosmicItinerary />
      <PageNavigation />
    </>
  );
}
