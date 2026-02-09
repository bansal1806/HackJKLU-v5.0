import type { Metadata } from 'next';
import { ProblemStatementsClient } from './ProblemStatementsClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: 'Call for Problem Statements - HackJKLU v5.0',
    description:
        'Submit your problem statements for HackJKLU v5.0. Share challenges from your organization or community for hackers to solve.',
    keywords:
        'problem statements, hackathon challenges, HackJKLU v5.0, submit problems, innovation challenges',
    alternates: {
        canonical: '/problem-statements/',
    },
};

export default function ProblemStatementsPage() {
    return (
        <>
            <ProblemStatementsClient />
            <Footer />
            <PageNavigation />
        </>
    );
}
