import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
    title: 'HackJKLU v5.0 - Greek Mythology Themed Hackathon',
    description:
        'Join HackJKLU v5.0, an immersive hackathon experience inspired by Greek mythology. Compete in exciting challenges, win amazing prizes, and connect with innovators from across the globe.',
    keywords:
        'hackathon, HackJKLU v5.0, coding competition, tech event, innovation, Greek mythology, JKLU, programming contest, student hackathon',
    alternates: {
        canonical: '/',
    },
};

export default function HomePage() {
    return <HomePageClient />;
}
