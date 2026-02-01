import type { Metadata } from 'next';
import { Speakers } from '@/components/sections/Speakers';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export const metadata: Metadata = {
    title: 'Speakers & Judges - HackJKLU v5.0',
    description:
        'Meet the industry experts, mentors, and judges who will guide and evaluate at HackJKLU v5.0.',
    keywords:
        'hackathon speakers, judges, mentors, HackJKLU v5.0, industry experts',
    alternates: {
        canonical: '/speakers',
    },
};

export default function SpeakersPage() {
    return (
        <>
            <Speakers />
            <PageNavigation />
        </>
    );
}
