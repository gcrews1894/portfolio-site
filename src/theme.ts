import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B00', // A vibrant orange
    },
    secondary: {
      main: '#FFB300', // A lighter orange
    },
    background: {
      default: '#121212', // A dark gray, almost black
      paper: '#1E1E1E', // A slightly lighter gray for cards and surfaces
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A', // Slightly lighter than the background
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;

