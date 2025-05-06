export interface Feedback {
  id: string;
  created_at: string;
  name: string;
  company: string;
  message: string;
}

export interface FeedbackFormData {
  name: string;
  company: string;
  message: string;
} 