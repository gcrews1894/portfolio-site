import React, { useState } from 'react';
import { Typography, Container, Box, Tabs, Tab } from '@mui/material';

import { PathfindingVisualizer } from '../components/PathfindingVisualizer/PathfindingVisualizer'
import { SortingVisualizer } from '../components/SortingVisualizer/SortingVisualizer'

export const Visualizers: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Pathfinding" />
          <Tab label="Sorting" />
        </Tabs>
      </Box>
      {selectedTab === 0 && <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Pathfinding Visualizer
        </Typography>
        <Typography variant="body1" paragraph>
          This is a demo of a pathfinding algorithm visualizer.
        </Typography>
        <PathfindingVisualizer />
      </Box>}
      {selectedTab === 1 && <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Sorting Visualizer
        </Typography>
        <Typography variant="body1" paragraph>
          This is a demo of a sorting algorithm visualizer.
        </Typography>
        <SortingVisualizer />
      </Box>}
    </Container>
  );
};