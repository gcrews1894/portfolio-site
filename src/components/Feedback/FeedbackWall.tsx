import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Feedback } from '../../types/feedback';

export const FeedbackWall = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedback();

    // Subscribe to new feedback
    const subscription = supabase
      .channel('feedback_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feedback' }, 
        (payload) => {
          setFeedback(prev => [payload.new as Feedback, ...prev]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedback(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading feedback...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="feedback-wall">
      {feedback.map((item) => (
        <div key={item.id} className="feedback-card">
          <div className="feedback-header">
            <h3>{item.name}</h3>
            <span className="company">{item.company}</span>
          </div>
          <p className="message">{item.message}</p>
          <time className="timestamp">
            {new Date(item.created_at).toLocaleDateString()}
          </time>
        </div>
      ))}
    </div>
  );
}; 