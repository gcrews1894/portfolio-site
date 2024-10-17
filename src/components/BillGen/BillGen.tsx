import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Chip, IconButton, Collapse, ImageList, ImageListItem, Modal, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { SiReact, SiAwslambda, SiCss3 } from 'react-icons/si';
import billPage1 from '../../assets/Ivy-Bill-1.png';
import billPage2 from '../../assets/Ivy-Bill-2.png';
import billPage3 from '../../assets/Ivy-Bill-3.png';
import billPage4 from '../../assets/Ivy-Bill-4.png';
import billPage5 from '../../assets/Ivy-Bill-5.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import useMediaQuery from '@mui/material/useMediaQuery';

const TechIcon = styled(Box)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: useTheme().spacing(2),
  '& svg': {
    width: 20,
    height: 20,
  },
}));

const MetricBox = styled(Box)(() => ({
  textAlign: 'center',
  padding: useTheme().spacing(2),
  backgroundColor: useTheme().palette.background.paper,
  borderRadius: useTheme().shape.borderRadius,
  boxShadow: useTheme().shadows[1],
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

export const BillGen: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleImageClick = (imageSrc: string) => {
    const index = billImages.findIndex(img => img === imageSrc);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : billImages.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < billImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!modalOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'Escape':
          handleCloseModal();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  const billImages = [billPage1, billPage2, billPage3, billPage4, billPage5];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box my={4}>
      <Typography variant="h3" component="h2" gutterBottom>
        Ivy Energy Case Study: PDF Bill Generation Service
      </Typography>
      <Box mb={2}>
        <Chip icon={<CodeIcon />} label="React Development" color="primary" sx={{ mr: 1 }} />
        <Chip icon={<SpeedIcon />} label="Performance Optimization" color="secondary" sx={{ mr: 1 }} />
        <Chip icon={<DesignServicesIcon />} label="Template Design" color="success" />
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(255,107,0,0.05)', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          The goal of this project was to replace Ivy Energy's existing PHP-based PDF bill generation system with a more flexible, maintainable solution using React. The new service allowed us to quickly develop and deploy custom bill templates tailored to various client types, significantly improving both the design quality and efficiency of the billing process. The MVP was launched in 2 months, with additional templates added over time.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h5" gutterBottom>My Role</Typography>
            <Typography variant="body1" paragraph>
              I focused on the React development side of the project, designing reusable components for the various bill templates. Backend integration was handled via AWS Lambda, which was triggered during the bill generation process, ensuring a seamless transition between frontend and backend operations.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h5" gutterBottom>Challenges</Typography>
            <Typography variant="body1" paragraph>
              One of the biggest challenges was managing dynamic page breaks based on the varying length of content, such as lists of line items that could vary significantly throughout the year. Ensuring that modules flowed cleanly between pages without cutting off content was critical. Additionally, building reusable components was a challenge, as many modules had to be reused across multiple templates with slightly different layouts and designs.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, my: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>Solutions & Technologies</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              We addressed the dynamic content issue and reusability concerns by using a combination of the Template Method Pattern and the Children as Props pattern. This approach allowed us to structure components flexibly, ensuring that they could be easily adapted for different templates while maintaining consistency. The use of React and CSS gave us the freedom to design bills that were both functional and aesthetically pleasing, significantly improving the user experience.
            </Typography>
            <Box mb={2}>
              <TechIcon><SiReact color="#61DAFB" /><Typography sx={{ ml: .5 }}>React</Typography></TechIcon>
              <TechIcon><SiAwslambda color="#FF9900" /><Typography sx={{ ml: .5 }}>AWS Lambda</Typography></TechIcon>
              <TechIcon>
                <SiCss3 color="#1572B6" />
                <Typography sx={{ ml: .5 }}>CSS</Typography>
              </TechIcon>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>IvyBill Screenshots (click to enlarge)</Typography>
            <ImageList
              sx={{
                width: '100%',
                height: 'auto',
                gridTemplateColumns: isMobile
                  ? 'repeat(auto-fill, minmax(120px, 1fr)) !important'
                  : 'repeat(auto-fill, minmax(150px, 1fr)) !important',
              }}
              gap={8}
            >
              {billImages.map((img, index) => (
                <ImageListItem key={index}>
                  <Tooltip title="Click to enlarge" arrow>
                    <Box
                      onClick={() => handleImageClick(img)}
                      sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        width: '100%',
                        paddingTop: '150%', // 2:3 aspect ratio
                        '&:hover': {
                          '& .MuiSvgIcon-root': { opacity: 1 },
                          '& img': { opacity: 0.7 },
                        },
                      }}
                    >
                      <img
                        src={img}
                        alt={`IvyBill Page ${index + 1}`}
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          backgroundColor: '#f0f0f0',
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
                    </Box>
                  </Tooltip>
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Paper>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '100%' : 'auto',
          height: isMobile ? '100%' : '90vh',
          bgcolor: 'background.paper',
          border: isMobile ? 'none' : '2px solid #000',
          boxShadow: 24,
          p: isMobile ? 0 : 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {modalOpen && (
            <>
              <img
                src={billImages[currentImageIndex]}
                alt={`IvyBill Page ${currentImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: isMobile ? '100%' : 'auto',
                  height: isMobile ? '100%' : 'auto',
                  objectFit: isMobile ? 'contain' : 'cover',
                  display: 'block',
                }}
              />
              <Box sx={{
                position: 'absolute',
                left: isMobile ? 0 : 20,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: isMobile ? 'rgba(0,0,0,0.5)' : 'transparent',
                height: isMobile ? '100%' : 'auto',
                display: 'flex',
                alignItems: 'center',
              }}>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    color: 'white',
                    backgroundColor: isMobile ? 'transparent' : 'rgba(0,0,0,0.5)',
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Box>
              <Box sx={{
                position: 'absolute',
                right: isMobile ? 0 : 20,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: isMobile ? 'rgba(0,0,0,0.5)' : 'transparent',
                height: isMobile ? '100%' : 'auto',
                display: 'flex',
                alignItems: 'center',
              }}>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    color: 'white',
                    backgroundColor: isMobile ? 'transparent' : 'rgba(0,0,0,0.5)',
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(255,107,0,0.05)', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>Impact</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MetricBox>
              <Typography variant="h3" color="primary">100%</Typography>
              <Typography variant="subtitle1">Faster bill generation</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MetricBox>
              <Typography variant="h3" color="secondary">2 months</Typography>
              <Typography variant="subtitle1">From concept to MVP launch</Typography>
            </MetricBox>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body1" paragraph>
            The new PDF bill generation service drastically improved the efficiency of the billing process. Users could generate bills 100% faster than with the previous system, which had been slow and cumbersome. The design quality of the bills also saw a marked improvement, as React and CSS gave us far greater creative control. Feedback from bill recipients was overwhelmingly positive, with many expressing increased satisfaction and a better understanding of their bills due to the improved presentation of the data.
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
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
          One of the key lessons from this project was the importance of modular design and component reusability. By focusing on building flexible components that could be reused across different templates, we were able to reduce development time and create a system that could scale as new templates were needed.
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1" paragraph>
            This project also reinforced the value of performance optimization, as the switch from PHP to React—combined with AWS Lambda for backend processing—resulted in a much faster and more responsive system.
          </Typography>
          <Typography variant="body1" paragraph>
            In hindsight, I would have placed even more emphasis on user testing and feedback throughout the development process. While the final product was well-received, early input from end users could have helped us refine the presentation of data even further.
          </Typography>
        </Collapse>
      </Paper>
    </Box>
  );
};
