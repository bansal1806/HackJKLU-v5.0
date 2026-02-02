import type { Metadata } from 'next';
import { ItineraryClient } from './ItineraryClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

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
            <ItineraryClient />
            <Footer />
            <PageNavigation />
        </>
    );
}
