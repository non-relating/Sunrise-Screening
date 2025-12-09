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
}

exports.handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: ContactFormData = JSON.parse(event.body || '{}');

    // Validate input
    if (!data.name || !data.phone || !data.service) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Basic phone validation
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid phone number' }),
      };
    }

    // Log the submission
    console.log('Contact form submission:', {
      name: data.name,
      phone: data.phone,
      service: data.service,
      timestamp: new Date().toISOString(),
    });

    // TODO: In production, integrate with:
    // - SendGrid / Mailgun for email notifications
    // - Supabase / Firebase for storage
    // - Slack webhook for instant alerts

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Form submitted successfully' }),
    };
  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process form submission' }),
    };
  }
};
