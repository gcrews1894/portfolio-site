import React from 'react';
import { Typography, Container, Box } from '@mui/material';

export const IvyEnergy: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Ivy Energy Case Study
        </Typography>
        <Typography variant="body1" paragraph>
          During my time at Ivy Energy, I...
        </Typography>
        {/* Add more details about your experience */}
      </Box>
    </Container>
  );
};