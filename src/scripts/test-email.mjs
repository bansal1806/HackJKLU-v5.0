import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

import fs from 'fs';
const envRaw = fs.readFileSync(envPath, 'utf8');

async function testEmail() {
    let user = (process.env.EMAIL_USER || '').trim();
    let pass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '');

    // Raw fallback check
    if (!user || user === 'hackjkluv5@gmail.com') {
        const userMatch = envRaw.match(/EMAIL_USER=([^\r\n]+)/);
        if (userMatch) user = userMatch[1].trim();
        const passMatch = envRaw.match(/EMAIL_PASS=([^\r\n]+)/);
        if (passMatch) pass = passMatch[1].trim().replace(/\s+/g, '');
    }

    console.log('--- EMAIL DIAGNOSTIC TOOL ---');
    console.log(`User: ${user}`);
    console.log(`Password Length: ${pass.length}`);
    console.log('-----------------------------');

    if (!user || !pass) {
        console.error('Error: EMAIL_USER or EMAIL_PASS missing in .env.local');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user, pass },
        debug: true,
        logger: true,
    });

    try {
        console.log('Attempting to send test email...');
        await transporter.sendMail({
            from: `"Diagnostic Tool" <${user}>`,
            to: user, // Send to self
            subject: '📧 HackJKLU SMTP Diagnostic',
            text: 'This is a test email from the standalone diagnostic script. If you received this, your credentials are CORRECT.',
        });
        console.log('\n✅ SUCCESS! Your credentials and network are working perfectly.');
    } catch (err) {
        console.error('\n❌ FAILED:', err.message);
        console.log('\n--- RECOMMENDATIONS ---');
        if (err.message.includes('535')) {
            console.log('1. Generate a FRESH App Password at: https://myaccount.google.com/apppasswords');
            console.log('2. Ensure "2-Step Verification" is ON.');
            console.log('3. Copy the 16 characters exactly. Do NOT use your normal Gmail login password.');
        } else if (err.message.includes('ETIMEDOUT')) {
            console.log('1. Check your internet connection.');
            console.log('2. Your ISP or firewall might be blocking Port 465.');
        }
    }
}

testEmail();
