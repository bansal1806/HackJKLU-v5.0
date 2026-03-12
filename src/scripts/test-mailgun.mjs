import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

async function testMailgun() {
    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const fromEmail = process.env.MAILGUN_FROM_EMAIL || `HackJKLU v5.0 <tickets@${domain}>`;

    console.log('--- MAILGUN DIAGNOSTIC TOOL ---');
    console.log(`Domain: ${domain}`);
    console.log(`API Key Length: ${apiKey ? apiKey.length : 0}`);
    console.log(`From: ${fromEmail}`);
    console.log('-------------------------------');

    if (!apiKey || !domain) {
        console.error('Error: MAILGUN_API_KEY or MAILGUN_DOMAIN missing in .env.local');
        return;
    }

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: 'api',
        key: apiKey,
    });

    // Send to self or a test address
    const testRecipient = process.argv[2] || 'test@example.com';

    try {
        console.log(`\nAttempting to send test email to ${testRecipient}...`);
        const result = await mg.messages.create(domain, {
            from: fromEmail,
            to: [testRecipient],
            subject: '📧 HackJKLU Mailgun Diagnostic',
            text: 'This is a test email from the Mailgun diagnostic script. If you received this, your Mailgun credentials are CORRECT.',
            html: `<div style="font-family:Georgia,serif;padding:32px;background:#020205;color:#ffecd1;">
                <h1 style="color:#d4af37;">HackJKLU v5.0</h1>
                <p>This is a test email from the <strong>Mailgun diagnostic script</strong>.</p>
                <p>If you received this, your Mailgun credentials are <span style="color:#22c55e;font-weight:bold;">CORRECT ✅</span></p>
            </div>`,
        });
        console.log(`\n✅ SUCCESS! Email sent. ID: ${result.id}`);
    } catch (err) {
        console.error('\n❌ FAILED:', err.message || err);
        console.log('\n--- RECOMMENDATIONS ---');
        console.log('1. Double-check your MAILGUN_API_KEY in .env.local');
        console.log('2. Make sure your MAILGUN_DOMAIN is verified in the Mailgun dashboard');
        console.log('3. Ensure you are using the correct API key (private key, not public)');
    }
}

testMailgun();
