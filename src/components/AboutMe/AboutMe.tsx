import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, styled, darken } from '@mui/material';
import { keyframes } from '@mui/system';
import CodeIcon from '@mui/icons-material/Code';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PoolIcon from '@mui/icons-material/Pool';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledLink = styled(Link)(() => ({
  color: '#FF6B00',
  textDecoration: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.3s, color 0.3s',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  '&:hover': {
    color: darken('#FF6B00', 0.2),
  },
}));

const IconBox: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>{text}</Typography>
    <Box sx={{ color: '#FF6B00', ml: 2 }}>{icon}</Box>
  </Box>
);

export const AboutMe: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        background: '#1A1A1A',
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
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="#FF6B00" sx={{ animation: `${fadeIn} 1s ease-out` }}>
          About Me
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ animation: `${fadeIn} 1s ease-out 0.3s both` }}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.1rem' }}>
                I’ve worked with technologies like React, TypeScript, and Node.js to build everything from dynamic web platforms to responsive user interfaces. My approach is all about creating applications that not only meet technical requirements but also feel seamless and intuitive for users. If you're curious about the nitty-gritty of my recent work, you can explore some detailed case studies <StyledLink to="/case-studies">here</StyledLink>.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.1rem' }}>
                Beyond coding, I’m a storyteller at heart. Whether it's through a perfectly timed photo, a video edit, or even a new favorite book, I believe that great stories can inspire us all. When I’m not working on the next digital solution, you might find me behind a camera, getting lost in a classic novel, or discovering new music on Spotify.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.1rem' }}>
                I'm always eager to learn new technologies and collaborate with others who share a love for innovative solutions. If you're looking for someone who can bring a blend of technical expertise and a user-first mindset to your team, I'd love to connect! Let's create something amazing together.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ animation: `${fadeIn} 1s ease-out 0.6s both`, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#FF6B00' }}>
                Passions & Interests
              </Typography>
              <IconBox icon={<CodeIcon />} text="Software Development" />
              <IconBox icon={<CameraAltIcon />} text="Photography" />
              <IconBox icon={<MenuBookIcon />} text="Reading" />
              <IconBox icon={<PoolIcon />} text="Swimming" />
            </Box>
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
          background: 'linear-gradient(90deg, rgba(255,107,0,0) 0%, rgba(255,107,0,0.1) 100%)',
          zIndex: 0,
        }}
      />
    </Paper>
  );
};
