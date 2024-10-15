import { Routes, Route, Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Home } from './pages/Home'
import { CaseStudies } from './pages/CaseStudies'
import { Visualizers } from './pages/Visualizers'

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

function App() {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/case-studies">Case Studies</StyledLink>
            <StyledLink to="/visualizers">Visualizers</StyledLink>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Box my={4} sx={{ width: '100%', padding: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/visualizers" element={<Visualizers />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
