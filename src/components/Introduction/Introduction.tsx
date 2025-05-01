import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { ScrollAnimation } from '../UtilityComponents/ScrollAnimation';

// Import your photo
import profilePhoto from '../../assets/personalPhoto.png';

export const Introduction: React.FC = () => {
  return (
    <ScrollAnimation animation="fadeIn" duration={0.8}>
      <Paper
        elevation={3}
        sx={{
          background: 'linear-gradient(145deg, #0A1929 0%, #132F4C 50%, #1E3A5F 100%)',
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
          <ScrollAnimation animation="slideRight" delay={0.2}>
            <Avatar
              src={profilePhoto}
              alt="Gavin Crews"
              sx={{
                width: { xs: 150, md: 200 },
                height: { xs: 150, md: 200 },
                mb: { xs: 2, md: 0 },
                mr: { md: 4 },
                border: '4px solid #2196F3',
                boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
                background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 40%, rgba(33, 150, 243, 0) 80%)'
              }}
            />
          </ScrollAnimation>
          <ScrollAnimation animation="slideLeft" delay={0.4}>
            <Box>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="#2196F3">
                Hey, I'm Gavin Crews!
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '900px', lineHeight: 1.6, color: '#FFFFFF', fontSize: '1.3rem' }}>
                I'm a software engineer who's passionate about turning complex problems into seamless digital experiences. With over 4 years of experience in building web applications, I specialize in creating scalable, user-friendly solutions that blend elegant design with robust functionality.
              </Typography>
            </Box>
          </ScrollAnimation>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: -150,
            right: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0) 70%)',
            zIndex: 0,
          }}
        />
      </Paper>
    </ScrollAnimation>
  );
};
