import { Hero } from '../components/sections/hero-section';
import { SEOHead } from '../components/ui/SEOHead';

export function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "HACKJKLU 5.0",
    "description": "An immersive hackathon experience inspired by Greek mythology featuring exciting challenges, amazing prizes, and innovative projects.",
    "image": "https://www.hackjklu.com/logo.png",
    "url": "https://www.hackjklu.com",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "organizer": {
      "@type": "Organization",
      "name": "JKLU",
      "url": "https://www.hackjklu.com"
    }
  };

  return (
    <>
      <SEOHead
        title="HACKJKLU 5.0 - Greek Mythology Themed Hackathon"
        description="Join HACKJKLU 5.0, an immersive hackathon experience inspired by Greek mythology. Compete in exciting challenges, win amazing prizes, and connect with innovators from across the globe."
        keywords="hackathon, HACKJKLU 5.0, coding competition, tech event, innovation, Greek mythology, JKLU, programming contest, student hackathon"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <Hero />
    </>
  );
}
