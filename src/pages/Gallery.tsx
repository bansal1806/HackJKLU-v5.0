import { PastPhotos } from '../components/sections/PastPhotos';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function Gallery() {
  return (
    <>
      <SEOHead
        title="Hall of Memories: Gallery - HackJKLU v5.0"
        description="Explore the Hall of Memories. View artifacts from past HackJKLU v5.0 seasons, featuring legendary moments, coding heroes, and mythic creations."
        keywords="hackathon gallery, HackJKLU v5.0 photos, tech event highlights, coding community memories, Hall of Memories"
        canonicalUrl="/gallery"
      />
      <PastPhotos />
      <PageNavigation />
    </>
  );
}
