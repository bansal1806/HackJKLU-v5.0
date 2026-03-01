import type { Metadata } from 'next';
import { Events } from '@/components/sections/Events';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';

export const metadata: Metadata = {
    title: 'Events & Activities - HackJKLU v5.0',
    description:
        'Discover the exciting events and activities at HackJKLU v5.0. Workshops, networking sessions, and more.',
    keywords:
        'hackathon events, HackJKLU v5.0 activities, workshops, networking, tech talks',
    alternates: {
        canonical: '/events/',
    },
};

export default function EventsPage() {
    return (
        <>
            <Events />
            <CartDrawer />
            <Footer />
            <PageNavigation />
        </>
    );
}

