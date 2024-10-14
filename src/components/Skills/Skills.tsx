import React, { useState } from 'react';
import { Grid, Box, Typography, Divider, Card, CardMedia, CardContent, keyframes, Paper, Tooltip } from '@mui/material';

import awsLogo from '../../assets/icons8-aws-512.png'
import reactLogo from '../../assets/icons8-react-native-512.png'
import tsLogo from '../../assets/icons8-typescript-512.png'
import nodeLogo from '../../assets/icons8-nodejs-512.png'
import dockerLogo from '../../assets/icons8-docker-512.png'
import k8sLogo from '../../assets/icons8-kubernetes-512.png'
import expressLogo from '../../assets/icons8-express-js-512.png'
import figmaLogo from '../../assets/icons8-figma-512.png'
import jsLogo from '../../assets/icons8-javascript-512.png'
import muiLogo from '../../assets/icons8-material-ui-512.png'
import nextLogo from '../../assets/icons8-next.js-512.png'
import storybookLogo from '../../assets/icons8-storybook-512.png'
import viteLogo from '../../assets/icons8-vite-512.png'
import pgLogo from '../../assets/icons8-postgres-512.png'
import sequelizeLogo from '../../assets/Sequelize.png'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface TechItem {
  name: string;
  logo: string;
  category: 'frontend' | 'backend' | 'devops and tools';
  description: string;
  priority?: boolean;
}

const techStack: TechItem[] = [
  { name: 'JavaScript', logo: jsLogo, category: 'frontend', description: 'Core language for web development, used in all projects for dynamic functionality.', priority: true },
  { name: 'TypeScript', logo: tsLogo, category: 'frontend', description: 'Implemented in large-scale applications to improve code quality and maintainability.', priority: true },
  { name: 'React', logo: reactLogo, category: 'frontend', description: 'Primary framework for building interactive UIs, resulting in a 30% increase in user engagement.', priority: true },
  { name: 'Next.js', logo: nextLogo, category: 'frontend', description: 'Used for server-side rendering and static site generation in React applications.' },
  { name: 'Material-UI', logo: muiLogo, category: 'frontend', description: 'Used for building responsive and reusable UI components.' },
  { name: 'Storybook', logo: storybookLogo, category: 'frontend', description: 'Used for building and testing UI components in isolation.' },
  { name: 'Node.js', logo: nodeLogo, category: 'backend', description: 'Used for building scalable and efficient server-side applications.' },
  { name: 'Express', logo: expressLogo, category: 'backend', description: 'Used for building fast and flexible server-side applications.' },
  { name: 'PostgreSQL', logo: pgLogo, category: 'backend', description: 'Used for building scalable and efficient database systems.' },
  { name: 'Sequelize', logo: sequelizeLogo, category: 'backend', description: 'Used for building scalable and efficient database systems.' },
  { name: 'AWS', logo: awsLogo, category: 'devops and tools', description: 'Used for building scalable and efficient cloud-based systems.' },
  { name: 'Docker', logo: dockerLogo, category: 'devops and tools', description: 'Used for building scalable and efficient container-based systems.' },
  { name: 'Kubernetes', logo: k8sLogo, category: 'devops and tools', description: 'Used for building scalable and efficient container-based systems.' },
  { name: 'Vite', logo: viteLogo, category: 'devops and tools', description: 'Used for building scalable and efficient development workflows.' },
  { name: 'Figma', logo: figmaLogo, category: 'devops and tools', description: 'Used for building scalable and efficient design systems.' },
];

export const Skills: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories = [
    { title: 'frontend', subtitle: "Building intuitive and responsive interfaces", color: 'rgba(255,107,0,0.1)' },
    { title: 'backend', subtitle: "Building scalable and efficient server-side solutions", color: 'rgba(0,150,255,0.1)' },
    { title: 'devops and tools', subtitle: "Streamlining development and deployment workflows", color: 'rgba(0,255,150,0.1)' }
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        background: 'linear-gradient(145deg, #1f1f1f 0%, #121212 50%, #292929 100%)',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        mt: 4,
        p: 4,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="#FF6B00" sx={{ animation: `${fadeIn} 1s ease-out` }}>
        My Tech Stack
      </Typography>
      <Grid container spacing={4}>
        {categories.map(({ title, subtitle, color }, index) => (
          <Grid item xs={12} md={4} key={title} sx={{ animation: `${fadeIn} 1s ease-out ${index * 0.2}s both` }}>
            <Box mb={2} sx={{ background: color, borderRadius: 2, p: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ textTransform: 'capitalize', color: '#FF6B00' }}>
                {title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic', color: '#B0B0B0' }}>
                {subtitle}
              </Typography>
              <Grid container spacing={2}>
                {techStack
                  .filter((tech) => tech.category === title)
                  .sort((a, b) => {
                    if (a.priority && !b.priority) return -1;
                    if (!a.priority && b.priority) return 1;
                    return 0;
                  })
                  .map((tech, techIndex) => (
                    <Grid item xs={6} sm={4} key={techIndex}>
                      <Tooltip title={tech.description} arrow placement="top">
                        <Card
                          sx={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease-in-out',
                            transform: hoveredTech === tech.name ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: hoveredTech === tech.name ? '0 4px 20px rgba(255,107,0,0.3)' : 'none',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 20px rgba(255,107,0,0.3)',
                            },
                          }}
                          onMouseEnter={() => setHoveredTech(tech.name)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          <CardMedia
                            component="img"
                            image={tech.logo}
                            alt={`${tech.name} logo`}
                            sx={{
                              width: tech.priority ? 70 : 60,
                              height: tech.priority ? 70 : 60,
                              objectFit: 'contain',
                              mt: 2,
                            }}
                          />
                          <CardContent>
                            <Typography variant="body2" align="center" sx={{ color: '#FFFFFF' }}>
                              {tech.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Tooltip>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, rgba(255,107,0,0) 70%)',
          zIndex: 0,
        }}
      />
    </Paper>
  );
};
