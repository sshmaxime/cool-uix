import { calibreFont, wideFont } from "@/assets/index";
import { createTheme, Theme } from "@mui/material";
import { createBreakpoints, useTheme as useThemeMUI } from "@mui/system";

declare module "@mui/material/styles" {
  interface Theme extends MyTheme {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends MyTheme {}
}

const breakpoints = createBreakpoints({});

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

const DefaultTheming: DeepPartial<Theme> = {
  palette: {
    background: {
      default: "black",
    },
  },
};

type MyTheme = typeof themeOpts;

const themeBasics = {
  colors: {
    primary: "#F8F8F8",
    secondary: "#E9E9E9",
    tertiary: "#F3F3F3",
    light: "rgba(0,0,0,0.2)",
    black: "#09090c",
  },

  fontFamily: {
    primary: calibreFont.style.fontFamily,
    secondary: wideFont.style.fontFamily,
    tertiary: "futura",
    wide: "phonk",
  },
};

const themeOpts = {
  ...themeBasics,

  header: {
    height: "45px",
  },

  container: {
    backgroundColor: themeBasics.colors.secondary,
    padding: "25px",
    borderRadius: "50px",
  },

  components: {
    MuiGrid: {
      styleOverrides: {
        container: {},
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "futura",
          fontSize: "11.5px",
          letterSpacing: "0.15px",
          lineHeight: "14.5px",
          fontWeight: 400,
        },
      },
    },
  },

  cards: {
    primary: {
      boxShadow: "5px 5px 5px #bebebe, -1px -1px 1px #fff",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "25px",
    },
    secondary: {
      boxShadow: "5px 5px 5px #bebebe, -1px -1px 1px #fff",
      padding: "20px",
      backgroundColor: "#f9f9fb",
      borderRadius: "25px",
    },
  },

  myTypography: {
    huge: {
      fontFamily: themeBasics.fontFamily.primary,
      fontColor: themeBasics.colors.black,
      fontWeight: 600,
      fontSize: "3.5em",
      [breakpoints.down("lg")]: {
        fontSize: "2.5em",
      },
      [breakpoints.only("xs")]: {
        fontSize: "2em",
      },
    },
    big: {
      fontFamily: themeBasics.fontFamily.primary,
      fontColor: themeBasics.colors.black,
      fontWeight: 600,
      fontSize: "2.75em",
      [breakpoints.down("lg")]: {
        fontSize: "2.25em",
      },
      [breakpoints.only("xs")]: {
        fontSize: "1.9em",
      },
    },
    normalBig: {
      fontFamily: themeBasics.fontFamily.primary,
      fontColor: themeBasics.colors.black,
      fontWeight: 600,
      fontSize: "1.5em",
      [breakpoints.down("md")]: {
        fontSize: "1.25em",
      },
      [breakpoints.only("xs")]: {
        fontSize: "1.1em",
      },
    },
    normalBold: {
      fontFamily: themeBasics.fontFamily.primary,
      fontColor: themeBasics.colors.black,
      fontWeight: 800,
      fontSize: "1.1em",
    },
    normalTitle: {
      fontFamily: themeBasics.fontFamily.primary,
      fontColor: themeBasics.colors.black,
      fontWeight: 900,
      fontSize: "1.1em",
      [breakpoints.up("xl")]: {
        fontSize: "1.25em",
      },
      [breakpoints.only("xs")]: {},
    },
    normal: {
      fontFamily: themeBasics.fontFamily.primary,
      fontColor: themeBasics.colors.black,
      fontWeight: 500,
      fontSize: "1em",
      [breakpoints.up("xl")]: {},
      [breakpoints.only("xs")]: {},
    },
    navbarLink: {
      fontFamily: themeBasics.fontFamily.primary,
      border: `1px solid ${themeBasics.colors.tertiary}`,
      color: themeBasics.colors.black,
      fontWeight: 600,
      fontSize: "0.9em",
      borderRadius: "10px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },

  button: {
    normal: {
      fontFamily: themeBasics.fontFamily.primary,
      backgroundColor: themeBasics.colors.black,
      color: themeBasics.colors.primary,
      fontWeight: 600,
      fontSize: "0.9em",
      height: "35px",
      minWidth: "150px",
      borderRadius: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "1px 1px 5px #bebebe, -1px -1px 1px #fff",
    },
  },

  titles: {
    primary: {
      fontFamily: themeBasics.fontFamily.secondary,
      fontSize: "17.5px",
      fontWeight: 700,
      letterSpacing: "-1.15px",
    },
    secondary: {
      fontFamily: themeBasics.fontFamily.secondary,
      fontSize: "12.5px",
      letterSpacing: "-0.5px",
      fontWeight: 600,
    },
  },

  myBreakpoints: {
    app: {
      paddingLeft: "25px",
      paddingRight: "25px",
    },
  },
};

const theme = createTheme({
  ...themeOpts,
  palette: { background: { default: themeOpts.colors.secondary } },
});

export default theme;
