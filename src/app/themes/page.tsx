import type { Metadata } from 'next';
import { Themes } from '@/components/sections/Themes';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { PageScrollbar } from '@/components/ui/PageScrollbar';

export const metadata: Metadata = {
    title: 'Themes - HackJKLU v5.0',
    description:
        'Explore the diverse themes of HackJKLU v5.0 including EdTech, HealthTech, Smart Cities, AgriTech, Environment, Women Safety, and FinTech. Discover focus areas and build innovative solutions.',
    keywords:
        'hackathon themes, EdTech, HealthTech, Smart Cities, AgriTech, Environment, Women Safety, FinTech, HackJKLU v5.0, innovation, technology',
    alternates: {
        canonical: '/themes/',
    },
};

export default function ThemesPage() {
    return (
        <>
            <PageScrollbar thumbColor="rgba(139, 90, 43, 0.4)" hoverColor="rgba(139, 90, 43, 0.9)" />
            <Themes />
            <Footer className="relative z-10" />
            <PageNavigation />
        </>
    );
}

