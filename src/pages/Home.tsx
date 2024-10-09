import React from 'react';
import { Typography, Container, Box, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';

import awsLogo from '../assets/icons8-aws-512.png'
import reactLogo from '../assets/icons8-react-native-512.png'
import tsLogo from '../assets/icons8-typescript-512.png'
import nodeLogo from '../assets/icons8-nodejs-512.png'
import dockerLogo from '../assets/icons8-docker-512.png'
import k8sLogo from '../assets/icons8-kubernetes-512.png'
import expressLogo from '../assets/icons8-express-js-512.png'
import figmaLogo from '../assets/icons8-figma-512.png'
import jsLogo from '../assets/icons8-javascript-512.png'
import muiLogo from '../assets/icons8-material-ui-512.png'
import nextLogo from '../assets/icons8-next.js-512.png'
import storybookLogo from '../assets/icons8-storybook-512.png'
import viteLogo from '../assets/icons8-vite-512.png'
import pgLogo from '../assets/icons8-postgres-512.png'
import sequelizeLogo from '../assets/Sequelize.png'

interface TechItem {
  name: string;
  logo: string;
  category: 'frontend' | 'backend' | 'devops and tools';
}

const techStack: TechItem[] = [
  { name: 'JavaScript', logo: jsLogo, category: 'frontend' },
  { name: 'TypeScript', logo: tsLogo, category: 'frontend' },
  { name: 'React', logo: reactLogo, category: 'frontend' },
  { name: 'Next.js', logo: nextLogo, category: 'frontend' },
  { name: 'Material-UI', logo: muiLogo, category: 'frontend' },
  { name: 'Storybook', logo: storybookLogo, category: 'frontend' },
  { name: 'Node.js', logo: nodeLogo, category: 'backend' },
  { name: 'Express', logo: expressLogo, category: 'backend' },
  { name: 'PostgreSQL', logo: pgLogo, category: 'backend' },
  { name: 'Sequelize', logo: sequelizeLogo, category: 'backend' },
  { name: 'AWS', logo: awsLogo, category: 'devops and tools' },
  { name: 'Docker', logo: dockerLogo, category: 'devops and tools' },
  { name: 'Kubernetes', logo: k8sLogo, category: 'devops and tools' },
  { name: 'Vite', logo: viteLogo, category: 'devops and tools' },
  { name: 'Figma', logo: figmaLogo, category: 'devops and tools' },
];

export const Home: React.FC = () => {
  const categories = ['frontend', 'backend', 'devops and tools'];

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        <Typography variant="body1" paragraph>
          I'm a software engineer specializing in...
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          My Tech Stack
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} md={4} key={category}>
              <Box mb={4}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ textTransform: 'capitalize' }}>
                  {category}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {techStack
                    .filter((tech) => tech.category === category)
                    .map((tech, index) => (
                      <Grid item xs={6} sm={4} md={6} lg={6} key={index}>
                        <Card sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: 3,
                          },
                        }}>
                          <CardMedia
                            component="img"
                            image={tech.logo}
                            alt={`${tech.name} logo`}
                            sx={{ width: 60, height: 60, objectFit: 'contain', mt: 2 }}
                          />
                          <CardContent>
                            <Typography variant="body2" component="div" align="center">
                              {tech.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};