import type { Metadata } from 'next';
import PartnersSections from '@/components/sections/partners';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { PageScrollbar } from '@/components/ui/PageScrollbar';

export const metadata: Metadata = {
    title: 'Partners & Sponsors - HackJKLU v5.0',
    description:
        'Meet our amazing partners and sponsors who make HackJKLU v5.0 possible. Join forces with leading tech companies and organizations.',
    keywords:
        'hackathon partners, sponsors, HackJKLU v5.0 sponsors, gold partner, tech partners, event sponsors, Ention, WS Cube Tech',
    alternates: {
        canonical: '/partners',
    },
};

export default function PartnersPage() {
    return (
        <>
            <PageScrollbar thumbColor="rgba(192, 192, 192, 0.4)" hoverColor="rgba(220, 220, 220, 0.9)" />
            <PartnersSections />
            <Footer />
            <PageNavigation />
        </>
    );
}
