interface ContactFormData {
  name: string;
  phone: string;
  service: string;
}

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

interface NetlifyResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
});

// Helper to send email via SendGrid
async function sendEmail(name: string, phone: string, service: string) {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'info@sunrisescreening.com';
  
  if (!sendgridApiKey) {
    console.warn('SENDGRID_API_KEY not set, skipping email');
    return true;
  }

  const emailContent = `
New Quote Request from Sunrise Screening

Customer Name: ${name}
Phone: ${phone}
Service Requested: ${service}
Timestamp: ${new Date().toISOString()}

Please contact the customer to provide a quote.
  `.trim();

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: adminEmail }],
            subject: `New Quote Request from ${name}`,
          }
        ],
        from: { email: 'noreply@sunrisescreening.com', name: 'Sunrise Screening' },
        content: [
          {
            type: 'text/plain',
            value: emailContent,
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('SendGrid error:', error);
      return false;
    }

    console.log('Email sent successfully via SendGrid');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

exports.handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: getHeaders(),
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: getHeaders(),
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: ContactFormData = JSON.parse(event.body || '{}');

    // Validate input
    if (!data.name || !data.phone || !data.service) {
      return {
        statusCode: 400,
        headers: getHeaders(),
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Basic phone validation
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      return {
        statusCode: 400,
        headers: getHeaders(),
        body: JSON.stringify({ error: 'Invalid phone number' }),
      };
    }

    // Send email notification
    const emailSent = await sendEmail(data.name, data.phone, data.service);

    // Log the submission
    console.log('Contact form submission:', {
      name: data.name,
      phone: data.phone,
      service: data.service,
      timestamp: new Date().toISOString(),
      emailSent,
    });

    return {
      statusCode: 200,
      headers: getHeaders(),
      body: JSON.stringify({ 
        success: true, 
        message: 'Quote request submitted successfully. We will contact you shortly!' 
      }),
    };
  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      headers: getHeaders(),
      body: JSON.stringify({ error: 'Failed to process form submission' }),
    };
  }
};
