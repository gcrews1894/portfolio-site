import React from 'react';
import { Typography, List, ListItem, ListItemText, Container, Box } from '@mui/material';

export const Home: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        <Typography variant="body1">
          I'm a software engineer specializing in...
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          My Tech Stack
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="React" />
          </ListItem>
          <ListItem>
            <ListItemText primary="TypeScript" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Node.js" />
          </ListItem>
          {/* Add more technologies */}
        </List>
      </Box>
    </Container>
  );
};