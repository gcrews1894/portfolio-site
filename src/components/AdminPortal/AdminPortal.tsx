import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, IconButton, Collapse, Modal, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme, Theme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { SiReact, SiTypescript, SiNodedotjs, SiExpress, SiPostgresql, SiMui } from 'react-icons/si';
import AdminDashboardScreenshot from '../../assets/Trellis-1.png';
import BillingScreenshot from '../../assets/Trellis-2.png';

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

const MetricBox = styled(Box)(() => ({
  textAlign: 'center',
  padding: useTheme().spacing(2),
  backgroundColor: 'rgba(33, 150, 243, 0.05)',
  borderRadius: useTheme().shape.borderRadius,
  boxShadow: useTheme().shadows[1],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.2)',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
}));

const ExpandMore = styled(IconButton)<{ isExpanded?: boolean }>(({ theme, isExpanded }) => ({
  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: (theme as Theme).transitions.create('transform', {
    duration: (theme as Theme).transitions.duration.shortest,
  }),
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

const FeatureItem: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1">{title}</Typography>
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{ ml: 1 }}
            >
              <ExpandMoreIcon
                sx={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </IconButton>
          </Box>
        }
        secondary={
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" paragraph>
              {description}
            </Typography>
          </Collapse>
        }
      />
    </ListItem>
  );
};

