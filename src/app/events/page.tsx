import type { Metadata } from 'next';
import { ComingSoonOverlay } from '@/components/ui/ComingSoonOverlay';
import { Events } from '@/components/sections/Events';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: 'Events & Activities - HackJKLU v5.0',
    description:
        'Discover the exciting events and activities at HackJKLU v5.0. Workshops, networking sessions, and more.',
    keywords:
        'hackathon events, HackJKLU v5.0 activities, workshops, networking, tech talks',
    alternates: {
        canonical: '/events',
    },
};

export default function EventsPage() {
    return (
        <>
            <ComingSoonOverlay>
                <Events />
            </ComingSoonOverlay>
            <Footer />
            <PageNavigation />
        </>
    );
}
