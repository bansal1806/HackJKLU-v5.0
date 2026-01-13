import { Speakers } from '../components/sections/Speakers';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function SpeakersPage() {
  return (
    <main>
      <SEOHead
        title="Speakers & Mentors - HackJKLU v5.0"
        description="Learn from industry experts and mentors at HackJKLU v5.0. Connect with inspiring speakers who will guide you through your hackathon journey."
        keywords="hackathon speakers, mentors, tech experts, industry leaders, HackJKLU v5.0 speakers"
        canonicalUrl="/speakers"
      />
      <Speakers />
      <PageNavigation />
    </main>
  );
}
