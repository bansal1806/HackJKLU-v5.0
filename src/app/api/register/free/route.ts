import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import { eventsData } from '@/data/events';

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

            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hackjklu-v5.vercel.app';
            const posterUrl = eventInfo.poster && eventInfo.poster.startsWith('/') ? `${siteUrl}${eventInfo.poster}` : eventInfo.poster;

            try {
                await transporter.sendMail({
                    from: `"HackJKLU v5.0" <${process.env.EMAIL_USER}>`,
                    to: newTicket.attendeeEmail,
                    replyTo: process.env.EMAIL_USER,
                    subject: `✅ RSVP Confirmed: ${newTicket.eventTitle} — HackJKLU v5.0`,
                    text: `Hi ${newTicket.attendeeName}, your RSVP for ${newTicket.eventTitle} is confirmed! Ticket ID: ${newTicket.ticketId}. Please present your QR code at the venue.`,
                    html: `<!DOCTYPE html><html><body style="background:#020205;color:#ffecd1;font-family:Georgia,serif;padding:32px">
            <div style="max-width:800px;margin:0 auto;background:#030305;border:1px solid #d4af3766;border-radius:32px;overflow:hidden;box-shadow:0 50px 100px rgba(0,0,0,0.9)">
                <!-- Cinematic Poster Background: 2.5:1 (800x320) -->
                <div style="background-color:#020205;position:relative;height:320px;background-size:cover;background-position:center;${posterUrl ? `background-image:url('${posterUrl}');` : ''}">
                    <!-- Lateral Gradient Overlays -->
                    <div style="position:absolute;inset:0;background:linear-gradient(to right, #000 0%, transparent 40%, transparent 60%, #000 100%)">
                        <!-- BIG ARTIST TEXT (Background Decorative) -->
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:100%;text-align:center;color:rgba(220,38,38,0.15);font-size:80px;font-weight:900;letter-spacing:15px;text-transform:uppercase;font-family:Georgia,serif;pointer-events:none;white-space:nowrap">MAAN PANU</div>

                        <!-- 3-Column Content Overlaid: 24% | 52% | 24% -->
                        <div style="padding:0 24px;height:100%;display:table;width:100%;position:relative;z-index:10">
                            
                            <!-- LEFT (24%): QR Stub -->
                            <div style="display:table-cell;vertical-align:middle;text-align:left;width:24%">
                                <div style="background:#fff;padding:16px;border-radius:24px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5)">
                                    <div style="margin-bottom:8px">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${newTicket.ticketId}" alt="QR" width="130" height="130" style="display:block" />
                                    </div>
                                    <p style="color:#666;font-size:9px;text-transform:uppercase;margin:0;letter-spacing:1.5px;font-weight:900">Scan to Verify</p>
                                    <p style="color:#999;font-size:7px;font-family:monospace;margin:4px 0 0 0">${newTicket.ticketId.slice(0, 6) + "..." + newTicket.ticketId.slice(-4)}</p>
                                </div>
                            </div>

                            <!-- CENTER (52%): Artist Safe Area -->
                            <div style="display:table-cell;width:52%"></div>

                            <!-- RIGHT (24%): Info Box -->
                            <div style="display:table-cell;vertical-align:middle;text-align:right">
                                <div style="display:inline-block;text-align:left;background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);border:1px solid #d4af3744;padding:20px;border-radius:24px;width:260px">
                                    <div style="margin-bottom:12px">
                                        <div style="display:inline-block;padding:2px 6px;border:1px solid #d4af3744;border-radius:8px;margin-bottom:8px">
                                            <span style="color:#d4af37;font-weight:900;letter-spacing:1px;font-size:6px;text-transform:uppercase">Official Ticket</span>
                                        </div>
                                        <h2 style="color:#fff;margin:0;font-size:18px;text-transform:uppercase;letter-spacing:0.5px;line-height:1.1;font-family:Georgia,serif">${newTicket.eventTitle}</h2>
                                    </div>
                                    
                                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:12px">
                                        <div style="margin-bottom:8px">
                                            <p style="color:#d4af37;font-size:6px;text-transform:uppercase;margin:0 0 1px 0;letter-spacing:1px;font-weight:bold">Attendee Profile</p>
                                            <p style="color:#fff;font-size:14px;font-weight:bold;margin:0">${newTicket.attendeeName}</p>
                                        </div>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="padding-bottom:8px">
                                                    <p style="color:#d4af37;font-size:6px;text-transform:uppercase;margin:0 0 1px 0;letter-spacing:1px;font-weight:bold">Venue</p>
                                                    <p style="color:#fff;font-size:10px;margin:0;line-height:1.2">${eventInfo.location}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="color:#d4af37;font-size:6px;text-transform:uppercase;margin:0 0 1px 0;letter-spacing:1px;font-weight:bold">Schedule</p>
                                                    <p style="color:#fff;font-size:10px;margin:0;line-height:1.2">${eventInfo.time}</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <div style="margin-top:12px;display:table;width:100%">
                                            <div style="display:table-cell;vertical-align:middle;color:rgba(255,255,255,0.3);font-size:8px;font-family:monospace">MT-2026-XQ</div>
                                            <div style="display:table-cell;text-align:right">
                                                <div style="display:inline-block;background:rgba(34,197,94,0.2);border:1px solid rgba(34,197,94,0.3);padding:2px 8px;border-radius:4px">
                                                    <span style="color:#4ade80;font-size:8px;font-weight:900;text-transform:uppercase">Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
                
                <div style="background:#000;padding:24px;text-align:center;border-top:1px solid #d4af3722">
                    <p style="color:#8b8680;font-size:9px;text-transform:uppercase;letter-spacing:4px;margin:0">Verified Digital Entry • HackJKLU v5.0 • 2026</p>
                </div>
            </div>
            
            <p style="text-align:center;color:#444;font-size:11px;margin-top:32px">Ticket ID: ${newTicket.ticketId} | Verified Digital Entry Pass</p>
            </body></html>`,
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
