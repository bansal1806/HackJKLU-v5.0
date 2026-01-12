import { Story } from '../components/sections/Story';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function About() {
  return (
    <div className="relative min-h-screen">
      <SEOHead
        title="About HACKJKLU 5.0 - The Story Behind the Hackathon"
        description="Discover the epic story behind HACKJKLU 5.0, a hackathon inspired by Greek mythology. Learn about our mission to bring together innovators and create groundbreaking solutions."
        keywords="about HACKJKLU, hackathon story, Greek mythology theme, innovation event, tech community"
        canonicalUrl="/about"
      />
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img src="/About_bg.webp" alt="Background" className="w-full h-full object-cover" />
        {/* Soft black overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Story />
        <PageNavigation />
      </div>
    </div>
  );
}
