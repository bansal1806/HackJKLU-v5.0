import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/index.css';
import Script from 'next/script';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.hackjklu.com'),
    title: {
        default: 'HackJKLU v5.0 | Greek Mythology Themed Hackathon at JKLU',
        template: '%s | HackJKLU v5.0',
    },
    description:
        'Join HackJKLU v5.0, India\'s premier Greek mythology themed hackathon at JK Lakshmipat University. Compete, innovate, and win big prizes. Register now!',
    keywords: [
        'HackJKLU v5.0',
        'hackathon 2026',
        'JKLU hackathon',
        'coding competition',
        'student developers',
        'tech innovation',
        'Jaipur',
        'Greek mythology hackathon',
    ],
    authors: [{ name: 'HACKJKLU Team' }],
    openGraph: {
        type: 'website',
        url: 'https://www.hackjklu.com/',
        title: 'HackJKLU v5.0 | Greek Mythology Themed Hackathon',
        description:
            'Join HackJKLU v5.0, India\'s premier Greek mythology themed hackathon at JK Lakshmipat University. Compete, innovate, and win big prizes!',
        siteName: 'HackJKLU v5.0',
        images: [
            {
                url: '/logo.png?v=5.0.1',
                width: 1200,
                height: 630,
                alt: 'HackJKLU v5.0 - Greek Mythology Themed Hackathon Logo',
            },
        ],
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@hackjklu',
        title: 'HackJKLU v5.0 | Greek Mythology Themed Hackathon',
        description:
            'Join HackJKLU v5.0, India\'s premier Greek mythology themed hackathon at JK Lakshmipat University. Compete, innovate, and win big prizes!',
        images: ['/logo.png?v=5.0.1'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    alternates: {
        canonical: '/',
    },
    icons: {
        icon: '/owl-logo.png',
    },
    other: {
        'theme-color': '#6f1c16',
    },
};

// Structured data for JSON-LD
const structuredData = {
    organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'HackJKLU',
        alternateName: 'HackJKLU v5.0',
        url: 'https://www.hackjklu.com/',
        logo: {
            '@type': 'ImageObject',
            url: 'https://www.hackjklu.com/logo.png?v=5.0.1',
            width: 1200,
            height: 630,
        },
        image: 'https://www.hackjklu.com/logo.png?v=5.0.1',
        description:
            "HackJKLU v5.0 is India's premier Greek mythology themed hackathon at JK Lakshmipat University.",
        foundingDate: '2022',
        parentOrganization: {
            '@type': 'EducationalOrganization',
            name: 'JK Lakshmipat University',
            url: 'https://www.jklu.edu.in/',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jaipur',
            addressRegion: 'Rajasthan',
            addressCountry: 'IN',
        },
    },
    website: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'HackJKLU v5.0',
        alternateName: ['HackJKLU', 'Hack JKLU', 'JKLU Hackathon'],
        url: 'https://www.hackjklu.com/',
        description:
            'Official website of HackJKLU v5.0 - Greek Mythology Themed Hackathon at JK Lakshmipat University',
        publisher: {
            '@type': 'Organization',
            name: 'HackJKLU',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.hackjklu.com/logo.png?v=5.0.1',
            },
        },
        inLanguage: 'en-US',
    },
    event: {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'HackJKLU v5.0',
        description:
            "India's premier Greek mythology themed hackathon at JK Lakshmipat University. Compete, innovate, and win big prizes!",
        url: 'https://www.hackjklu.com/',
        image: 'https://www.hackjklu.com/logo.png?v=5.0.1',
        organizer: {
            '@type': 'Organization',
            name: 'JK Lakshmipat University',
            url: 'https://www.jklu.edu.in/',
            logo: 'https://www.hackjklu.com/logo.png?v=5.0.1',
        },
        location: {
            '@type': 'Place',
            name: 'JK Lakshmipat University',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'JK Lakshmipat University Campus',
                addressLocality: 'Jaipur',
                addressRegion: 'Rajasthan',
                postalCode: '302026',
                addressCountry: 'IN',
            },
        },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        maximumAttendeeCapacity: 500,
        typicalAgeRange: '16-30',
        audience: {
            '@type': 'Audience',
            audienceType: 'Students, Developers, Tech Enthusiasts',
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData.organization),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData.website),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData.event),
                    }}
                />
            </head>
            <body>
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-3Y0KJ5TCMX"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-3Y0KJ5TCMX');
                    `,
                    }}
                />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
