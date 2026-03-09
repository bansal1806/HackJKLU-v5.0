import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getCashfreeOrderStatus } from '@/lib/cashfree';
import Ticket from '@/models/Ticket';
import { eventsData } from '@/data/events';
import crypto from 'crypto';
import type { IOrder } from '@/models/Order';
import type { CartItem } from '@/types/tickets';

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get('orderId');

    if (!orderId) {
        return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    await connectDB();

    let order = await Order.findOne({ cashfreeOrderId: orderId });

    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    let tickets = await Ticket.find({ orderId: order.cashfreeOrderId }).lean();

    // Local dev workaround: If webhooks failed but the user paid, resolve it here.
    if (order.status === 'PENDING') {
        try {
            const cfStatus = await getCashfreeOrderStatus(order.cashfreeOrderId);
            if (cfStatus && cfStatus.order_status === 'PAID') {
                order.status = 'PAID';
                order.cashfreePaymentId = cfStatus.payment_session_id || 'manual_sync_cf';
                await order.save();

                if (tickets.length === 0) {
                    // Generate Tickets
                    const ticketsToCreate = [];
                    for (const item of order.items) {
                        for (let i = 0; i < item.quantity; i++) {
                            ticketsToCreate.push({
                                ticketId: crypto.randomUUID(),
                                orderId: order.cashfreeOrderId,
                                eventId: item.eventId,
                                eventTitle: item.eventTitle,
                                attendeeName: order.customerName,
                                attendeeEmail: order.customerEmail,
                                attendeePhone: order.customerPhone,
                                college: order.customerCollege || 'N/A',
                                isPaid: true,
                                paymentReference: order.cashfreePaymentId,
                                isCheckedIn: false,
                            });
                        }
                    }
                    tickets = await Ticket.insertMany(ticketsToCreate) as any;

                    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                        await sendConfirmationEmail(order, tickets).catch(e => {
                            console.error('[status API] Failed to send email via NodeMailer:', e);
                        });
                    } else {
                        console.warn('[status API] EMAIL_USER is not defined, skipping email.');
                    }
                }
            } else if (cfStatus && cfStatus.order_status === 'ACTIVE') {
                // Still unpaid
            } else if (cfStatus && cfStatus.order_status !== 'PENDING') {
                // FAILED or similar
                order.status = 'FAILED';
                await order.save();
            }
        } catch (error) {
            console.error('[status] Cashfree status check error', error);
        }
    }

    return NextResponse.json({
        orderId: order.cashfreeOrderId,
        status: order.status,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        tickets: tickets
    });
}

