import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, IconButton, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SiNestjs, SiMongodb, SiGrafana, SiInfluxdb, SiK6 } from 'react-icons/si';

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
  backgroundColor: useTheme().palette.background.paper,
  borderRadius: useTheme().shape.borderRadius,
  boxShadow: useTheme().shadows[1],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.2)',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
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

const ExpandMore = styled(IconButton)(() => ({
  transform: 'rotate(0deg)',
  marginLeft: 'auto',
  transition: 'transform 0.3s',
  '&.expanded': {
    transform: 'rotate(180deg)',
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

export const Pfizer: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box my={4}>
      <Typography variant="h3" component="h2" gutterBottom>
        Pfizer Case Study: Performance Testing & System Scalability
      </Typography>
      <Box mb={2}>
        <StyledChip icon={<CodeIcon />} label="Architecture Analyst" color="primary" sx={{ mr: 1 }} />
        <StyledChip icon={<StorageIcon />} label="Data Scaling" color="secondary" sx={{ mr: 1 }} />
        <StyledChip icon={<SpeedIcon />} label="Performance Testing" color="success" />
      </Box>

      <StyledPaper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(33, 150, 243, 0.05)', borderRadius: 4, }}>
        <Typography variant="h4" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          As part of my role as an Architecture Analyst at Pfizer, I led performance testing initiatives to evaluate system scalability and optimize response times under increasing data loads. The primary objective was to measure response times as we scaled from 100,000 to 1 million records in MongoDB (or DocumentDB) while ensuring the system remained performant under expected workloads.
        </Typography>
        <Typography variant="body1" paragraph>
          Using k6 for load generation, InfluxDB for metrics storage, and Grafana for visualization, we conducted multiple performance tests targeting key API endpoints to identify potential bottlenecks and provide recommendations for optimization.
        </Typography>
      </StyledPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4, }}>
            <Typography variant="h5" gutterBottom>My Role</Typography>
            <Typography variant="body1" paragraph>
              I was responsible for:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Designing and executing performance tests to simulate real-world data scaling." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Developing Nest.js endpoints to facilitate comprehensive testing and measure system stability." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Analyzing performance metrics using InfluxDB and Grafana, identifying trends in response times." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Authoring detailed documentation to summarize findings and provide optimization strategies." />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4, }}>
            <Typography variant="h5" gutterBottom>Challenges</Typography>
            <Typography variant="h6" gutterBottom>Ensuring Scalability at High Data Volumes</Typography>
            <Typography variant="body1" paragraph>
              The application needed to scale efficiently from 100,000 to 1 million records while maintaining low latency. Tests needed to determine whether performance degradation would occur as data volumes increased.
            </Typography>
            <Typography variant="h6" gutterBottom>Simulating Realistic Load Scenarios</Typography>
            <Typography variant="body1" paragraph>
              The system is stateless, meaning sequential request performance was a strong indicator of its ability to scale. The goal was to predict system behavior under real-world scaling conditions, ensuring that additional containers and a load balancer would support future growth.
            </Typography>
            <Typography variant="h6" gutterBottom>Monitoring Performance Trends Over Time</Typography>
            <Typography variant="body1" paragraph>
              We needed consistent, repeatable testing to measure how response times changed as the dataset grew. Key insights would guide database optimization strategies.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, my: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>Solutions & Testing Approach</Typography>
        <Typography variant="body1" paragraph>
          We developed and executed a series of load tests targeting three key API endpoints:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Fake User Creation Test</Typography>
              <Typography variant="body2" paragraph>
                Inserts large volumes of fake users sequentially.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Scalability goal:</strong> Up to 500,000 users.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Results:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • 95th percentile response time: ~32ms up to 500k users.
              </Typography>
              <Typography variant="body2" paragraph>
                • Negligible impact on performance (~1% increase) as user volume grew.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Attack Log Insertion Test</Typography>
              <Typography variant="body2" paragraph>
                Adds an attack log for each user to measure database write performance.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Scalability goal:</strong> Up to 500,000 attack logs.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Results:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • 95th percentile response time: ~40ms at 100k logs, ~121ms at 500k logs.
              </Typography>
              <Typography variant="body2" paragraph>
                • Slight linear increase in response time, but within acceptable limits.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Attack Log & Fetch Test</Typography>
              <Typography variant="body2" paragraph>
                Inserts an attack log and retrieves all logs for a user.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Scalability goal:</strong> Up to 100,000 users, 200,000 total logs.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Results:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • First log fetch: ~52ms at 100k users and logs.
              </Typography>
              <Typography variant="body2" paragraph>
                • Second log fetch: ~48ms at 100k users and 200k logs.
              </Typography>
              <Typography variant="body2" paragraph>
                • Minimal difference between first and second fetch, indicating stable read performance.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box mb={2} mt={3}>
          <TechIcon><SiNestjs color="#E0234E" /><Typography sx={{ ml: .5 }}>Nest.js</Typography></TechIcon>
          <TechIcon><SiMongodb color="#47A248" /><Typography sx={{ ml: .5 }}>MongoDB</Typography></TechIcon>
          <TechIcon><SiGrafana color="#F46800" /><Typography sx={{ ml: .5 }}>Grafana</Typography></TechIcon>
          <TechIcon><SiInfluxdb color="#22ADF6" /><Typography sx={{ ml: .5 }}>InfluxDB</Typography></TechIcon>
          <TechIcon><SiK6 color="#7D669E" /><Typography sx={{ ml: .5 }}>k6</Typography></TechIcon>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(33, 150, 243, 0.05)', borderRadius: 4, }}>
        <Typography variant="h4" gutterBottom>Impact & Business Value</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <MetricBox>
              <Typography variant="h3" color="primary">1M+</Typography>
              <Typography variant="subtitle1">Records tested</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricBox>
              <Typography variant="h3" color="secondary">32ms</Typography>
              <Typography variant="subtitle1">95th percentile response time</Typography>
            </MetricBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricBox>
              <Typography variant="h3" color="success">1%</Typography>
              <Typography variant="subtitle1">Performance impact with scaling</Typography>
            </MetricBox>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body1" paragraph>
            • Verified that the system could scale efficiently to handle increasing data loads.
          </Typography>
          <Typography variant="body1" paragraph>
            • Provided key insights into latency trends, ensuring informed architectural decisions.
          </Typography>
          <Typography variant="body1" paragraph>
            • Optimized response times through proactive database indexing and monitoring strategies.
          </Typography>
          <Typography variant="body1" paragraph>
            • Improved technical documentation, creating a foundation for future performance testing initiatives.
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 4, }}>
        <Typography variant="h4" gutterBottom>
          Key Takeaways & Recommendations
          <ExpandMore
            className={expanded ? 'expanded' : ''}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Typography>
        <Typography variant="body1" paragraph>
          Based on our test results, I provided several optimization recommendations:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              <FeatureItem
                title="Database Indexing"
                description="Ensuring critical fields (e.g., user IDs) are properly indexed to improve lookup speed. Helps maintain fast retrieval times as the dataset scales."
              />
              <FeatureItem
                title="Batch Operations for Large Inserts"
                description="If insert volumes increase beyond tested levels, consider batching operations instead of inserting records individually. Could further improve throughput and reduce strain on the database."
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <FeatureItem
                title="Ongoing Monitoring & CI/CD Integration"
                description="Integrate performance tests into CI/CD pipelines or schedule them periodically. Allows continuous tracking of system performance and early detection of degradation."
              />
              <FeatureItem
                title="Higher Concurrency Testing"
                description="If future scaling requires high concurrency, running multi-virtual user (multi-VU) tests in k6 would be beneficial. This would simulate real-world user load more accurately."
              />
            </List>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1" paragraph>
            The performance testing initiative at Pfizer demonstrated the importance of proactive scalability planning. By identifying potential bottlenecks before they impact production, we were able to implement optimizations that ensured the system could handle future growth without degradation.
          </Typography>
          <Typography variant="body1" paragraph>
            The combination of k6 for load generation, InfluxDB for metrics storage, and Grafana for visualization provided a comprehensive view of system performance under various conditions. This approach allowed us to make data-driven decisions about architectural improvements and resource allocation.
          </Typography>
        </Collapse>
      </Paper>
    </Box>
  );
}; 