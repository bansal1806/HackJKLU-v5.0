import React from 'react';
import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata: Metadata = {
    title: 'Terms & Conditions - HackJKLU v5.0',
    description: 'Terms and Conditions for participating in HackJKLU v5.0.',
    alternates: {
        canonical: '/terms/',
    },
};

export default function TermsPage() {
    return (
        <PolicyLayout title="Terms & Conditions" lastUpdated="March 2026">
            <p>
                Welcome to HackJKLU v5.0! These Terms and Conditions outline the rules and regulations for the use of the HackJKLU website and participation in the event, hosted by JK Lakshmipat University.
            </p>
            <p>
                By registering for and participating in HackJKLU, we assume you accept these terms and conditions. Do not continue to participate if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2>1. Eligibility</h2>
            <ul>
                <li>Participants must be currently enrolled in a recognized university or college.</li>
                <li>Valid institutional ID cards must be presented during check-in at the venue.</li>
                <li>Teams must consist of the number of members specified for each particular event.</li>
            </ul>

            <h2>2. Event Conduct</h2>
            <ul>
                <li>HackJKLU is dedicated to providing a harassment-free experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion.</li>
                <li>We do not tolerate harassment of event participants in any form.</li>
                <li>Participants violating these rules may be sanctioned or expelled from the event at the discretion of the organizers.</li>
            </ul>

            <h2>3. Intellectual Property</h2>
            <ul>
                <li>All projects built during the hackathon remain the intellectual property of the team members who created them.</li>
                <li>However, by participating, you grant JK Lakshmipat University and HackJKLU a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your project for promotional purposes.</li>
                <li>Code must be original. Plagiarism will lead to immediate disqualification.</li>
            </ul>

            <h2>4. Payments and Ticketing</h2>
            <ul>
                <li>Certain events require the purchase of a ticket or an entry fee.</li>
                <li>Prices for all products/services are listed in Indian Rupees (INR, ₹).</li>
                <li>Payment processing is handled via our secure gateway partner, Cashfree.</li>
                <li>Please refer to our <a href="/refunds">Refunds & Cancellations Policy</a> regarding ticket purchases.</li>
            </ul>

            <h2>5. Liability</h2>
            <p>
                JK Lakshmipat University, the HackJKLU organizing committee, and our sponsors shall not be held liable for any loss, damage, injury, or theft of personal property that occurs during the event. Participants are strictly responsible for their own belongings and safety.
            </p>

            <h2>6. Changes to Terms</h2>
            <p>
                We reserve the right to amend these terms and conditions at any time. Any changes will be posted on this page, and by continuing to participate in the event, you agree to be bound by the updated terms.
            </p>

            <h2>Contact Information</h2>
            <p>
                If you have any questions or queries regarding our Terms and Conditions, please contact us at <a href="mailto:hackjklu@jklu.edu.in">hackjklu@jklu.edu.in</a>.
            </p>
        </PolicyLayout>
    );
}
