import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { SiReact, SiAwslambda, SiCss3 } from 'react-icons/si';

const TechIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  '& svg': {
    width: 20,
    height: 20,
  },
}));

const MetricBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              We addressed the dynamic content issue and reusability concerns by using a combination of the Template Method Pattern and the Children as Props pattern. This approach allowed us to structure components flexibly, ensuring that they could be easily adapted for different templates while maintaining consistency. The use of React and CSS gave us the freedom to design bills that were both functional and aesthetically pleasing, significantly improving the user experience.
            </Typography>
            <Box>
              <TechIcon><SiReact color="#61DAFB" /><Typography sx={{ ml: .5 }}>React</Typography></TechIcon>
              <TechIcon><SiAwslambda color="#FF9900" /><Typography sx={{ ml: .5 }}>AWS Lambda</Typography></TechIcon>
              <TechIcon><SiCss3 color="#1572B6" /><Typography sx={{ ml: .5 }}>CSS</Typography></TechIcon>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Placeholder for screenshot */}
            <Box
              sx={{
                bgcolor: 'grey.200',
                height: 0,
                paddingTop: '56.25%', // 16:9 aspect ratio
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden'
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                Screenshot placeholder: PDF Bill Template
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

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