// Duplicated from webhook to securely handle fallback verification emails
async function sendConfirmationEmail(order: IOrder, tickets: any[]) {
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

    console.log('[status API] Attempting to send paid confirmation email to:', order.customerEmail);
    const items = order.items as CartItem[];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hackjklu-v5.vercel.app';

    const passRows = tickets.map(t => {
        const eventInfo: any = eventsData.find(e => Number(e.id) === Number(t.eventId)) || eventsData.find(e => e.title === t.eventTitle) || { time: 'TBD', location: 'Campus' };
        const posterUrl = eventInfo.poster && eventInfo.poster.startsWith('/') ? `${siteUrl}${eventInfo.poster}` : eventInfo.poster;

        return `
            <div style="max-width:800px;margin:0 auto;background:#030305;border:1px solid #d4af3755;border-radius:32px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,0.8)">
                <div style="background-color:#020205;position:relative;height:320px;background-size:cover;background-position:center;${posterUrl ? `background-image:url('${posterUrl}');` : ''}">
                    <!-- Lateral Gradient Overlays -->
                    <div style="position:absolute;inset:0;background:linear-gradient(to right, #000 0%, transparent 40%, transparent 60%, #000 100%)">
                        <!-- BIG ARTIST TEXT (Background Decorative) -->
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:100%;text-align:center;color:rgba(220,38,38,0.12);font-size:80px;font-weight:900;letter-spacing:15px;text-transform:uppercase;font-family:Georgia,serif;pointer-events:none;white-space:nowrap">MAAN PANU</div>

                        <!-- 3-Column Content Overlaid: 24% | 52% | 24% -->
                        <div style="padding:0 24px;height:100%;display:table;width:100%;position:relative;z-index:10">
                            
                            <!-- LEFT (24%): QR Stub -->
                            <div style="display:table-cell;vertical-align:middle;text-align:left;width:24%">
                                <div style="background:#fff;padding:16px;border-radius:24px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5)">
                                    <div style="margin-bottom:8px">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${t.ticketId}" alt="QR" width="130" height="130" style="display:block" />
                                    </div>
                                    <p style="color:#666;font-size:9px;text-transform:uppercase;margin:0;letter-spacing:1.5px;font-weight:900">Scan to Verify</p>
                                    <p style="color:#999;font-size:7px;font-family:monospace;margin:4px 0 0 0">${t.ticketId.slice(0, 6) + "..." + t.ticketId.slice(-4)}</p>
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
                                        <h2 style="color:#fff;margin:0;font-size:18px;text-transform:uppercase;letter-spacing:0.5px;line-height:1.1;font-family:Georgia,serif">${t.eventTitle}</h2>
                                    </div>
                                    
                                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:12px">
                                        <div style="margin-bottom:8px">
                                            <p style="color:#d4af37;font-size:6px;text-transform:uppercase;margin:0 0 1px 0;letter-spacing:1px;font-weight:bold">Attendee Profile</p>
                                            <p style="color:#fff;font-size:14px;font-weight:bold;margin:0">${order.customerName}</p>
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

                                        <div style="margin-top:16px;display:table;width:100%">
                                            <div style="display:table-cell;vertical-align:middle;color:#eee1c533;font-size:8px;font-family:monospace">MT-2026-XQ</div>
                                            <div style="display:table-cell;text-align:right">
                                                <div style="display:inline-block;background:rgba(22,101,52,0.25);border:1px solid rgba(34,197,94,0.3);padding:3px 8px;border-radius:4px">
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
`;
    }).join('');

    try {
        const info = await transporter.sendMail({
            from: `"HackJKLU v5.0" <${process.env.EMAIL_USER}>`,
            to: order.customerEmail,
            replyTo: process.env.EMAIL_USER,
            subject: '✅ Booking Confirmed — HackJKLU v5.0',
            text: `Hi ${order.customerName}, your booking is confirmed! Total Paid: ₹${order.totalAmount / 100}. Please check your email for QR codes.`,
            html: `<!DOCTYPE html><html><body style="background:#020205;color:#ffecd1;font-family:Georgia,serif;padding:32px">
      <div style="max-width:600px;margin:0 auto">
        <h1 style="color:#d4af37;margin-bottom:8px;font-size:32px">HackJKLU v5.0</h1>
        <p style="color:#8b8680;margin:0 0 40px 0;font-size:12px;letter-spacing:4px">STATUS VERIFICATION • CONFIRMED</p>

        <div style="background:#111;border:1px solid #d4af3722;border-radius:24px;padding:40px;margin-bottom:48px;box-shadow:0 15px 50px rgba(0,0,0,0.6)">
            <p style="margin:0 0 24px 0;font-size:18px;color:#fff">Hi <strong>${order.customerName}</strong>, your verification is complete!</p>
            <table style="width:100%;border-collapse:collapse">
                <thead><tr style="border-bottom:1px solid #d4af3733">
                    <th style="padding:16px 0;text-align:left;color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:2px">Description</th>
                    <th style="padding:16px 0;text-align:right;color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:2px">Amount</th>
                </tr></thead>
                <tbody>${items.map(i => `<tr><td style="padding:20px 0;font-size:15px;color:#fff">${i.eventTitle} (x${i.quantity})</td><td style="padding:20px 0;text-align:right;font-weight:bold;color:#fff;font-size:16px">₹${i.pricePerUnit * i.quantity}</td></tr>`).join('')}</tbody>
                <tfoot><tr style="border-top:2px solid #d4af3733">
                    <td style="padding:24px 0 0 0;font-weight:bold;color:#d4af37;text-transform:uppercase;font-size:14px;letter-spacing:2px">Total Verified</td>
                    <td style="padding:24px 0 0 0;text-align:right;font-weight:bold;color:#d4af37;font-size:26px">₹${order.totalAmount / 100}</td>
                </tr></tfoot>
            </table>
        </div>

        <h3 style="color:#fff;margin-bottom:24px;text-align:center;font-size:24px;text-transform:uppercase;letter-spacing:6px">Your Digital Boarding Passes</h3>
        
        ${passRows}

        <div style="text-align:center;margin-top:64px;padding-top:40px;border-top:1px solid #d4af3722">
            <p style="color:#8b8680;font-size:12px;text-transform:uppercase;letter-spacing:2px">Order ID: ${order.cashfreeOrderId}</p>
            <p style="color:#d4af37;font-size:11px;letter-spacing:6px;margin-top:16px;font-weight:900">THE GREAT LEGEND • MARCH 2026</p>
        </div>
      </div></body></html>`,
        });
        console.log(`[NodeMailer] Successfully sent confirmation email to ${order.customerEmail}. MessageId: ${info.messageId}`);
    } catch (e: any) {
        console.error('[NodeMailer Error] Failed to dispatch email:', e.message);
        throw e;
    }
}
