import React from 'react';
import { Typography, Container, Box } from '@mui/material';

import { PathfindingVisualizer } from '../components/PathfindingVisualizer/PathfindingVisualizer'

export const Pathfinder: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Pathfinding Visualizer
        </Typography>
        <Typography variant="body1" paragraph>
          This is a demo of a pathfinding algorithm visualizer.
        </Typography>
        <PathfindingVisualizer />
      </Box>
    </Container>
  );
};