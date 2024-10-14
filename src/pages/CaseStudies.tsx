import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Container, Box, Tabs, Tab, Paper } from '@mui/material';
import { AdminPortal } from '../components/AdminPortal/AdminPortal';
import { ResidentPortal } from '../components/ResidentPortal/ResidentPortal';
import { BillGen } from '../components/BillGen/BillGen';

export const CaseStudies: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    }
  }, [tabParam]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Case Studies
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(255,107,0,0.1)' }}>
          <Typography variant="body1" paragraph>
            Welcome to my case studies page! Here, you'll find an in-depth look at some of the key projects I've had the opportunity to lead and contribute to. Each case study highlights the unique challenges faced, the solutions I implemented, and the measurable results achieved.
          </Typography>
          <Typography variant="body1" paragraph>
            From modernizing legacy systems to building user-friendly platforms, I approach every project with a focus on scalability, efficiency, and user experience. These case studies offer a deeper insight into my process, the technologies I've used, and how I collaborate with teams to deliver impactful results.
          </Typography>
          <Typography variant="body1">
            Explore the projects below to see how I've tackled real-world challenges and made meaningful contributions through thoughtful engineering and design.
          </Typography>
        </Paper>
      </Box>
      <Box>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Admin Platform" />
          <Tab label="Resident Portal" />
          <Tab label="PDF Bill Generation" />
        </Tabs>
      </Box>

      {selectedTab === 0 && <AdminPortal />}
      {selectedTab === 1 && <ResidentPortal />}
      {selectedTab === 2 && <BillGen />}
    </Container>
  );
};
