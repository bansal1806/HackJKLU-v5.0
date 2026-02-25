import type { Metadata } from 'next';
import { HomePageClient } from '../HomePageClient';

export const metadata: Metadata = {
    title: 'HackJKLU v5.0 - Archive Home Page',
    description: 'Previous version of the HackJKLU v5.0 home page with traditional hero section and global particles.',
    keywords: 'HackJKLU v5.0, archive, previous home page, hero section',
    alternates: {
        canonical: '/home-archive',
    },
};

export default function HomeArchivePage() {
    return <HomePageClient />;
}