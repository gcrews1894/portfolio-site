import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, IconButton, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SiReact, SiTypescript } from 'react-icons/si';

const TechIcon = styled(Box)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: useTheme().spacing(2),
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

const ExpandMore = styled(IconButton)(() => ({
  transform: 'rotate(0deg)',
  marginLeft: 'auto',
  transition: 'transform 0.3s',
  '&.expanded': {
    transform: 'rotate(180deg)',
  },
}));

const StyledChip = styled(Chip)(() => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
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

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.15)',
    '& .MuiTypography-h6': {
      color: theme.palette.primary.main,
    },
  },
}));

export const NeuropathyApp: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box my={4}>
      <Typography variant="h3" component="h2" gutterBottom>
        Peripheral Neuropathy Detection App — Proof of Concept
      </Typography>
      <Box mb={2}>
        <StyledChip icon={<CodeIcon />} label="Frontend Developer" color="primary" sx={{ mr: 1 }} />
        <StyledChip icon={<StorageIcon />} label="Healthcare" color="secondary" sx={{ mr: 1 }} />
        <StyledChip icon={<SpeedIcon />} label="Mobile Development" color="success" />
      </Box>

      <StyledPaper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(33, 150, 243, 0.05)', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          As part of an exploratory initiative at Pfizer, I collaborated on the development of a proof-of-concept mobile application designed to help doctors assess peripheral neuropathy in cancer patients. Peripheral neuropathy—often caused by chemotherapy—affects nerve function, particularly in extremities like the hands and feet. Our goal was to prototype a non-invasive, app-based tool that could offer quantifiable, trackable insights into nerve sensitivity using nothing more than a mobile device.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>The Concept</Typography>
        <Typography variant="body1" paragraph>
          The app measured patients' sensitivity to vibration in their fingers. Users would press and hold their finger on a designated area of the screen, and the app would trigger vibrations of increasing intensity through the device's haptic motor. The user was instructed to lift their finger as soon as they could feel the vibration, at which point the app would record the elapsed time and translate it into a numeric sensitivity score. This process was repeated for all five fingers, after which the scores were displayed and stored for evaluation.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h5" gutterBottom>My Role</Typography>
            <Typography variant="body1" paragraph>
              I contributed to standing up the app from the ground up, with responsibilities including:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Building core interactions in the UI using React Native" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Implementing vibration intensity logic using the mobile device's haptic APIs" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Coordinating timing and scoring mechanisms to ensure accuracy and consistency" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Designing and iterating on the user flow to ensure the testing experience was smooth, intuitive, and accessible" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Collaborating with healthcare stakeholders to fine-tune the sensitivity thresholds and UX" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h5" gutterBottom>Challenges</Typography>
            <Typography variant="h6" gutterBottom>Hardware Constraints</Typography>
            <Typography variant="body1" paragraph>
              Mobile haptic motors vary in intensity and behavior across devices and operating systems. Ensuring consistent vibration feedback across different phones was difficult.
            </Typography>
            <Typography variant="h6" gutterBottom>Timing Precision</Typography>
            <Typography variant="body1" paragraph>
              Measuring the exact moment a user released their finger required precise handling of touch events to avoid false positives or lag, which could distort scores.
            </Typography>
            <Typography variant="h6" gutterBottom>UX for Medical Context</Typography>
            <Typography variant="body1" paragraph>
              The app needed to be usable by patients potentially experiencing motor function impairment or cognitive fatigue. We prioritized clear instructions, large tap targets, and immediate feedback.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <StyledPaper elevation={3} sx={{ p: 3, my: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>Solutions & Implementation</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FeaturePaper elevation={2}>
              <Typography variant="h6" gutterBottom>Progressive Vibration Intensity</Typography>
              <Typography variant="body2" paragraph>
                Developed a progressive vibration intensity function, allowing us to fine-tune the duration and strength ramp-up curve.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeaturePaper elevation={2}>
              <Typography variant="h6" gutterBottom>Precise Timing</Typography>
              <Typography variant="body2" paragraph>
                Used debounced touch events and native gesture handling to track press and release timing with millisecond accuracy.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeaturePaper elevation={2}>
              <Typography variant="h6" gutterBottom>Scoring Model</Typography>
              <Typography variant="body2" paragraph>
                Created a simple scoring model that converted time-to-response into a normalized sensitivity score for each finger.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeaturePaper elevation={2}>
              <Typography variant="h6" gutterBottom>Results Display</Typography>
              <Typography variant="body2" paragraph>
                Designed a final report screen to display all five scores in a clean, doctor-friendly format that could be referenced over time or exported for tracking patient progress.
              </Typography>
            </FeaturePaper>
          </Grid>
        </Grid>
        <Box mb={2} mt={3}>
          <TechIcon>
            <SiReact color="#61DAFB" />
            <Typography className="tech-name" sx={{ ml: .5 }}>React Native</Typography>
          </TechIcon>
          <TechIcon>
            <SiTypescript color="#3178C6" />
            <Typography className="tech-name" sx={{ ml: .5 }}>TypeScript</Typography>
          </TechIcon>
        </Box>
      </StyledPaper>

      <StyledPaper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(33, 150, 243, 0.05)', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>Impact</Typography>
        <List>
          <ListItem sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateX(8px)',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: 1,
            },
          }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="The app successfully demonstrated a novel, low-cost approach to quantifying peripheral neuropathy levels using standard smartphone hardware." />
          </ListItem>
          <ListItem sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateX(8px)',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: 1,
            },
          }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="The proof-of-concept was presented internally as a potential tool for early detection and monitoring of neuropathy symptoms in chemotherapy patients." />
          </ListItem>
          <ListItem sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateX(8px)',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: 1,
            },
          }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Helped validate the feasibility of digital tools in clinical assessment contexts, opening the door for future development and trials." />
          </ListItem>
        </List>
      </StyledPaper>

      <StyledPaper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Key Takeaways
          <ExpandMore
            className={expanded ? 'expanded' : ''}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Typography>
        <Typography variant="body1" paragraph sx={{
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
            color: 'primary.main',
          },
        }}>
          User-centered design is critical in healthcare applications—especially when working with vulnerable populations. Building empathy into the design process resulted in an app that was simple yet effective for its target audience.
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1" paragraph sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateX(4px)',
              color: 'primary.main',
            },
          }}>
            Hardware variability in mobile development must be accounted for early on—especially when sensor accuracy or haptic feedback is involved.
          </Typography>
          <Typography variant="body1" paragraph sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateX(4px)',
              color: 'primary.main',
            },
          }}>
            Rapid prototyping, paired with close collaboration with clinical stakeholders, made it possible to move from idea to working app in a short timeframe and deliver meaningful results.
          </Typography>
        </Collapse>
      </StyledPaper>
    </Box>
  );
}; 