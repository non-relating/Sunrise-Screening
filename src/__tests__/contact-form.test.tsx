import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = vi.fn();
const ContactFormTest = () => {
  const [formState, setFormState] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [service, setService] = React.useState('I have a torn screen');
  const [errors, setErrors] = React.useState<{ name?: string; phone?: string }>({});
  const [errorMessage, setErrorMessage] = React.useState('');

  const validate = () => {
    const next: { name?: string; phone?: string } = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    
    setFormState('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/.netlify/functions/submit-contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit form');
      }
      
      setFormState('success');
      setName('');
      setPhone('');
      setService('I have a torn screen');
    } catch (error) {
      setFormState('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          type="text"
        />
        {errors.name && <div role="alert">{errors.name}</div>}
      </div>
      
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 555-5555"
          type="tel"
        />
        {errors.phone && <div role="alert">{errors.phone}</div>}
      </div>

      <div>
        <label htmlFor="service">Service</label>
        <select id="service" value={service} onChange={(e) => setService(e.target.value)}>
          <option>I have a torn screen</option>
          <option>I need a full rescreen</option>
          <option>Storm damage repair</option>
          <option>Just asking for a quote</option>
        </select>
      </div>

      {formState === 'error' && <div role="alert">{errorMessage}</div>}

      <button type="submit" disabled={formState === 'submitting'}>
        {formState === 'submitting' ? 'Sending...' : 'Request Free Quote'}
      </button>

      {formState === 'success' && <div role="status">Message Received!</div>}
    </form>
  );
};

describe('Contact Form', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    render(<ContactFormTest />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request free quote/i })).toBeInTheDocument();
  });

  it('validates name field', async () => {
    const user = userEvent.setup();
    render(<ContactFormTest />);
    
    const submitButton = screen.getByRole('button', { name: /request free quote/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
  });

  it('validates phone field', async () => {
    const user = userEvent.setup();
    render(<ContactFormTest />);
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John Doe');
    
    const phoneInput = screen.getByLabelText(/phone/i);
    await user.type(phoneInput, '123');
    
    const submitButton = screen.getByRole('button', { name: /request free quote/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactFormTest />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const submitButton = screen.getByRole('button', { name: /request free quote/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(phoneInput, '(727) 351-2050');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('status', { name: /message received/i })).toBeInTheDocument();
    });
  });

  it('handles submission errors', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<ContactFormTest />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const submitButton = screen.getByRole('button', { name: /request free quote/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(phoneInput, '(727) 351-2050');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('alert', { name: '' })).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => ({ success: true }) }), 100))
    );

    render(<ContactFormTest />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const submitButton = screen.getByRole('button', { name: /request free quote/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(phoneInput, '(727) 351-2050');
    await user.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });
});
