import { FeedbackForm } from '../components/Feedback/FeedbackForm';
import { FeedbackWall } from '../components/Feedback/FeedbackWall';
import { Typography, Container, Box, Button, Modal } from '@mui/material';
import { ScrollAnimation } from '../components/UtilityComponents/ScrollAnimation';
import { useState, useCallback } from 'react';
import '../components/Feedback/Feedback.scss';

export const FeedbackPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleFeedbackSubmitted = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    handleCloseModal();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <ScrollAnimation animation="slideUp" duration={0.6}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#2196F3">
            Feedback Wall
          </Typography>
        </ScrollAnimation>
        <ScrollAnimation animation="fadeIn" delay={0.2}>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Share your thoughts and experiences. Your feedback helps me improve and grow as a developer.
          </Typography>
        </ScrollAnimation>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenModal}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            Leave Feedback
          </Button>
        </Box>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="feedback-modal"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflow: 'auto',
              bgcolor: 'background.paper',
              borderRadius: '12px',
              boxShadow: 24,
              p: 0,
            }}
          >
            <FeedbackForm onClose={handleCloseModal} onSubmitted={handleFeedbackSubmitted} />
          </Box>
        </Modal>

        <FeedbackWall key={refreshKey} />
      </Box>
    </Container>
  );
}; 