import { Routes, Route, Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Link, Container, Box } from '@mui/material'
import { Home } from './pages/Home'
import { IvyEnergy } from './pages/IvyEnergy'
import { Pathfinder } from './pages/Pathfinder'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link component={RouterLink} to="/" color="inherit">Home</Link>
            <Link component={RouterLink} to="/ivy" color="inherit">Ivy Energy</Link>
            <Link component={RouterLink} to="/pathfinding" color="inherit">Pathfinding</Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Box my={4} sx={{ width: '100%', padding: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ivy" element={<IvyEnergy />} />
          <Route path="/pathfinding" element={<Pathfinder />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
