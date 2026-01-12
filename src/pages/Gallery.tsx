import { PastPhotos } from '../components/sections/PastPhotos';
import { PageNavigation } from '../components/navigation/PageNavigation';
import { SEOHead } from '../components/ui/SEOHead';

export function Gallery() {
  return (
    <>
      <SEOHead
        title="Hall of Memories: Gallery - HACKJKLU 5.0"
        description="Explore the Hall of Memories. View artifacts from past HACKJKLU seasons, featuring legendary moments, coding heroes, and mythic creations."
        keywords="hackathon gallery, HACKJKLU photos, tech event highlights, coding community memories, Hall of Memories"
        canonicalUrl="/gallery"
      />
      <PastPhotos />
      <PageNavigation />
    </>
  );
}
