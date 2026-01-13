import { Team } from '../components/sections/Team';
import { PageNavigation } from '../components/navigation/PageNavigation';

import { SEOHead } from '../components/ui/SEOHead';

export function TeamPage() {
  return (
    <>
      <SEOHead
        title="Meet the Team - HackJKLU v5.0"
        description="Meet the core team and organizers behind HackJKLU v5.0. See the people making this Greek mythology themed hackathon a reality."
        keywords="HackJKLU team, organizers, core team, JKLU students, hackathon committee"
        canonicalUrl="/team"
      />
      <Team />
      <PageNavigation />
    </>
  );
}
