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

    // --- FormSubmit.co Integration (Free, No Key Required) ---
    // This will forward the form data directly to shivjani2005@gmail.com
    // NOTE: The FIRST time you use this, you will receive an activation email from FormSubmit.
    // You MUST click the activation link in that email for it to work.
    
    const TARGET_EMAIL = "shivjani2005@gmail.com";
    
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        message: message,
        _subject: `New Portfolio Message from ${name}`,
        _template: "table",
        _captcha: "false"
      }),
    });

    const result = await response.json();
    console.log("FormSubmit API Response:", result); // DEBUG LOG

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } else {
      console.error('FormSubmit Error:', result);
      return NextResponse.json(
        { error: 'Failed to send message', details: result },
        { status: 502 }
      );
    }

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
