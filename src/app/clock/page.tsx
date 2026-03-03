import type { Metadata } from 'next';
import { ClockClient } from './ClockClient';

export const metadata: Metadata = {
    title: 'Clock — HackJKLU v5.0',
    description: 'Countdown to HackJKLU v5.0 — the Greek mythology themed hackathon at JK Lakshmipat University.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function ClockPage() {
    return <ClockClient />;
}
