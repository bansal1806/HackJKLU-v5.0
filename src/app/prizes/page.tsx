import type { Metadata } from 'next';
import Prizes from '@/components/sections/Prizes';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export const metadata: Metadata = {
    title: 'Grand Prizes & Mythic Rewards - HackJKLU v5.0',
    description:
        'Claim your glory! Explore the grand prizes and mythic rewards awaiting the victors of HackJKLU v5.0. Total prize pool and category awards revealed here.',
    keywords:
        'hackathon prizes, HackJKLU v5.0 rewards, cash prizes, tech goodies, coding competition awards, mythic rewards',
    alternates: {
        canonical: '/prizes',
    },
};

export default function PrizesPage() {
    return (
        <>
            <Prizes />
            <PageNavigation />
        </>
    );
}
