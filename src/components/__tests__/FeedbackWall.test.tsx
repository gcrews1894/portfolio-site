import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FeedbackWall } from '../Feedback/FeedbackWall';
import { supabase } from '../../lib/supabase';

// Mock supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('FeedbackWall', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders feedback cards correctly', async () => {
    const mockData = {
      data: [
        {
          id: '1',
          created_at: '2024-03-20T12:00:00Z',
          name: 'John Doe',
          company: 'Test Company',
          message: 'Great experience!',
        },
      ],
      error: null,
    };

    const mockSelect = vi.fn().mockResolvedValue(mockData);
    (supabase.from as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ select: mockSelect });

    render(<FeedbackWall />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Test Company')).toBeInTheDocument();
      expect(screen.getByText('Great experience!')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    const mockError = new Error('Failed to fetch feedback');
    const mockSelect = vi.fn().mockResolvedValue({ data: null, error: mockError });
    (supabase.from as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ select: mockSelect });

    render(<FeedbackWall />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch feedback')).toBeInTheDocument();
    });
  });
}); 