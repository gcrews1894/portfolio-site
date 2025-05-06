import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { FeedbackFormData } from '../../types/feedback';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FeedbackFormProps {
  onClose: () => void;
  onSubmitted: () => void;
}

export const FeedbackForm = ({ onClose, onSubmitted }: FeedbackFormProps) => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([formData]);

      if (error) throw error;

      setFormData({ name: '', company: '', message: '' });
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="feedback-form">
      <div className="feedback-form__header">
        <h2 className="feedback-form__title">Share Your Thoughts</h2>
        <IconButton 
          onClick={onClose}
          size="small"
          className="feedback-form__close-button"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}; 