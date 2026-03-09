import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyCashfreeWebhook } from '@/lib/cashfree';
import type { IOrder } from '@/models/Order';
import type { CartItem } from '@/types/tickets';
import Ticket from '@/models/Ticket';
import crypto from 'crypto';

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
    console.log('[webhook API] Using EMAIL_USER:', process.env.EMAIL_USER);
    const items = order.items as CartItem[];

    const itemRows = items
        .map(
            (i) =>
                `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a">${i.eventTitle}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:center">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right">₹${i.pricePerUnit * i.quantity}</td>
        </tr>`,
        )
        .join('');

    const qrRows = tickets.map(t => `
        <div style="margin-bottom: 24px; text-align: center; border: 1px solid #d4af3733; padding: 16px; border-radius: 8px; background: #1a1a1a;">
            <p style="color: #d4af37; font-size: 16px; font-weight: bold; margin-top: 0;">${t.eventTitle}</p>
            <p style="color: #8b8680; font-size: 12px; margin-bottom: 12px;">Ticket ID: ${t.ticketId}</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${t.ticketId}" alt="QR Code" width="200" height="200" style="border-radius: 8px; border: 4px solid white;" />
        </div>
    `).join('');

    try {
        const info = await transporter.sendMail({
            from: `"HackJKLU" <${process.env.EMAIL_USER}>`,
            to: order.customerEmail,
            subject: '✅ Booking Confirmed — HackJKLU v5.0',
            html: `<!DOCTYPE html><html><body style="background:#0c0a09;color:#ffecd1;font-family:Georgia,serif;padding:32px">
      <div style="max-width:580px;margin:0 auto">
        <h1 style="color:#d4af37">HackJKLU v5.0</h1>
        <p style="color:#8b8680;margin-top:0">Booking Confirmation</p>
        <hr style="border-color:#d4af37;opacity:.3"/>
        <p>Hi <strong>${order.customerName}</strong>, your spots are confirmed!</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;background:#1a1a1a;border-radius:8px;overflow:hidden">
          <thead><tr style="background:#d4af37;color:#000">
            <th style="padding:10px 12px;text-align:left">Event</th>
            <th style="padding:10px 12px;text-align:center">Qty</th>
            <th style="padding:10px 12px;text-align:right">Amount</th>
          </tr></thead>
          <tbody style="color:#ffecd1">${itemRows}</tbody>
          <tfoot><tr>
            <td colspan="2" style="padding:10px 12px;font-weight:bold;color:#d4af37">Total Paid</td>
            <td style="padding:10px 12px;text-align:right;font-weight:bold;color:#d4af37">₹${order.totalAmount / 100}</td>
          </tr></tfoot>
        </table>

        <h3 style="color:#d4af37; margin-top: 32px; text-align: center;">Your Entry Passes</h3>
        <p style="text-align: center; color: #8b8680; margin-bottom: 20px; font-size: 14px;">Please present these QR codes at the venue for check-in.</p>
        
        ${qrRows}

        <p style="color:#8b8680;font-size:12px">Order ID: ${order.cashfreeOrderId}</p>
        <hr style="border-color:#d4af37;opacity:.3"/>
        <p style="text-align:center;color:#8b8680;font-size:12px">— Team HackJKLU</p>
      </div></body></html>`,
        });
        console.log(`[NodeMailer Webhook] Successfully sent confirmation email to ${order.customerEmail}. MessageId: ${info.messageId}`);
    } catch (e: any) {
        console.error('[NodeMailer Webhook Error] Failed to dispatch email:', e.message);
        console.error('[NodeMailer Webhook Error] Details:', e);
        throw e;
    }
}
