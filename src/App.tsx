import React, { useState, useEffect } from 'react';
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Box, Drawer, IconButton, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Home } from './pages/Home';
import { CaseStudies } from './pages/CaseStudies';
import { Visualizers } from './pages/Visualizers';

const StyledAppBar = styled(AppBar)(() => ({
  background: 'linear-gradient(145deg, #1f1f1f 0%, #121212 50%, #292929 100%)',
}));

const StyledLink = styled(RouterLink)(() => ({
  color: '#FFFFFF',
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '4px',
  transition: 'background-color 0.3s, color 0.3s',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: 'rgba(255,107,0,0.1)',
    color: '#FF6B00',
  },
}));

const DrawerLink = styled(RouterLink)(() => ({
  color: '#FFFFFF',
  textDecoration: 'none',
  width: '100%',
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: 'rgba(255,107,0,0.1)',
    color: '#FF6B00',
  },
}));

const ComingSoon = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Typography variant="h4" color="textSecondary">
      Coming Soon...
    </Typography>
  </Box>
);

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  useEffect(() => {
    setIsMobileView(isMobile);
  }, [isMobile]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Case Studies', path: '/case-studies' },
    { text: 'Visualizers', path: '/visualizers' },
    { text: 'Feedback Wall', path: '/wall' }
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text}>
            <DrawerLink to={item.path}>
              <ListItemText primary={item.text} />
            </DrawerLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const currentPageTitle = navItems.find(item => item.path === location.pathname)?.text || 'Page Not Found';

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          {isMobileView ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {currentPageTitle}
              </Typography>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', width: '100%' }}>
              {navItems.map((item) => (
                <StyledLink key={item.text} to={item.path}>
                  {item.text}
                </StyledLink>
              ))}
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>

      <Box my={4} sx={{ width: '100%', padding: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/visualizers" element={<Visualizers />} />
          <Route path="/wall" element={<ComingSoon />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
