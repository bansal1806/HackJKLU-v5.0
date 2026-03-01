import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ThemeRegistration from '@/models/ThemeRegistration';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Destructure to ensure we only get fields we want
        const { teamName, leaderName, email, phone, domain, problemId, problemTitle } = body;
        
        // Basic validation
        if (!teamName || !leaderName || !email || !phone || !domain || !problemId || !problemTitle) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Connect to MongoDB
        await connectToDatabase();

        // Create new registration record
        const registration = await ThemeRegistration.create({
            teamName,
            leaderName,
            email,
            phone,
            domain,
            problemId,
            problemTitle,
        });

        console.log(`[Sacred Labors] Successfully registered team: ${teamName} for ${domain}`);

        return NextResponse.json(
            { message: 'Labor accepted successfully!', data: registration },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('[Sacred Labors] Registration Error:', error);
        return NextResponse.json(
            { error: 'Failed to process registration', details: error.message },
            { status: 500 }
        );
    }
}
