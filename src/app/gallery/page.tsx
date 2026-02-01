import type { Metadata } from 'next';
import DomeGallery from '@/components/DomeGallery';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export const metadata: Metadata = {
    title: 'Past Photos & Gallery - HackJKLU v5.0',
    description:
        'Relive the moments from previous HackJKLU editions. Browse through our immersive 3D gallery of photos capturing the innovation, collaboration, and excitement.',
    keywords:
        'hackathon gallery, HackJKLU photos, past events, hackathon moments, event photography, 3D gallery',
    alternates: {
        canonical: '/gallery',
    },
};

export default function GalleryPage() {
    return (
        <>
            <DomeGallery />
            <PageNavigation />
        </>
    );
}
