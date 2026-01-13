import PartnersSections from '../components/sections/partners';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function Partners() {
  return (
    <>
      <SEOHead
        title="Partners & Sponsors - HackJKLU v5.0"
        description="Meet our amazing partners and sponsors who make HackJKLU v5.0 possible. Join forces with leading tech companies and organizations."
        keywords="hackathon partners, sponsors, HackJKLU v5.0 sponsors, tech partners, event sponsors"
        canonicalUrl="/partners"
      />
      <PartnersSections />
      <PageNavigation />
    </>
  );
}
