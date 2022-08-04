import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 708,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    }
  }
});