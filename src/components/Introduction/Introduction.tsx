import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { keyframes } from '@mui/system';

// Import your photo
import profilePhoto from '../../assets/personalPhoto.png';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Introduction: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        background: 'linear-gradient(145deg, #1f1f1f 0%, #121212 50%, #292929 100%)',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          p: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Avatar
          src={profilePhoto}
          alt="Gavin Crews"
          sx={{
            width: { xs: 150, md: 200 },
            height: { xs: 150, md: 200 },
            mb: { xs: 2, md: 0 },
            mr: { md: 4 },
            border: '4px solid #FF6B00',
            boxShadow: '0 4px 10px rgba(255,107,0,0.3)',
            animation: `${fadeIn} 1s ease-out`,
            background: 'radial-gradient(circle, rgba(255,107,0,0.1) 40%, rgba(255,107,0,0) 80%)'
          }}
        />
        <Box sx={{ animation: `${fadeIn} 1s ease-out 0.3s both` }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="#FF6B00">
            Hey, I'm Gavin Crews!
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '900px', lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.3rem' }}>
            I'm a software engineer who’s passionate about turning complex problems into seamless digital experiences. With over 4 years of experience in building web applications, I specialize in creating scalable, user-friendly solutions that blend elegant design with robust functionality.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: -150,
          right: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, rgba(255,107,0,0) 70%)',
          zIndex: 0,
        }}
      />
    </Paper>
  );
};
