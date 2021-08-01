import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const breakpoints: { [key in Breakpoints]: string } = {
  xs: "0",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const bodyFontSizeInPixels = 16;

export const breakpointsInPixels = Object.entries(breakpoints).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [key]: parseFloat(val) * bodyFontSizeInPixels,
  }),
  {}
);

const defaultTheme = extendTheme({
  breakpoints,
  styles: {
    global: {
      "html, body": {
        fontSize: `${bodyFontSizeInPixels}px`,
        height: "100%",
      },
      "#root": {
        height: "100%",
      },
    },
  },
  colors: {
    overlayPrimary: "rgb(240, 242, 249)",
  },
});

const ThemeProvider: React.FC = ({ children }) => {
  return <ChakraProvider theme={defaultTheme}>{children}</ChakraProvider>;
};

export default ThemeProvider;
