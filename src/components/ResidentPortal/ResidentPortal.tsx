import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, Modal } from '@mui/material';
import { styled } from '@mui/system';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { SiTypescript, SiNextdotjs, SiMui, SiDatadog } from 'react-icons/si';
import UserfrontLogo from '../../assets/userfront.png';
import residentPortalScreenshot from '../../assets/resident-portal.png';

const TechIcon = styled(Box)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '16px',
  '& svg': {
    width: 20,
    height: 20,
  },
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    '& .tech-name': {
      color: '#2196F3',
    },
  },
}));

const MetricBox = styled(Box)(() => ({
  textAlign: 'center',
  padding: '16px',
  backgroundColor: 'rgba(33, 150, 243, 0.05)',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.2)',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
}));

const ImageWrapper = styled(Box)(() => ({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    '& .zoom-icon': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
    '& img': {
      opacity: 0.8,
    },
  },
  '& img': {
    width: '100%',
    height: 'auto',
    transition: 'all 0.3s ease-in-out',
  },
  '& .zoom-icon': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.8)',
    opacity: 0,
    transition: 'all 0.3s ease-in-out',
    color: '#2196F3',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    padding: '8px',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(33, 150, 243, 0.05)',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(33, 150, 243, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const StyledChip = styled(Chip)(() => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
  },
}));

export const ResidentPortal: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box my={4}>
      <Typography variant="h3" component="h2" gutterBottom>
        Ivy Energy Case Study: Resident Portal Development
      </Typography>
      <Box mb={2}>
        <StyledChip icon={<CodeIcon />} label="Full Stack Developer" color="primary" sx={{ mr: 1 }} />
        <StyledChip icon={<SecurityIcon />} label="Authentication" color="secondary" sx={{ mr: 1 }} />
        <StyledChip icon={<SpeedIcon />} label="User Experience" color="success" />
      </Box>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          The Resident Portal was designed to provide Ivy Energy's residents with a seamless way to log in, view their billing history, and access data metrics related to their energy consumption. By giving residents insight into their energy use, we aimed to help them reduce their consumption and ultimately save on bills. From the initial concept to the MVP, the development took around 4 months, with a soft launch to a select group of communities before rolling out more broadly 2 months later.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Key Features</Typography>
            <Typography variant="body1" paragraph>
              • Secure authentication and portal invite flow using Userfront
            </Typography>
            <Typography variant="body1" paragraph>
              • Real-time energy consumption monitoring
            </Typography>
            <Typography variant="body1" paragraph>
              • Historical billing data visualization
            </Typography>
            <Typography variant="body1" paragraph>
              • Personalized energy-saving recommendations
            </Typography>
            <Typography variant="body1">
              • Mobile-responsive design for accessibility
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Impact & Results</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="primary">50%</Typography>
                  <Typography variant="subtitle1">Increase in User Engagement</Typography>
                </MetricBox>
              </Grid>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="secondary">40%</Typography>
                  <Typography variant="subtitle1">Reduction in Support Tickets</Typography>
                </MetricBox>
              </Grid>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="success">15%</Typography>
                  <Typography variant="subtitle1">Average Energy Savings</Typography>
                </MetricBox>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Solutions & Technologies</Typography>
        <Typography variant="body1" paragraph>
          We used a modern tech stack that included TypeScript, Next.js, Material-UI, and Userfront for authentication. We also implemented Datadog for logging and monitoring to ensure system reliability. The project utilized the module pattern to organize code and manage complex processes such as authentication and data retrieval. This made the system modular, scalable, and easier to maintain.
        </Typography>
        <Box>
          <TechIcon>
            <SiTypescript color="#3178C6" />
            <Typography sx={{ ml: .5 }} className="tech-name">TypeScript</Typography>
          </TechIcon>
          <TechIcon>
            <SiNextdotjs color="#000000" />
            <Typography sx={{ ml: .5 }} className="tech-name">Next.js</Typography>
          </TechIcon>
          <TechIcon>
            <SiMui color="#0081CB" />
            <Typography sx={{ ml: .5 }} className="tech-name">Material-UI</Typography>
          </TechIcon>
          <TechIcon>
            <img src={UserfrontLogo} alt="Userfront" style={{ width: '20px', height: '20px' }} />
            <Typography sx={{ ml: .5 }} className="tech-name">Userfront</Typography>
          </TechIcon>
          <TechIcon>
            <SiDatadog color="#632CA6" />
            <Typography sx={{ ml: .5 }} className="tech-name">Datadog</Typography>
          </TechIcon>
        </Box>
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Portal Interface</Typography>
        <ImageWrapper onClick={handleImageClick}>
          <img src={residentPortalScreenshot} alt="Resident Portal Interface" />
          <ZoomInIcon className="zoom-icon" />
        </ImageWrapper>
      </StyledPaper>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="image-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& img': {
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'background.paper',
            boxShadow: 24,
            p: 1,
            borderRadius: 1,
          }}
        >
          <img src={residentPortalScreenshot} alt="Enlarged Portal Interface" />
        </Box>
      </Modal>
    </Box>
  );
};
