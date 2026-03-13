import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ThemeRegistration from '@/models/ThemeRegistration';

export const dynamic = 'force-dynamic';

const NO_CACHE = { 'Cache-Control': 'no-store' };

function getLimitForDomain(domain: string): number {
    const d = domain.toLowerCase();
    if (d === 'blockchain') return 5;
    if (d === 'webdev') return 2;
    if (d === 'bounty') return 5;
    if (d === 'bounty_tishitu') return 999;
    return 2;
}

// ─── GET: look up a single team by teamNumber ────────────────────────────────
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const teamNumber = searchParams.get('teamNumber')?.trim();

    if (!teamNumber) {
        return NextResponse.json({ error: 'teamNumber is required' }, { status: 400, headers: NO_CACHE });
    }

    await connectDB();
    const existing = await ThemeRegistration.findOne(
        { teamNumber },
        { teamName: 1, domain: 1, problemTitle: 1, problemId: 1 }
    ).lean();

    if (existing) {
        return NextResponse.json({ exists: true, registration: existing }, { status: 200, headers: NO_CACHE });
    }
    return NextResponse.json({ exists: false }, { status: 200, headers: NO_CACHE });
}

// ─── POST: register / update / switch a team's labor ────────────────────────
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { teamName, leaderName, email, phone, teamNumber, domain, problemId, problemTitle } = body;

        if (!teamName || !leaderName || !email || !phone || !teamNumber || !domain || !problemId || !problemTitle) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: NO_CACHE });
        }

        await connectDB();

        // 1. Find if this team already has a registration
        const existing = await ThemeRegistration.findOne({ teamNumber }).lean() as any;

        let oldProblemId: string | null = null;
        let oldCount: number | null = null;

        if (existing) {
            const isSameProblem = existing.problemId === problemId;

            if (isSameProblem) {
                // ── CASE A: same problem → just update their details in place ──
                await ThemeRegistration.updateOne(
                    { teamNumber },
                    { $set: { teamName, leaderName, email, phone, domain, problemTitle } }
                );
                const count = await ThemeRegistration.countDocuments({ problemId });
                console.log(`[Sacred Labors] Updated team ${teamNumber} in place for ${domain}`);
                return NextResponse.json(
                    { message: 'Entry updated successfully!', count, updated: true },
                    { status: 200, headers: NO_CACHE }
                );
            }

            // ── CASE B: different problem → switching ──
            // Check capacity on the NEW problem (excluding current team since they'll move)
            const newProblemCount = await ThemeRegistration.countDocuments({ problemId });
            const limit = getLimitForDomain(domain);
            if (newProblemCount >= limit) {
                return NextResponse.json(
                    { error: 'PROBLEM_FULL', message: 'This problem statement has already reached its team limit.' },
                    { status: 403, headers: NO_CACHE }
                );
            }

            // Remember old problem for count update
            oldProblemId = existing.problemId;

            // Delete old registration
            await ThemeRegistration.deleteOne({ teamNumber });

            // Recalculate old problem count after deletion
            oldCount = await ThemeRegistration.countDocuments({ problemId: oldProblemId });
        } else {
            // ── CASE C: brand new team ──
            const currentCount = await ThemeRegistration.countDocuments({ problemId });
            const limit = getLimitForDomain(domain);
            if (currentCount >= limit) {
                return NextResponse.json(
                    { error: 'PROBLEM_FULL', message: 'This problem statement has already reached its team limit.' },
                    { status: 403, headers: NO_CACHE }
                );
            }
        }

        // Create the new registration
        await ThemeRegistration.create({
            teamName,
            leaderName,
            email,
            phone,
            teamNumber,
            domain,
            problemId,
            problemTitle,
        });

        console.log(`[Sacred Labors] Registered team ${teamNumber} (${teamName}) for ${domain} / ${problemId}`);

        const count = await ThemeRegistration.countDocuments({ problemId });

        return NextResponse.json(
            {
                message: 'Labor accepted successfully!',
                count,
                ...(oldProblemId !== null && { oldProblemId, oldCount }),
            },
            { status: 201, headers: NO_CACHE }
        );

    } catch (error: any) {
        console.error('[Sacred Labors] Registration Error:', error);
        return NextResponse.json(
            { error: 'Failed to process registration', details: error.message },
            { status: 500, headers: NO_CACHE }
        );
    }
}
