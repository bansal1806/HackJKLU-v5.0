import type { Metadata } from 'next';
import { ComingSoonOverlay } from '@/components/ui/ComingSoonOverlay';
import { CosmicItinerary } from '@/components/sections/CosmicItinerary';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export const metadata: Metadata = {
    title: 'Event Itinerary - HackJKLU v5.0',
    description:
        'View the complete schedule and itinerary for HackJKLU v5.0. Plan your hackathon experience with our detailed timeline.',
    keywords:
        'hackathon schedule, HackJKLU v5.0 itinerary, event timeline, hackathon agenda',
    alternates: {
        canonical: '/itinerary',
    },
};

export default function ItineraryPage() {
    return (
        <>
            <ComingSoonOverlay>
                <CosmicItinerary />
            </ComingSoonOverlay>
            <PageNavigation />
        </>
    );
}
