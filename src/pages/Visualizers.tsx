import React, { useState } from 'react';
import { Typography, Container, Box, Tabs, Tab } from '@mui/material';

import { PathfindingVisualizer } from '../components/PathfindingVisualizer/PathfindingVisualizer'
import { SortingVisualizer } from '../components/SortingVisualizer/SortingVisualizer'
import { DroneVisualizer } from '../components/DroneVisualizer/DroneVisualizer'

export const Visualizers: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Pathfinding" />
          <Tab label="Sorting" />
          <Tab label="Drone Detection" />
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
      {selectedTab === 2 && <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Drone Detection Visualizer
        </Typography>
        <Typography variant="body1" paragraph>
          This is a demo of a drone detection algorithm visualizer. The tower at (0,0) has a radar that can see drones in all directions, 
          and a camera that sees drones in a cone of k degrees. The camera can look in any direction. 
          The visualizer helps find the maximum number of drones the camera can see at once.
        </Typography>
        <DroneVisualizer />
      </Box>}
    </Container>
  );
};