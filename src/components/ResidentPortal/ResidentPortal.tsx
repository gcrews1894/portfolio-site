import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, IconButton, Collapse, Modal, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { SiTypescript, SiNextdotjs, SiMui, SiDatadog } from 'react-icons/si';
import UserfrontLogo from '../../assets/userfront.png';
import residentPortalScreenshot from '../../assets/resident-portal.png';

const TechIcon = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: theme?.spacing(2),
  '& svg': {
    width: 20,
    height: 20,
  },
}));

const MetricBox = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  textAlign: 'center',
  padding: theme?.spacing(2),
  backgroundColor: theme?.palette.background.paper,
  borderRadius: theme?.shape.borderRadius,
  boxShadow: theme?.shadows[1],
}));

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ImageWrapper = styled(Box)(() => ({
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    '& .MuiSvgIcon-root': { opacity: 1 },
    '& img': { opacity: 0.7 },
  },
}));

const ModalImage = styled('img')({
  maxWidth: '90%',
  maxHeight: '90%',
  margin: 'auto',
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0 0 24px rgba(0, 0, 0, 0.2)',
});

export const ResidentPortal: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        <Chip icon={<CodeIcon />} label="Full Stack Developer" color="primary" sx={{ mr: 1 }} />
        <Chip icon={<SecurityIcon />} label="Authentication" color="secondary" sx={{ mr: 1 }} />
        <Chip icon={<SpeedIcon />} label="User Experience" color="success" />
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(255,107,0,0.05)', borderRadius: 4, }}>
        <Typography variant="h4" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          The Resident Portal was designed to provide Ivy Energy's residents with a seamless way to log in, view their billing history, and access data metrics related to their energy consumption. By giving residents insight into their energy use, we aimed to help them reduce their consumption and ultimately save on bills. From the initial concept to the MVP, the development took around 4 months, with a soft launch to a select group of communities before rolling out more broadly 2 months later.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4, }}>
            <Typography variant="h5" gutterBottom>My Role</Typography>
            <Typography variant="body1" paragraph>
              I was one of three engineers working across the stack to bring the Resident Portal to life. My responsibilities included building out the frontend components and user flows, as well as developing API endpoints to ensure the portal was properly hydrated with resident-specific data. I collaborated closely with backend engineers to deliver a smooth, user-friendly experience.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4, }}>
            <Typography variant="h5" gutterBottom>Challenges</Typography>
            <Typography variant="body1" paragraph>
              One of the biggest challenges was implementing secure authentication and data access. To ensure that residents could only access their own data, we developed a complex portal invite flow using Userfront, which required users to verify their identity before accessing the portal. Additionally, we faced the challenge of incentivizing residents to use the platform, as they were already receiving billing information via email or physical mail. We addressed this by providing tools that offered valuable insights into how residents could further reduce their energy consumption and lower their bills.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, my: 4, borderRadius: 4, }}>
        <Typography variant="h4" gutterBottom>Solutions & Technologies</Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              We used a modern tech stack that included TypeScript, Next.js, Material-UI, and Userfront for authentication. We also implemented Datadog for logging and monitoring to ensure system reliability. The project utilized the module pattern to organize code and manage complex processes such as authentication and data retrieval. This made the system modular, scalable, and easier to maintain.
            </Typography>
            <Box>
              <TechIcon><SiTypescript color="#3178C6" /><Typography sx={{ ml: .5 }}>TypeScript</Typography></TechIcon>
              <TechIcon><SiNextdotjs color="#000000" /><Typography sx={{ ml: .5 }}>Next.js</Typography></TechIcon>
              <TechIcon><SiMui color="#0081CB" /><Typography sx={{ ml: .5 }}>Material-UI</Typography></TechIcon>
              <TechIcon><img src={UserfrontLogo} alt="Userfront" style={{ width: '20px', height: '20px' }} /><Typography sx={{ ml: .5 }}>Userfront</Typography></TechIcon>
              <TechIcon><SiDatadog color="#632CA6" /><Typography sx={{ ml: .5 }}>Datadog</Typography></TechIcon>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Tooltip title="Click to enlarge" arrow>
              <ImageWrapper onClick={handleImageClick}>
                <Box
                  component="img"
                  src={residentPortalScreenshot}
                  alt="Resident Portal interface"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 1,
                    transition: 'opacity 0.3s',
                  }}
                />
                <ZoomInIcon
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    fontSize: '2rem',
                    color: 'primary.main',
                  }}
                />
              </ImageWrapper>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(255,107,0,0.05)', borderRadius: 4, }}>
        <Typography variant="h4" gutterBottom>Impact</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MetricBox>
              <Typography variant="h3" color="primary">30%</Typography>
              <Typography variant="subtitle1">Increase in customer satisfaction</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MetricBox>
              <Typography variant="h3" color="secondary">4 months</Typography>
              <Typography variant="subtitle1">From concept to MVP launch</Typography>
            </MetricBox>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body1" paragraph>
            The Resident Portal was well received by users upon launch. Many residents appreciated the convenience of viewing their bills and the added value of personalized insights to help them reduce energy consumption. As a result, customer satisfaction among users increased by approximately 30%. The portal provided a user-friendly experience while also delivering significant functionality that helped users save money.
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 4, }}>
        <Typography variant="h4" gutterBottom>
          Key Takeaways
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Typography>
        <Typography variant="body1" paragraph>
          A major lesson from this project was the importance of balancing security and user experience. While we needed a robust authentication system to protect sensitive data, it was crucial to ensure that the user journey remained smooth and intuitive.
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1" paragraph>
            Initially, the portal invite flow added complexity to the user experience, and we quickly learned how important it is to streamline these processes without compromising security. This project reinforced the value of early feedback from users and iterative development to create a secure yet user-friendly solution.
          </Typography>
        </Collapse>
      </Paper>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalImage src={residentPortalScreenshot} alt="Full size Resident Portal interface" />
      </Modal>
    </Box>
  );
};
