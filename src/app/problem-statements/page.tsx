import type { Metadata } from 'next';
import { HallOfOraclesClient } from './HallOfOraclesClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { PageScrollbar } from '@/components/ui/PageScrollbar';

export const metadata: Metadata = {
    title: 'The Sacred Challenges — Hall of Oracles | HackJKLU v5.0',
    description:
        'Behold the Sacred Labors of HackJKLU v5.0. Choose your divine challenge, claim your labor, and etch your name into the stars of Mount Olympus.',
    keywords:
        'problem statements, hackathon challenges, HackJKLU v5.0, divine challenges, labors of Hercules, Greek mythology hackathon, innovation tracks',
    alternates: {
        canonical: '/problem-statements/',
    },
};

export default function HallOfOraclesPage() {
    return (
        <>
            <PageScrollbar thumbColor="rgba(212, 175, 55, 0.4)" hoverColor="rgba(212, 175, 55, 0.9)" />
            <HallOfOraclesClient />
            <Footer />
            <PageNavigation />
        </>
    );
}
