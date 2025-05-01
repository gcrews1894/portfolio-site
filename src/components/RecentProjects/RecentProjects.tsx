import React from 'react';
import { Box, Typography, Paper, Grid, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { ScrollAnimation } from '../UtilityComponents/ScrollAnimation';

interface Project {
  title: string;
  techStack: string[];
  reactPackages: string[];
  overview: string;
  impact: string;
  challenges: string;
  caseStudyLink: string;
}

const projects: Project[] = [
  {
    title: "Internal Admin Platform Modernization",
    techStack: ["React", "TypeScript", "SQL", "Docker", "Agile"],
    reactPackages: ["React Router", "React Query", "React Hook Form", "React Testing Library", 'DataGrid Pro'],
    overview: "Transformed a legacy PHP-based admin platform into a scalable React and TypeScript application, improving the company's internal workflow for managing billing and onboarding.",
    impact: "Increased operational efficiency by 85% and decreased data retrieval times by 30% through optimized database queries.",
    challenges: "Focused on maintaining a smooth user experience during the transition by adopting an iterative development process and Docker for consistent environments.",
    caseStudyLink: "/case-studies/?project=0",
  },
  {
    title: "Resident Portal Redesign",
    techStack: ["React", "Next.js", "TypeScript", "Material-UI", "Node.js", "Express", "PostgreSQL"],
    reactPackages: ["React Hook Form", 'React Router', "React Testing Library", 'DataGrid Pro'],
    overview: "Led the development of a new resident portal from the ground up, focusing on creating a user-friendly and responsive experience. This portal serves as a primary interface for residents, allowing them to access billing, account information, and support services.",
    impact: "Increased user engagement by 50% and reduced customer complaints about accessibility by 40%.",
    challenges: "Optimized complex state management using React hooks and Redux for seamless data flow, and collaborated closely with backend engineers to ensure a smooth API integration.",
    caseStudyLink: "/case-studies/?project=1",
  },
  {
    title: "Dynamic PDF Bill Generation Service",
    techStack: ["React", "Node.js", "Express", "SQL", "AWS"],
    reactPackages: ["React-PDF", "React Context API"],
    overview: "Developed a dynamic PDF generation service that automates the creation of personalized billing statements, significantly reducing manual workload for the billing team.",
    impact: "Reduced manual intervention by 80% and cut billing errors by 30%, improving overall billing accuracy.",
    challenges: "Overcame challenges of integrating with existing billing systems by implementing an efficient data synchronization strategy using AWS services.",
    caseStudyLink: "/case-studies/?project=2",
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <ScrollAnimation animation="fadeIn" delay={index * 0.2} duration={0.6}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(145deg, #0A1929 0%, #132F4C 50%, rgba(33, 150, 243, 0.1) 100%)',
        transition: 'all 0.3s ease-in-out',
        transform: 'translateY(0)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
          '& .project-title': {
            color: '#64B5F6',
          },
          '& .project-chip': {
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            transform: 'scale(1.05)',
          },
          '& .project-button': {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            transform: 'scale(1.02)',
          },
        },
      }}
    >
      <Typography 
        variant="h5" 
        component="h3" 
        gutterBottom 
        color="#2196F3"
        className="project-title"
        sx={{
          transition: 'color 0.3s ease-in-out',
        }}
      >
        {project.title}
      </Typography>
      <Box mb={2}>
        {project.techStack.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            className="project-chip"
            sx={{ 
              mr: 1, 
              mb: 1, 
              backgroundColor: 'rgba(33, 150, 243, 0.1)', 
              color: '#2196F3',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
              },
            }}
          />
        ))}
      </Box>
      <Box mb={2}>
        {project.reactPackages.map((pkg) => (
          <Chip
            key={pkg}
            label={pkg}
            size="small"
            className="project-chip"
            sx={{ 
              mr: 1, 
              mb: 1, 
              backgroundColor: 'rgba(97,218,251,0.1)', 
              color: '#61DAFB',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(97,218,251,0.2)',
              },
            }}
          />
        ))}
      </Box>
      <Typography variant="body2" paragraph>
        <strong>Overview:</strong> {project.overview}
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>Impact:</strong> {project.impact}
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>Challenges & Solutions:</strong> {project.challenges}
      </Typography>
      <Box mt="auto">
        <Button
          component={Link}
          to={project.caseStudyLink}
          variant="outlined"
          color="primary"
          className="project-button"
          sx={{ 
            mt: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              transform: 'scale(1.02)',
            },
          }}
        >
          Read the Full Case Study
        </Button>
      </Box>
    </Paper>
  </ScrollAnimation>
);

export const RecentProjects: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <ScrollAnimation animation="slideUp" duration={0.6}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="#2196F3">
          Recent Projects
        </Typography>
      </ScrollAnimation>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} lg={4} key={project.title}>
            <ProjectCard project={project} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