export const AdminPortal: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box my={4}>
      <Typography variant="h3" component="h2" gutterBottom>
        Ivy Energy Case Study: Admin Platform Modernization
      </Typography>
      <Box mb={2}>
        <StyledChip icon={<CodeIcon />} label="Frontend Lead" color="primary" sx={{ mr: 1, color: 'black' }} />
        <StyledChip icon={<StorageIcon />} label="Data Optimization" color="secondary" sx={{ mr: 1 }} />
        <StyledChip icon={<SpeedIcon />} label="Performance Tuning" color="success" />
      </Box>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          I was brought on to modernize Ivy Energy's internal admin portal, transforming the original PHP-based 1.0 proof-of-concept platform into a scalable solution using React, Node.js, and Express. The goal was to improve operational efficiency, enable easier future development, and handle increasingly complex data. The MVP of the 2.0 platform was launched in six to eight months, with ongoing iterations after that.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Technical Challenges</Typography>
            <Typography variant="body1" paragraph>
              The main challenge was migrating from a monolithic PHP application to a modern React-based solution while ensuring zero downtime and maintaining data integrity. This required careful planning of the migration strategy and implementation of a robust testing process.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Data Migration"
                  secondary="Implemented a staged migration approach to safely transfer data from the legacy system"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Performance Optimization"
                  secondary="Reduced average page load times by 60% through code splitting and lazy loading"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="User Experience"
                  secondary="Redesigned the interface for improved usability and faster task completion"
                />
              </ListItem>
            </List>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Key Achievements</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="primary">60%</Typography>
                  <Typography variant="subtitle1">Faster Page Loads</Typography>
                </MetricBox>
              </Grid>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="secondary">85%</Typography>
                  <Typography variant="subtitle1">Task Completion Rate</Typography>
                </MetricBox>
              </Grid>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="success">40%</Typography>
                  <Typography variant="subtitle1">Reduced Development Time</Typography>
                </MetricBox>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Solutions & Technologies</Typography>
        <Typography variant="body1" paragraph>
          We used a modern tech stack that included React, TypeScript, Node.js, Express, and PostgreSQL. The frontend was built with Material-UI for consistent design and improved development speed. We implemented RESTful APIs for efficient data communication and used JWT for secure authentication.
        </Typography>
        <Box mb={2}>
          <TechIcon>
            <SiReact color="#61DAFB" />
            <Typography sx={{ ml: .5 }} className="tech-name">React</Typography>
          </TechIcon>
          <TechIcon>
            <SiTypescript color="#3178C6" />
            <Typography sx={{ ml: .5 }} className="tech-name">TypeScript</Typography>
          </TechIcon>
          <TechIcon>
            <SiNodedotjs color="#339933" />
            <Typography sx={{ ml: .5 }} className="tech-name">Node.js</Typography>
          </TechIcon>
          <TechIcon>
            <SiExpress color="#000000" />
            <Typography sx={{ ml: .5 }} className="tech-name">Express</Typography>
          </TechIcon>
          <TechIcon>
            <SiPostgresql color="#336791" />
            <Typography sx={{ ml: .5 }} className="tech-name">PostgreSQL</Typography>
          </TechIcon>
          <TechIcon>
            <SiMui color="#0081CB" />
            <Typography sx={{ ml: .5 }} className="tech-name">Material-UI</Typography>
          </TechIcon>
        </Box>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageWrapper onClick={() => handleImageClick(AdminDashboardScreenshot)}>
            <img src={AdminDashboardScreenshot} alt="Admin Dashboard" />
            <ZoomInIcon className="zoom-icon" />
          </ImageWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageWrapper onClick={() => handleImageClick(BillingScreenshot)}>
            <img src={BillingScreenshot} alt="Billing Interface" />
            <ZoomInIcon className="zoom-icon" />
          </ImageWrapper>
        </Grid>
      </Grid>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Impact</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <MetricBox>
              <Typography variant="h3" color="primary">85%</Typography>
              <Typography variant="subtitle1">Increase in operational efficiency</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricBox>
              <Typography variant="h3" color="secondary">30%</Typography>
              <Typography variant="subtitle1">Improvement in data retrieval times</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricBox>
              <Typography variant="h3" color="success">400%</Typography>
              <Typography variant="subtitle1">Reduction in response times</Typography>
            </MetricBox>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>Key User Features:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                <FeatureItem
                  title="Billing Process Management"
                  description="Users had complete control over the billing data at every step of the bill generation process. They could manually adjust billing data when needed, restart individual steps of the billing process in case of errors, inspect PDF bills before dispatch to ensure accuracy and successful generation, and dispatch bills directly through the portal, streamlining the billing workflow."
                />
                <FeatureItem
                  title="Bulk Data Upload & Automation"
                  description="The portal allowed users to efficiently manage tenant, unit, and agreement data by uploading bulk data via properly formatted CSV files for creating and updating units, tenants, and agreements. It also automated data synchronization with PropertyTech platforms, reducing manual input and ensuring up-to-date community information."
                />
                <FeatureItem
                  title="Comprehensive Data Tables"
                  description="Every data table within the admin portal offered advanced functionalities, including sorting, filtering, and exporting data, customizable columns to tailor the view to specific needs, access to historical data for agreements, allowing users to track past contracts and details for any unit. Tables were available for monitoring billing steps, community hierarchies (units, tenants, agreements), and energy production and consumption metrics."
                />
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <FeatureItem
                  title="Session Persistence"
                  description="Users could customize and save their preferred table settings (filters, sorting, and columns) across sessions, allowing them to pick up where they left off without reconfiguring views."
                />
                <FeatureItem
                  title="Real-Time Feedback"
                  description="Any change made to the database from the UI triggered toast notifications, providing immediate feedback on whether the request was successful or if there were any issues."
                />
                <FeatureItem
                  title="Role-Based Permissions"
                  description="Users had assigned roles that regulated their access to data, ensuring that permissions were aligned with their responsibilities and access requirements."
                />
              </List>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Key Takeaways
          <ExpandMore
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            isExpanded={expanded}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Typography>
        <Typography variant="body1" paragraph>
          One of the most valuable lessons from this project was the importance of not reinventing the wheel. Starting with a custom component library cost us a lot of time, and the decision to switch to Material UI ended up being much more time-efficient and functional.
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1" paragraph>
            Going forward, I always consider whether building something custom truly adds value or if leveraging existing solutions like Material UI is the smarter choice. Another significant lesson was the value of planning for scalability from the start. I learned how crucial it is to design with growth in mind, particularly when building a system that needs to handle increasing amounts of complex data, like our time series electricity consumption data.
          </Typography>
          <Typography variant="body1" paragraph>
            By optimizing our database architecture early and choosing scalable tools and patterns, we avoided significant technical debt down the road. This foresight allowed us to add new features and functionality smoothly as the platform grew.
          </Typography>
        </Collapse>
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
          {selectedImage && <img src={selectedImage} alt="Enlarged view" />}
        </Box>
      </Modal>
    </Box>
  );
};
