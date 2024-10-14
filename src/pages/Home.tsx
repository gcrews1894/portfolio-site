import React from 'react';
import { Typography, Container, Box, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { Introduction } from '../components/Introduction/Introduction';
import { AboutMe } from '../components/AboutMe/AboutMe';
import { Skills } from '../components/Skills/Skills';
import { RecentProjects } from '../components/RecentProjects/RecentProjects';


export const Home: React.FC = () => {

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Introduction />
        <AboutMe />
        <Skills />
        <RecentProjects />
      </Box>
    </Container>
  );
};
