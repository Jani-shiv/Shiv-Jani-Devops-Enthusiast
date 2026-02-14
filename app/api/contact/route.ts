
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    // --- WhatsApp Integration Logic (Server-Side) ---
    // TO ACTUALLY SEND MESSAGES, YOU NEED A PROVIDER LIKE TWILIO OR META API.
    
    // Example using Twilio (Requires 'twilio' package and env vars):
    /*
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
       body: `New Access Request from ${name}: ${message}`,
       from: 'whatsapp:+14155238886', // Your Twilio Sandbox Number
       to: 'whatsapp:+918160308850'   // Your Number
    });
    */

    // FOR NOW: Log to server console to simulate sending
    console.log(`[WhatsApp Mock] Sending message to +918160308850`);
    console.log(`[WhatsApp Mock] From: ${name}`);
    console.log(`[WhatsApp Mock] Message: ${message}`);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
