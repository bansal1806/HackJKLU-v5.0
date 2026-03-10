import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITicket extends Document {
    ticketId: string; // The unique string embedded in the QR code
    orderId?: string; // Links to Cashfree Order if paid
    eventId: number;
    eventTitle: string;
    attendeeName: string;
    attendeeEmail: string;
    attendeePhone: string;
    college: string;
    isPaid: boolean;
    paymentReference?: string;
    isCheckedIn: boolean;
    accessTier: 'GA' | 'VIP' | 'HACK_TEAM' | 'ALL_ACCESS' | 'ARTIST_TEAM' | 'BACKSTAGE';
    createdAt: Date;
    updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
    {
        ticketId: { type: String, required: true, index: true },
        orderId: { type: String, index: true },
        eventId: { type: Number, required: true },
        eventTitle: { type: String, required: true },
        attendeeName: { type: String, required: true },
        attendeeEmail: { type: String, required: true, lowercase: true },
        attendeePhone: { type: String, required: true },
        college: { type: String, required: true },
        isPaid: { type: Boolean, default: false },
        paymentReference: { type: String },
        isCheckedIn: { type: Boolean, default: false },
        accessTier: {
            type: String,
            enum: ['GA', 'VIP', 'HACK_TEAM', 'ALL_ACCESS', 'ARTIST_TEAM', 'BACKSTAGE'],
            default: 'GA'
        },
    },
    { timestamps: true }
);

// Force Mongoose to recompile the schema in development mode for hot-reloading
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Ticket;
}

const Ticket: Model<ITicket> =
    (mongoose.models.Ticket as Model<ITicket>) ||
    mongoose.model<ITicket>('Ticket', TicketSchema);

export default Ticket;
