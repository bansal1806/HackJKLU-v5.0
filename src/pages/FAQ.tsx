import { FAQ } from '../components/sections/FAQ';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function FAQPage() {
  return (
    <>
      <SEOHead
        title="FAQ - HACKJKLU 5.0"
        description="Find answers to frequently asked questions about HACKJKLU 5.0. Get information about registration, rules, prizes, and more."
        keywords="hackathon FAQ, HACKJKLU questions, event information, registration help"
        canonicalUrl="/faq"
        ogType="article"
      />
      <FAQ />
      <PageNavigation />
    </>
  );
}
