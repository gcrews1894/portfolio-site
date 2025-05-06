import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FeedbackWall } from '../Feedback/FeedbackWall';
import { supabase } from '../../lib/supabase';

// Mock Supabase client
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn()
      }))
    }))
  }
}));

describe('FeedbackWall', () => {
  const mockFeedback = [
    {
      id: '1',
      created_at: '2024-03-20T10:00:00Z',
      name: 'John Doe',
      company: 'Acme Inc',
      message: 'Great experience!'
    },
    {
      id: '2',
      created_at: '2024-03-20T11:00:00Z',
      name: 'Jane Smith',
      company: 'XYZ Corp',
      message: 'Amazing service!'
    }
  ];

  it('shows loading state initially', () => {
    render(<FeedbackWall />);
    expect(screen.getByText(/loading feedback/i)).toBeInTheDocument();
  });

  it('displays feedback items correctly', async () => {
    // Mock successful data fetch
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: () => ({
        order: () => Promise.resolve({ data: mockFeedback, error: null })
      })
    }));

    render(<FeedbackWall />);

    // Wait for feedback items to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Acme Inc')).toBeInTheDocument();
      expect(screen.getByText('Great experience!')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('XYZ Corp')).toBeInTheDocument();
      expect(screen.getByText('Amazing service!')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    // Mock error response
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: () => ({
        order: () => Promise.resolve({ data: null, error: new Error('Failed to fetch') })
      })
    }));

    render(<FeedbackWall />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
}); 