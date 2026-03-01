import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyCashfreeWebhook } from '@/lib/cashfree';
import type { IOrder } from '@/models/Order';
import type { CartItem } from '@/types/tickets';

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

            if (updated && process.env.RESEND_API_KEY) {
                await sendConfirmationEmail(updated).catch((e) =>
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

async function sendConfirmationEmail(order: IOrder) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
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

    await resend.emails.send({
        from: 'HackJKLU <onboarding@resend.dev>',
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
        <p style="color:#8b8680;font-size:12px">Order ID: ${order.cashfreeOrderId}</p>
        <hr style="border-color:#d4af37;opacity:.3"/>
        <p style="text-align:center;color:#8b8680;font-size:12px">— Team HackJKLU</p>
      </div></body></html>`,
    });
}
