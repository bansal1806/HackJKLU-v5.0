import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getCashfreeOrderStatus } from '@/lib/cashfree';
import Ticket from '@/models/Ticket';
import { eventsData } from '@/data/events';
import crypto from 'crypto';
import type { IOrder } from '@/models/Order';
import type { CartItem } from '@/types/tickets';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

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
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const siteUrl = rawSiteUrl.includes('localhost') ? 'https://hackjklu-v5.vercel.app' : (rawSiteUrl || 'https://hackjklu-v5.vercel.app');

    const passRows = tickets.map(t => {
        const eventInfo: any = eventsData.find(e => Number(e.id) === Number(t.eventId)) || eventsData.find(e => e.title === t.eventTitle) || { time: 'TBD', location: 'Campus' };
        const posterUrl = eventInfo.poster && eventInfo.poster.startsWith('/') ? `${siteUrl}${eventInfo.poster}` : eventInfo.poster;

        return generateBoardingPassHTML({
            ticketId: t.ticketId,
            eventTitle: t.eventTitle,
            attendeeName: order.customerName,
            venue: eventInfo.location || 'Campus',
            time: eventInfo.time || 'TBD',
            posterUrl,
        });
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
