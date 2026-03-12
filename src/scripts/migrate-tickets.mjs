import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

const EVENTS_DATA = [
    { id: 6, title: 'RoboSoccer' },
    { id: 1, title: 'KING OF PLANETS!' },
    { id: 3, title: 'Open Mic Night' },
    { id: 14, title: 'Dreamscape VR' },
    { id: 4, title: 'BGMI Tournament' },
    { id: 13, title: 'Valorant Tournament' },
    { id: 2, title: 'BIT BY BIT' },
    { id: 5, title: 'Media Maze' },
    { id: 9, title: 'Block Printing' },
    { id: 7, title: 'Curtain Call' },
    { id: 12, title: 'Dance Battle' },
    { id: 11, title: 'Astro Aim Chalange' },
    { id: 10, title: 'Jamming Night' },
    { id: 999, title: 'Maan Panu Live Concert' }
];

function sanitizeTitle(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

async function migrate() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully.');

        const db = mongoose.connection.db;
        
        // 1. Rename existing tickets_{id} collections to tickets_{title}
        console.log('Checking for collections to rename...');
        const collections = await db.listCollections().toArray();
        for (const col of collections) {
            const match = col.name.match(/^tickets_(\d+)$/);
            if (match) {
                const id = parseInt(match[1]);
                const event = EVENTS_DATA.find(e => e.id === id);
                if (event) {
                    const newName = `tickets_${sanitizeTitle(event.title)}`;
                    console.log(`Renaming collection "${col.name}" to "${newName}"...`);
                    try {
                        await db.collection(col.name).rename(newName);
                    } catch (e) {
                        if (e.message.includes('target namespace exists')) {
                            console.log(`Target collection "${newName}" already exists, merging data instead...`);
                            const oldTickets = await db.collection(col.name).find({}).toArray();
                            if (oldTickets.length > 0) {
                                for(const t of oldTickets) {
                                  const { _id, ...data } = t;
                                  await db.collection(newName).updateOne({ ticketId: t.ticketId }, { $set: data }, { upsert: true });
                                }
                            }
                            await db.collection(col.name).drop();
                        } else {
                            throw e;
                        }
                    }
                }
            }
        }

        // 2. Shift leftovers from main "tickets" collection
        const mainCollection = db.collection('tickets');
        const legacyTickets = await mainCollection.find({}).toArray();
        
        if (legacyTickets.length > 0) {
            console.log(`Found ${legacyTickets.length} legacy tickets to shift...`);
            for (const ticket of legacyTickets) {
                const event = EVENTS_DATA.find(e => e.id === ticket.eventId);
                const title = event ? event.title : (ticket.eventTitle || ticket.eventId.toString());
                const targetCollectionName = `tickets_${sanitizeTitle(title)}`;
                
                const { _id, ...ticketData } = ticket;
                await db.collection(targetCollectionName).updateOne(
                    { ticketId: ticket.ticketId }, 
                    { $set: ticketData }, 
                    { upsert: true }
                );
            }
            console.log('Legacy tickets shifted.');
        }

        console.log('Migration and Renaming completed successfully!');

    } catch (error) {
        console.error('Operation failed:', error);
    } finally {
        await mongoose.disconnect();
    }
}

migrate();
