import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyCashfreeWebhook } from '@/lib/cashfree';
import type { IOrder } from '@/models/Order';
import type { CartItem } from '@/types/tickets';
import Ticket from '@/models/Ticket';
import crypto from 'crypto';
import { eventsData } from '@/data/events';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get('x-webhook-signature') ?? '';
        const timestamp = req.headers.get('x-webhook-timestamp') ?? '';

        if (!verifyCashfreeWebhook(rawBody, signature, timestamp)) {
            console.warn('[webhook] Invalid signature');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const event = JSON.parse(rawBody) as { type: string; data: Record<string, unknown> };
        const { type, data } = event;

        await connectDB();

        if (type === 'PAYMENT_SUCCESS_WEBHOOK') {
            const orderId = (data.order as Record<string, string>).order_id;
            const paymentId = String((data.payment as Record<string, unknown>).cf_payment_id);

            const updated: IOrder | null = await Order.findOneAndUpdate(
                { cashfreeOrderId: orderId },
                { status: 'PAID', cashfreePaymentId: paymentId },
                { new: true },
            );

            if (updated && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                // Generate Tickets
                const ticketsToCreate = [];
                for (const item of updated.items) {
                    for (let i = 0; i < item.quantity; i++) {
                        ticketsToCreate.push({
                            ticketId: crypto.randomUUID(),
                            orderId: updated.cashfreeOrderId,
                            eventId: item.eventId,
                            eventTitle: item.eventTitle,
                            attendeeName: updated.customerName,
                            attendeeEmail: updated.customerEmail,
                            attendeePhone: updated.customerPhone,
                            college: updated.customerCollege || 'N/A',
                            isPaid: true,
                            paymentReference: paymentId,
                            isCheckedIn: false,
                        });
                    }
                }
                const createdTickets = await Ticket.insertMany(ticketsToCreate);

                await sendConfirmationEmail(updated, createdTickets).catch((e) =>
                    console.error('[webhook] Email error:', e),
                );
            }
        } else if (type === 'PAYMENT_FAILED_WEBHOOK') {
            const orderId = (data.order as Record<string, string>).order_id;
            await Order.findOneAndUpdate(
                { cashfreeOrderId: orderId },
                { status: 'FAILED' },
            );
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('[webhook]', err);
        return NextResponse.json({ error: 'Processing error' }, { status: 500 });
    }
}

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

    console.log('[webhook API] Attempting to send confirmation email to:', order.customerEmail);
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
            siteUrl,
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
        <h1 style="color:#d4af37;margin-bottom:4px;font-size:28px">HackJKLU v5.0</h1>
        <p style="color:#8b8680;margin:0 0 32px 0;font-size:14px;letter-spacing:2px">YOUR QUEST CONFIRMATION</p>

        <div style="background:#111;border:1px solid #d4af3722;border-radius:16px;padding:32px;margin-bottom:40px;box-shadow:0 10px 30px rgba(0,0,0,0.4)">
            <p style="margin:0 0 20px 0;font-size:16px">Hi <strong>${order.customerName}</strong>, your tickets are secured!</p>
            <table style="width:100%;border-collapse:collapse">
                <thead><tr style="border-bottom:1px solid #d4af3733">
                    <th style="padding:12px 0;text-align:left;color:#d4af37;font-size:11px;text-transform:uppercase;letter-spacing:2px">Event Description</th>
                    <th style="padding:12px 0;text-align:right;color:#d4af37;font-size:11px;text-transform:uppercase;letter-spacing:2px">Amount</th>
                </tr></thead>
                <tbody>${items.map(i => `<tr><td style="padding:16px 0;font-size:14px;color:#fff">${i.eventTitle} (x${i.quantity})</td><td style="padding:16px 0;text-align:right;font-weight:bold;color:#fff">₹${i.pricePerUnit * i.quantity}</td></tr>`).join('')}</tbody>
                <tfoot><tr style="border-top:2px solid #d4af3733">
                    <td style="padding:20px 0 0 0;font-weight:bold;color:#d4af37;text-transform:uppercase;font-size:12px;letter-spacing:1px">Total Paid</td>
                    <td style="padding:20px 0 0 0;text-align:right;font-weight:bold;color:#d4af37;font-size:22px">₹${order.totalAmount / 100}</td>
                </tr></tfoot>
            </table>
        </div>

        <h3 style="color:#fff;margin-bottom:20px;text-align:center;font-size:22px;text-transform:uppercase;letter-spacing:4px">Your Digital Boarding Passes</h3>
        
        ${passRows}

        <div style="text-align:center;margin-top:48px;padding-top:32px;border-top:1px solid #d4af3722">
            <p style="color:#8b8680;font-size:11px;text-transform:uppercase;letter-spacing:1px">Order ID: ${order.cashfreeOrderId}</p>
            <p style="color:#d4af37;font-size:10px;letter-spacing:4px;margin-top:12px;font-weight:bold">THE GREAT LEGEND • MARCH 2026</p>
        </div>
      </div></body></html>`,
        });
        console.log(`[NodeMailer Webhook] Successfully sent confirmation email to ${order.customerEmail}. MessageId: ${info.messageId}`);
    } catch (e: any) {
        console.error('[NodeMailer Webhook Error] Failed to dispatch email:', e.message);
        throw e;
    }
}
