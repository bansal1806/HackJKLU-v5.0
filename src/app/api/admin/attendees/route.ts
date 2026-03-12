import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const password = searchParams.get('password');

        if (password !== '1234') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Fetch all tickets, sorted by newest first
        const tickets = await Ticket.find().sort({ createdAt: -1 }).lean();

        return NextResponse.json({ success: true, count: tickets.length, data: tickets });
    } catch (error: any) {
        console.error('Error fetching attendees:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
