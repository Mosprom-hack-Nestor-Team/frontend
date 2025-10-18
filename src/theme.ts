import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    cobaltBlue: Palette['primary'];
    gentianBlue: Palette['primary'];
    ironGray: Palette['primary'];
    windowGray: Palette['primary'];
    lightBlue: Palette['primary'];
    warmRed: Palette['primary'];
    lightGreen: Palette['primary'];
  }
  interface PaletteOptions {
    cobaltBlue?: PaletteOptions['primary'];
    gentianBlue?: PaletteOptions['primary'];
    ironGray?: PaletteOptions['primary'];
    windowGray?: PaletteOptions['primary'];
    lightBlue?: PaletteOptions['primary'];
    warmRed?: PaletteOptions['primary'];
    lightGreen?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  palette: {
    primary: {
      main: '#002664', // CMYK 100/85/5/35 RGB 0/38/100 - Cobalt Blue
      light: '#0f4dbc', // PANTONE 2728 C RGB 15/77/188 - Gentian Blue
      dark: '#001a42',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#87c8dc', // CMYK 45/5/10/0 RGB 135/200/220 - Light Blue
      light: '#a5d6e5',
      dark: '#5a9cb5',
      contrastText: '#000000',
    },
    cobaltBlue: {
      main: '#002664',
      light: '#334d83',
      dark: '#001a42',
      contrastText: '#ffffff',
    },
    gentianBlue: {
      main: '#0f4dbc',
      light: '#4d76d0',
      dark: '#0a3583',
      contrastText: '#ffffff',
    },
    ironGray: {
      main: '#5a5a5a', // RGB 90/90/90
      light: '#7a7a7a',
      dark: '#3a3a3a',
      contrastText: '#ffffff',
    },
    windowGray: {
      main: '#969696', // RGB 150/150/150
      light: '#b4b4b4',
      dark: '#787878',
      contrastText: '#000000',
    },
    lightBlue: {
      main: '#87c8dc',
      light: '#a5d6e5',
      dark: '#5a9cb5',
      contrastText: '#000000',
    },
    warmRed: {
      main: '#eb735a', // RGB 235/115/90
      light: '#f0917e',
      dark: '#d45a3f',
      contrastText: '#000000',
    },
    lightGreen: {
      main: '#00afa5', // RGB 0/175/165
      light: '#33bfb7',
      dark: '#007a73',
      contrastText: '#000000',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': {
            fontFamily: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'normal',
          },
        },
        body: {
          fontFamily: '"Arial", "Helvetica", sans-serif',
          backgroundColor: '#f8fafc',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
          boxShadow: '0 2px 8px rgba(0, 38, 100, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none' as const,
          fontWeight: 500,
          fontFamily: '"Arial", "Helvetica", sans-serif',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 38, 100, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 38, 100, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(90, 90, 90, 0.1)',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#000000',
          borderBottom: '2px solid #002664',
        },
      },
    },
  },
});