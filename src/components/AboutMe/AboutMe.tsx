import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, styled, darken } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PoolIcon from '@mui/icons-material/Pool';
import { ScrollAnimation } from '../UtilityComponents/ScrollAnimation';

const StyledLink = styled(Link)(() => ({
  color: '#2196F3',
  textDecoration: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.3s, color 0.3s',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  '&:hover': {
    color: darken('#2196F3', 0.2),
  },
}));

const IconBox: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>{text}</Typography>
    <Box sx={{ color: '#2196F3', ml: 2 }}>{icon}</Box>
  </Box>
);

export const AboutMe: React.FC = () => {
  return (
    <ScrollAnimation animation="fadeIn" duration={0.8}>
      <Paper
        elevation={3}
        sx={{
          background: '#132F4C',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          mt: 4,
        }}
      >
        <Box
          sx={{
            p: 4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <ScrollAnimation animation="slideUp" delay={0.2}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="#2196F3">
              About Me
            </Typography>
          </ScrollAnimation>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <ScrollAnimation animation="slideRight" delay={0.4}>
                <Box>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.1rem' }}>
                    I've worked with technologies like React, TypeScript, and Node.js to build everything from dynamic web platforms to responsive user interfaces. My approach is all about creating applications that not only meet technical requirements but also feel seamless and intuitive for users. If you're curious about the nitty-gritty of my recent work, you can explore some detailed case studies <StyledLink to="/case-studies">here</StyledLink>.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.1rem' }}>
                    Beyond coding, I'm a storyteller at heart. Whether it's through a perfectly timed photo, a video edit, or even a new favorite book, I believe that great stories can inspire us all. When I'm not working on the next digital solution, you might find me behind a camera, getting lost in a classic novel, or discovering new music on Spotify.
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.1rem' }}>
                    I'm always eager to learn new technologies and collaborate with others who share a love for innovative solutions. If you're looking for someone who can bring a blend of technical expertise and a user-first mindset to your team, I'd love to connect! Let's create something amazing together.
                  </Typography>
                </Box>
              </ScrollAnimation>
            </Grid>
            <Grid item xs={12} md={4}>
              <ScrollAnimation animation="slideLeft" delay={0.6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#2196F3' }}>
                    Passions & Interests
                  </Typography>
                  <IconBox icon={<CodeIcon />} text="Software Development" />
                  <IconBox icon={<CameraAltIcon />} text="Photography" />
                  <IconBox icon={<MenuBookIcon />} text="Reading" />
                  <IconBox icon={<PoolIcon />} text="Swimming" />
                </Box>
              </ScrollAnimation>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '30%',
            background: 'linear-gradient(90deg, rgba(33, 150, 243, 0) 0%, rgba(33, 150, 243, 0.1) 100%)',
            zIndex: 0,
          }}
        />
      </Paper>
    </ScrollAnimation>
  );
};
