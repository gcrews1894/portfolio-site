import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Typography, Container, Box, Tabs, Tab, Paper, useMediaQuery, MenuItem, Select, FormControl, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdminPortal } from '../components/AdminPortal/AdminPortal';
import { ResidentPortal } from '../components/ResidentPortal/ResidentPortal';
import { BillGen } from '../components/BillGen/BillGen';

const tabOptions = [
  { label: 'Admin Platform', value: 0 },
  { label: 'Resident Portal', value: 1 },
  { label: 'PDF Bill Generation', value: 2 },
];

export const CaseStudies: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    }
  }, [tabParam]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedTab(event.target.value as number);
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
      <Box sx={{ mb: 2 }}>
        {isMobile ? (
          <FormControl fullWidth>
            <Select
              value={selectedTab}
              onChange={handleSelectChange}
            >
              {tabOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {tabOptions.map((option) => (
              <Tab key={option.value} label={option.label} />
            ))}
          </Tabs>
        )}
      </Box>

      {selectedTab === 0 && <AdminPortal />}
      {selectedTab === 1 && <ResidentPortal />}
      {selectedTab === 2 && <BillGen />}
    </Container>
  );
};
