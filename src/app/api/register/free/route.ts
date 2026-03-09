import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import { eventsData } from '@/data/events';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { eventId, eventTitle, attendeeName, attendeeEmail, attendeePhone, college } = body;

        if (!eventId || !eventTitle || !attendeeName || !attendeeEmail) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        await connectDB();

        // Create ticket
        const newTicket = await Ticket.create({
            ticketId: `FT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            eventId,
            eventTitle,
            attendeeName,
            attendeeEmail,
            attendeePhone: attendeePhone || 'N/A',
            college: college || 'N/A',
            isPaid: false,
            isCheckedIn: false,
        });

        // Send Email (optional/async)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const eventInfo: any = eventsData.find(e => Number(e.id) === Number(eventId)) || eventsData.find(e => e.title === eventTitle) || { time: 'TBD', location: 'Campus' };
            console.log('[register-free] Attempting to send email to:', newTicket.attendeeEmail);

            const nodemailer = await import('nodemailer');
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
            const siteUrl = rawSiteUrl.includes('localhost') ? 'https://hackjklu-v5.vercel.app' : (rawSiteUrl || 'https://hackjklu-v5.vercel.app');
            const posterUrl = eventInfo.poster && eventInfo.poster.startsWith('/') ? `${siteUrl}${eventInfo.poster}` : eventInfo.poster;

            try {
                await transporter.sendMail({
                    from: `"HackJKLU v5.0" <${process.env.EMAIL_USER}>`,
                    to: newTicket.attendeeEmail,
                    replyTo: process.env.EMAIL_USER,
                    subject: `✅ RSVP Confirmed: ${newTicket.eventTitle} — HackJKLU v5.0`,
                    text: `Hi ${newTicket.attendeeName}, your RSVP for ${newTicket.eventTitle} is confirmed! Ticket ID: ${newTicket.ticketId}. Please present your QR code at the venue.`,
                    html: `<!DOCTYPE html><html><body style="background:#020205;color:#ffecd1;font-family:Georgia,serif;padding:32px">
            <div style="max-width:600px;margin:0 auto">
                <h1 style="color:#d4af37;margin-bottom:4px;font-size:28px">HackJKLU v5.0</h1>
                <p style="color:#8b8680;margin:0 0 32px 0;font-size:14px;letter-spacing:2px">RSVP CONFIRMATION</p>
                <p style="margin:0 0 32px 0;font-size:16px">Hi <strong>${newTicket.attendeeName}</strong>, your RSVP for <strong>${newTicket.eventTitle}</strong> is confirmed!</p>
                <h3 style="color:#fff;margin-bottom:20px;text-align:center;font-size:22px;text-transform:uppercase;letter-spacing:4px">Your Digital Boarding Pass</h3>
                ${generateBoardingPassHTML({
                        ticketId: newTicket.ticketId,
                        eventTitle: newTicket.eventTitle,
                        attendeeName: newTicket.attendeeName,
                        venue: eventInfo.location || 'Campus',
                        time: eventInfo.time || 'TBD',
                        posterUrl,
                    })}
                <p style="text-align:center;color:#444;font-size:11px;margin-top:32px">Ticket ID: ${newTicket.ticketId} | Verified Digital Entry Pass</p>
            </div></body></html>`,
                });
                console.log('[register-free] Email sent successfully');
            } catch (emailError: any) {
                console.error('[register-free] Email error:', emailError.message);
            }
        }

        return NextResponse.json({
            success: true,
            ticketId: newTicket.ticketId,
        });
    } catch (err: any) {
        console.error('[register-free]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
