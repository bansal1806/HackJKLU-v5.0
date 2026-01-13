import { FAQ } from '../components/sections/FAQ';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function FAQPage() {
  return (
    <>
      <SEOHead
        title="FAQ - HackJKLU v5.0"
        description="Find answers to frequently asked questions about HackJKLU v5.0. Get information about registration, rules, prizes, and more."
        keywords="hackathon FAQ, HackJKLU v5.0 questions, event information, registration help"
        canonicalUrl="/faq"
        ogType="article"
      />
      <FAQ />
      <PageNavigation />
    </>
  );
}
