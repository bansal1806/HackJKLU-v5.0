import type { Metadata } from 'next';
import { FAQClient } from './FAQClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions - HackJKLU v5.0',
    description:
        'Find answers to common questions about HackJKLU v5.0. Learn about registration, eligibility, rules, and more.',
    keywords:
        'hackathon FAQ, HackJKLU v5.0 questions, registration, eligibility, rules, team formation',
    alternates: {
        canonical: '/faq/',
    },
};

export default function FAQPage() {
    return (
        <>
            <FAQClient />
            <Footer />
            <PageNavigation />
        </>
    );
}
