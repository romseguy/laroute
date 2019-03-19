import { button } from "./button";
import { container } from "./container";
import nav from "./nav";

const theme = {
  breakpoints: ["40em", "52em", "64em"],
  screenSize: { sm: "576px", md: "768px", lg: "992px", xl: "1200px" },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  buttons: {
    primary: {
      color: "#fff",
      backgroundColor: "blue",
      cursor: "pointer"
    },
    outline: {
      color: "blue",
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 2px",
      cursor: "pointer"
    }
  },
  fonts: {
    sans: "system-ui, sans-serif",
    mono: "Menlo, monospace"
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)"
  },

  // https://github.com/aichbauer/styled-bootstrap-components
  button,
  container,
  ...nav
};

export default theme;
