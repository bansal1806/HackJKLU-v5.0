import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { eventId, eventTitle, attendeeName, attendeeEmail, attendeePhone, college } = body;

        if (!eventId || !eventTitle || !attendeeName || !attendeeEmail || !attendeePhone || !college) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await connectDB();

        // Check if already registered for this event
        const existingTicket = await Ticket.findOne({
            eventId,
            attendeeEmail: attendeeEmail.toLowerCase(),
        });

        if (existingTicket) {
            return NextResponse.json({ error: 'You have already registered for this event.' }, { status: 400 });
        }

        const ticketId = crypto.randomUUID();

        const newTicket = await Ticket.create({
            ticketId,
            eventId,
            eventTitle,
            attendeeName,
            attendeeEmail: attendeeEmail.toLowerCase(),
            attendeePhone,
            college,
            isPaid: false,
        });

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            console.log('[register-free] Attempting to send email to:', newTicket.attendeeEmail);
            console.log('[register-free] Using EMAIL_USER:', process.env.EMAIL_USER);
            try {
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

                const info = await transporter.sendMail({
                    from: `"HackJKLU" <${process.env.EMAIL_USER}>`,
                    to: newTicket.attendeeEmail,
                    subject: `✅ RSVP Confirmed: ${newTicket.eventTitle} — HackJKLU v5.0`,
                    html: `<!DOCTYPE html><html><body style="background:#0c0a09;color:#ffecd1;font-family:Georgia,serif;padding:32px">
            <div style="max-width:580px;margin:0 auto">
                <h1 style="color:#d4af37">HackJKLU v5.0</h1>
                <p style="color:#8b8680;margin-top:0">RSVP Confirmation</p>
                <hr style="border-color:#d4af37;opacity:.3"/>
                <p>Hi <strong>${newTicket.attendeeName}</strong>, your RSVP for <strong>${newTicket.eventTitle}</strong> is confirmed!</p>
                <div style="margin: 32px 0; text-align: center; border: 1px solid #d4af3733; padding: 24px; border-radius: 8px; background: #1a1a1a;">
                    <p style="color: #d4af37; font-size: 18px; font-weight: bold; margin-top: 0;">${newTicket.eventTitle}</p>
                    <p style="color: #8b8680; font-size: 14px; margin-bottom: 20px;">Ticket ID: ${newTicket.ticketId}</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${newTicket.ticketId}" alt="QR Code" width="250" height="250" style="border-radius: 8px; border: 4px solid white;" />
                </div>
                <p style="text-align: center; color: #8b8680; margin-bottom: 20px; font-size: 14px;">Please present this QR code at the venue for check-in.</p>
                <hr style="border-color:#d4af37;opacity:.3"/>
                <p style="text-align:center;color:#8b8680;font-size:12px">— Team HackJKLU</p>
            </div></body></html>`,
                });
                console.log('[register-free] Email sent successfully:', info.messageId);
            } catch (emailError: any) {
                console.error('[register-free] Email failed to send:', emailError.message);
                console.error('[register-free] Error details:', emailError);
            }
        } else {
            console.warn('[register-free] Email credentials missing. EMAIL_USER:', !!process.env.EMAIL_USER, 'EMAIL_PASS:', !!process.env.EMAIL_PASS);
        }

        return NextResponse.json({ success: true, ticketId: newTicket.ticketId });
    } catch (error) {
        console.error('[register-free]', error);
        return NextResponse.json({ error: 'Server error during registration' }, { status: 500 });
    }
}
