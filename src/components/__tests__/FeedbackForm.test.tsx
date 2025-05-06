import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeedbackForm } from '../Feedback/FeedbackForm';
import { supabase } from '../../lib/supabase';

// Mock Supabase client
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => Promise.resolve({ error: null }))
    }))
  }
}));

describe('FeedbackForm', () => {
  it('renders all form fields', () => {
    render(<FeedbackForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument();
  });

  it('submits form data correctly', async () => {
    render(<FeedbackForm />);
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/company/i), 'Acme Inc');
    await userEvent.type(screen.getByLabelText(/message/i), 'Great experience!');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));

    // Verify Supabase was called with correct data
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('feedback');
      expect(supabase.from('feedback').insert).toHaveBeenCalledWith([{
        name: 'John Doe',
        company: 'Acme Inc',
        message: 'Great experience!'
      }]);
    });

    // Verify form is reset after submission
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/company/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('handles submission errors', async () => {
    // Mock Supabase error
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      insert: () => Promise.resolve({ error: new Error('Submission failed') })
    }));

    render(<FeedbackForm />);
    
    // Fill out and submit form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/company/i), 'Acme Inc');
    await userEvent.type(screen.getByLabelText(/message/i), 'Great experience!');
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });
}); 