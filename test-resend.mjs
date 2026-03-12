import { Resend } from 'resend';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log('Sending with API key:', process.env.RESEND_API_KEY?.substring(0, 8) + '...');
  try {
    const data = await resend.emails.send({
      from: 'HackJKLU v5.0 <teams@jklu.edu.in>',
      to: 'hackjklu@jklu.edu.in', // send to self just to test
      subject: 'Test Email',
      html: '<p>Testing Resend API</p>'
    });
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
