import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Typography, Container, Box, Tabs, Tab, Paper, useMediaQuery, MenuItem, Select, FormControl, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdminPortal } from '../components/AdminPortal/AdminPortal';
import { ResidentPortal } from '../components/ResidentPortal/ResidentPortal';
import { BillGen } from '../components/BillGen/BillGen';
import { Pfizer } from '../components/Pfizer/Pfizer';
import { NeuropathyApp } from '../components/NeuropathyApp/NeuropathyApp';

// Company tabs
const companyTabs = [
  { label: 'Ivy Energy', value: 0 },
  { label: 'Pfizer', value: 1 },
];

// Project tabs for each company
const projectTabs = {
  0: [ // Ivy Energy projects
    { label: 'Admin Platform', value: 0 },
    { label: 'Resident Portal', value: 1 },
    { label: 'PDF Bill Generation', value: 2 },
  ],
  1: [ // Pfizer projects
    { label: 'Performance Testing', value: 0 },
    { label: 'Neuropathy App', value: 1 },
  ],
};

export const CaseStudies: React.FC = () => {
  const [searchParams] = useSearchParams();
  const companyParam = searchParams.get('company');
  const projectParam = searchParams.get('project');
  const [selectedCompany, setSelectedCompany] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (companyParam) {
      const companyValue = parseInt(companyParam, 10);
      setSelectedCompany(companyValue);
      
      if (projectParam) {
        setSelectedProject(parseInt(projectParam, 10));
      } else {
        setSelectedProject(0);
      }
    }
  }, [companyParam, projectParam]);

  const handleCompanyChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedCompany(newValue);
    setSelectedProject(0);
  };

  const handleProjectChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedProject(newValue);
  };

  const handleCompanySelectChange = (event: SelectChangeEvent<number>) => {
    const newCompany = event.target.value as number;
    setSelectedCompany(newCompany);
    setSelectedProject(0);
  };

  const handleProjectSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedProject(event.target.value as number);
  };

  // Helper function to render the appropriate component based on selected company and project
  const renderCaseStudy = () => {
    if (selectedCompany === 0) { // Ivy Energy
      if (selectedProject === 0) return <AdminPortal />;
      if (selectedProject === 1) return <ResidentPortal />;
      if (selectedProject === 2) return <BillGen />;
    } else if (selectedCompany === 1) { // Pfizer
      if (selectedProject === 0) return <Pfizer />;
      if (selectedProject === 1) return <NeuropathyApp />;
    }
    return null;
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

      {/* Company Tabs */}
      <Box sx={{ mb: 2 }}>
        {isMobile ? (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>Company</Typography>
            <Select
              value={selectedCompany}
              onChange={handleCompanySelectChange}
            >
              {companyTabs.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Tabs
            value={selectedCompany}
            onChange={handleCompanyChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            {companyTabs.map((option) => (
              <Tab key={option.value} label={option.label} />
            ))}
          </Tabs>
        )}
      </Box>

      {/* Project Tabs */}
      <Box sx={{ mb: 2 }}>
        {isMobile ? (
          <FormControl fullWidth>
            <Typography variant="h6" gutterBottom>Project</Typography>
            <Select
              value={selectedProject}
              onChange={handleProjectSelectChange}
            >
              {projectTabs[selectedCompany as keyof typeof projectTabs].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Tabs
            value={selectedProject}
            onChange={handleProjectChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {projectTabs[selectedCompany as keyof typeof projectTabs].map((option) => (
              <Tab key={option.value} label={option.label} />
            ))}
          </Tabs>
        )}
      </Box>

      {/* Render the selected case study */}
      {renderCaseStudy()}
    </Container>
  );
};
