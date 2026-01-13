import { Events } from '../components/sections/Events';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function EventsPage() {
  return (
    <>
      <SEOHead
        title="Side Events & Activities - HackJKLU v5.0"
        description="Join the exciting side events at HackJKLU v5.0 including Gaming Night (Valorant & FIFA), Midnight Jam sessions, and Campus-wide Treasure Hunts."
        keywords="HackJKLU v5.0 events, gaming night, Valorant tournament, FIFA competition, midnight jam, treasure hunt, hackathon activities"
        canonicalUrl="/events"
      />
      <Events />
      <PageNavigation />
    </>
  );
}
