import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FeedbackForm } from '../Feedback/FeedbackForm';
import { supabase } from '../../lib/supabase';
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';

// Mock supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('FeedbackForm', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmitted = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<FeedbackForm onClose={mockOnClose} onSubmitted={mockOnSubmitted} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    (supabase.from as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ insert: mockInsert });

    render(<FeedbackForm onClose={mockOnClose} onSubmitted={mockOnSubmitted} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));

    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledWith([{
        name: 'John Doe',
        company: 'Test Company',
        message: 'Test message',
      }]);
      expect(mockOnSubmitted).toHaveBeenCalled();
    });
  });

  it('handles submission error', async () => {
    const mockError = new Error('Submission failed');
    const mockInsert = vi.fn().mockResolvedValue({ error: mockError });
    (supabase.from as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ insert: mockInsert });

    render(<FeedbackForm onClose={mockOnClose} onSubmitted={mockOnSubmitted} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));

    await waitFor(() => {
      expect(screen.getByText('Submission failed')).toBeInTheDocument();
      expect(mockOnSubmitted).not.toHaveBeenCalled();
    });
  });
}); 