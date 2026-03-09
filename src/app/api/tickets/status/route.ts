import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getCashfreeOrderStatus } from '@/lib/cashfree';
import Ticket from '@/models/Ticket';
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
    console.log('[status API] Using EMAIL_USER:', process.env.EMAIL_USER);
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
        console.log(`[NodeMailer] Successfully sent confirmation email to ${order.customerEmail}. MessageId: ${info.messageId}`);
    } catch (e: any) {
        console.error('[NodeMailer Error] Failed to dispatch email:', e.message);
        console.error('[NodeMailer Error] Details:', e);
        throw e;
    }
}
