import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, IconButton, Collapse, Modal, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme, Theme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { SiReact, SiTypescript, SiVite, SiAmazon, SiMysql } from 'react-icons/si';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import GamioticsAdmin1 from '../../assets/gamiotics-admin-1.png';
import GamioticsAdmin2 from '../../assets/gamiotics-admin-2.png';
import GamioticsAdmin3 from '../../assets/gamiotics-admin-3.png';
import GamioticsMobile1 from '../../assets/gamiotics-mobile-client-1.png';
import GamioticsMobile2 from '../../assets/gamiotics-mobile-client-2.png';
import GamioticsMobile3 from '../../assets/gamiotics-mobile-client-3.png';
import GamioticsPerformance from '../../assets/gamiotics-performance-screen-1.png';

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

const SwiperContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(33, 150, 243, 0.05)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  '& .swiper': {
    paddingBottom: '50px',
  },
  '& .swiper-slide': {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      maxHeight: '400px',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
      borderRadius: theme.shape.borderRadius,
    },
    '@media (max-width: 768px)': {
      '& img': {
        maxHeight: '300px',
      },
    },
  },
  '& .swiper-button-next, & .swiper-button-prev': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    marginTop: '-20px',
    '&:after': {
      fontSize: '18px',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  '& .swiper-pagination-bullet': {
    backgroundColor: theme.palette.grey[400],
    opacity: 1,
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: theme.palette.primary.main,
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

export const TwentySidedTavern: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: GamioticsAdmin3, alt: "Gamiotics Admin Console Analytics" },
    { src: GamioticsAdmin1, alt: "Gamiotics Admin Console Dashboard" },
    { src: GamioticsMobile1, alt: "Gamiotics Mobile Voting Interface" },
    { src: GamioticsAdmin2, alt: "Gamiotics Admin Console Voting Management" },
    { src: GamioticsMobile2, alt: "Gamiotics Mobile App Voting Screen" },
    { src: GamioticsMobile3, alt: "Gamiotics Mobile Client Additional View" },
    { src: GamioticsPerformance, alt: "Gamiotics Performance Screen Display" },
  ];

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
        Gamiotics Interactive Audience Platform
      </Typography>
      <Box mb={2}>
        <StyledChip icon={<CodeIcon />} label="Lead Frontend Engineer" color="primary" sx={{ mr: 1, color: 'black' }} />
        <StyledChip icon={<SpeedIcon />} label="Real-time Systems" color="secondary" sx={{ mr: 1 }} />
        <StyledChip icon={<PeopleIcon />} label="Live Performance Tech" color="success" />
      </Box>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          Gamiotics is a live‑audience participation platform that powers an immersive, Dungeons & Dragons–themed theatre experience. From February to July 2025 I served as the contract lead front‑end engineer on a two‑person team, owning all user‑facing interfaces and collaborating closely with the back‑end engineer, cast, and production crew.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Technical Challenges</Typography>
            <Typography variant="body1" paragraph>
              The main challenges involved delivering sub‑second, bi‑directional communications for up to 3,000 in‑house mobile devices on a mixed cloud/on‑prem relay network while maintaining seamless connectivity on saturated theatre Wi‑Fi.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Ultra-Low Latency Communications"
                  secondary="Deliver sub‑second, bi‑directional communications for up to 3,000 concurrent mobile devices"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Vote Latency Optimization"
                  secondary="Reduce vote round‑trip latency that initially averaged 400ms down to sub-100ms"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Network Resilience"
                  secondary="Maintain seamless connectivity on saturated, temporary theatre Wi‑Fi with graceful reconnection flows"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="No-Code Admin Console"
                  secondary="Provide non‑technical show staff with tools to create prompts, upload assets, and run 60+ live voting rounds per show"
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
                  <Typography variant="h3" color="primary">75%</Typography>
                  <Typography variant="subtitle1">Latency Reduction (400ms → 100ms)</Typography>
                </MetricBox>
              </Grid>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="secondary">4,000</Typography>
                  <Typography variant="subtitle1">Concurrent Voters Load Tested</Typography>
                </MetricBox>
              </Grid>
              <Grid item xs={12}>
                <MetricBox>
                  <Typography variant="h3" color="success">95%+</Typography>
                  <Typography variant="subtitle1">Average Audience Participation</Typography>
                </MetricBox>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Solutions & Technologies</Typography>
        <Typography variant="body1" paragraph>
          We built a robust real-time platform using React 18 with TypeScript for the frontend, native WebSockets for bi-directional communication, and a hybrid cloud/on-premises architecture. The system utilized Java REST APIs, MySQL 8 for persistence, and AWS infrastructure with load balancing across multiple EC2 instances.
        </Typography>
        <Box mb={2}>
          <TechIcon>
            <SiReact color="#61DAFB" />
            <Typography sx={{ ml: .5 }} className="tech-name">React 18</Typography>
          </TechIcon>
          <TechIcon>
            <SiTypescript color="#3178C6" />
            <Typography sx={{ ml: .5 }} className="tech-name">TypeScript</Typography>
          </TechIcon>
          <TechIcon>
            <SiVite color="#646CFF" />
            <Typography sx={{ ml: .5 }} className="tech-name">Vite</Typography>
          </TechIcon>
          <TechIcon>
            <CodeIcon color="primary" />
            <Typography sx={{ ml: .5 }} className="tech-name">Java REST API</Typography>
          </TechIcon>
          <TechIcon>
            <SiMysql color="#4479A1" />
            <Typography sx={{ ml: .5 }} className="tech-name">MySQL 8</Typography>
          </TechIcon>
          <TechIcon>
            <SiAmazon color="#232F3E" />
            <Typography sx={{ ml: .5 }} className="tech-name">AWS</Typography>
          </TechIcon>
        </Box>
      </StyledPaper>

      <SwiperContainer>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <ImageWrapper onClick={() => handleImageClick(image.src)}>
                <img src={image.src} alt={image.alt} />
                <ZoomInIcon className="zoom-icon" />
              </ImageWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>Impact Metrics</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <MetricBox>
              <Typography variant="h3" color="primary">4,000</Typography>
              <Typography variant="subtitle1">Max concurrent connections verified in load tests</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricBox>
              <Typography variant="h3" color="secondary">75%</Typography>
              <Typography variant="subtitle1">Latency reduction after WebSocket tuning</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricBox>
              <Typography variant="h3" color="success">40%</Typography>
              <Typography variant="subtitle1">Smaller initial bundle and faster first paint</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricBox>
              <Typography variant="h3" color="primary">95%+</Typography>
              <Typography variant="subtitle1">Audience members cast at least one vote per show</Typography>
            </MetricBox>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>Key User Features:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                <FeatureItem
                  title="Admin Console"
                  description="A comprehensive no-code interface that allows non-technical show staff to set up voting prompts, upload fonts and images, and control elections in real time. The console provides intuitive workflows for managing 60+ live voting rounds per show without requiring developer assistance."
                />
                <FeatureItem
                  title="Mobile Voting App"
                  description="A responsive PWA-style interface optimized for theatre environments, featuring instant vote casting with live status indicators and haptic feedback. The app maintains connectivity even on saturated Wi-Fi networks with robust reconnection logic and clear user feedback for enhanced reliability."
                />
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <FeatureItem
                  title="Performance Screen"
                  description="A large-format display system with real-time animated bar charts, winner callouts, and customizable show-branding skins. The screen updates vote tallies instantly with smooth animations, creating an engaging visual experience for the live audience."
                />
                <FeatureItem
                  title="Real-Time Communication System"
                  description="Native WebSocket implementation with exponential-backoff reconnection logic and heartbeat pings, ensuring sub-second bi-directional communication for up to 4,000 concurrent users across a hybrid cloud/on-premises relay network."
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
          This project demonstrated that hybrid cloud/on‑premises architectures can meet stringent latency targets when public internet access is unavailable, and that a single source‑of‑truth state layer with well‑designed hooks dramatically simplifies complex real‑time UI updates.
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1" paragraph>
            Cross‑functional collaboration with non‑technical theatre staff proved crucial for adoption and smooth show operation. Creating intuitive interfaces and comprehensive documentation enabled stage managers to operate the system independently, which was essential for live performance environments.
          </Typography>
          <Typography variant="body1" paragraph>
            The importance of robust reconnection logic and clear user feedback became evident in unstable network environments. These features dramatically improved perceived reliability, ensuring audience members remained engaged even when facing connectivity challenges in the crowded theatre setting.
          </Typography>
          <Typography variant="body1" paragraph>
            Load testing early and often was critical to success. By verifying our architecture could handle 4,000 concurrent connections with zero dropped messages, we gained confidence in the system's ability to perform under the pressure of live theatre where failure is not an option.
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
