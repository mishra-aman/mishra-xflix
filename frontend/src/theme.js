import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export let theme = createTheme({

    palette : {
      type: 'dark',
      primary: {
        main: "#ffffff"
      },
      secondary: {
        main: "#4CA3FC"
      },
      tertiary: {
        main: "#545c56"
      }
    },
    typography: {
      button: {
        textTransform: "none"
      }
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "#FFFF",
            ":hover": {
              backgroundColor: "#484848",
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            color: "#484848",
            backgroundColor: "#2f2f2f",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          list: {
            color: "rgba(255, 255, 255, 0.87)",
            backgroundColor: "rgba(255, 255, 255, 0.87)",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: "#383838",
            color: "#FFFF",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "rgba(255, 255, 255, 0.6)"
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "rgba(255, 255, 255, 0.6)",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "rgba(255, 255, 255, 0.6)",
          },
        },
      },
    },
    typography2: {
      fontFamily: "'Roboto', sans-serif",
      color: "white",
    },
  });