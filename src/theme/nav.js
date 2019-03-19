import { colors } from "./colors";
import { utils } from "./utils";

export default {
  navbar: {
    colors: {
      dark: {
        color: colors.navbarDarkColor,
        borderColor: colors.navbarDarkBorderColor,
        backgroundColor: colors.gray800
      },
      light: {
        color: colors.navbarLightColor,
        borderColor: colors.navbarLightBorderColor,
        backgroundColor: colors.white
      },
      default: {
        color: colors.navbarLightColor,
        borderColor: colors.navbarLightBorderColor,
        backgroundColor: colors.white
      }
    },
    padding: {
      // default: "0.5rem 1rem"
      default: "0"
    }
  },

  nav: {
    colors: {
      default: {
        borderColorTabs: colors.gray300
      }
    },
    padding: {
      collapseNotHiddenARight: "0.5rem",
      collapseNotHiddenALeft: "0.5rem",
      left: "0"
    },
    margin: {
      bottom: "0"
    },
    border: utils.border
  },

  navLink: {
    colors: {
      default: {
        colorDisabled: colors.gray,
        colorDisabledHoverFocus: colors.gray,
        colorTabsActive: colors.gray700,
        colorTabsActiveHoverFocus: colors.gray700,
        colorPillsActive: colors.white,
        colorPillsActiveHoverFocus: colors.white,
        color: colors.blue,
        colorHoverFocus: colors.blueHoverFocusA,
        backgroundColorPillsActive: colors.blue,
        borderColorTabsActive: `${colors.gray200} ${colors.gray200} ${
          colors.white
        }`,
        borderColorTabsHoverFocus: `${colors.gray200} ${colors.gray200} ${
          colors.gray300
        }`,
        borderColorTabsDisabled: "transparent",
        borderColorPillsActive: colors.blue,
        borderColor: "transparent"
      },
      light: {
        colorDisabled: colors.gray,
        colorDisabledHoverFocus: colors.gray,
        colorTabsActive: colors.gray700,
        colorTabsActiveHoverFocus: colors.gray700,
        colorPillsActive: colors.white,
        colorPillsActiveHoverFocus: colors.white,
        color: colors.blue,
        colorHoverFocus: colors.blueHoverFocusA,
        backgroundColorPillsActive: colors.blue,
        borderColorTabsActive: `${colors.gray200} ${colors.gray200} ${
          colors.white
        }`,
        borderColorTabsHoverFocus: `${colors.gray200} ${colors.gray200} ${
          colors.gray300
        }`,
        borderColorTabsDisabled: "transparent",
        borderColorPillsActive: colors.blue,
        borderColor: "transparent"
      },
      dark: {
        colorDisabled: colors.gray,
        colorDisabledHoverFocus: colors.gray,
        colorTabsActive: colors.gray700,
        colorTabsActiveHoverFocus: colors.gray700,
        colorPillsActive: colors.white,
        colorPillsActiveHoverFocus: colors.white,
        color: colors.blue,
        colorHoverFocus: colors.blueHoverFocusA,
        backgroundColorPillsActive: colors.blue,
        borderColorTabsActive: `${colors.gray200} ${colors.gray200} ${
          colors.white
        }`,
        borderColorTabsHoverFocus: `${colors.gray200} ${colors.gray200} ${
          colors.gray300
        }`,
        borderColorTabsDisabled: "transparent",
        borderColorPillsActive: colors.blue,
        borderColor: "transparent"
      }
    },
    padding: {
      default: "0"
      //default: "0.5rem"
    },
    borderRadius: utils.borderRadius,
    border: utils.border
  },

  navbarLink: {
    colors: {
      dark: {
        colorDisabled: colors.navbarDarkColorDisabled,
        colorDisabledHoverFocus: colors.navbarDarkColorDisabled,
        colorActive: colors.navbarDarkColorActive,
        colorActiveHoverFocus: colors.navbarDarkColorActive,
        color: colors.navbarDarkColor,
        colorHoverFocus: colors.navbarDarkColorHoverFocus
      },
      light: {
        colorDisabled: colors.navbarLightColorDisabled,
        colorDisabledHoverFocus: colors.navbarLightColorDisabled,
        colorActive: colors.navbarLightColorActive,
        colorActiveHoverFocus: colors.navbarLightColorActive,
        color: colors.navbarLightColor,
        colorHoverFocus: colors.navbarLightColorHoverFocus
      },
      default: {
        colorDisabled: colors.navbarLightColorDisabled,
        colorDisabledHoverFocus: colors.navbarLightColorDisabled,
        colorActive: colors.navbarLightColorActive,
        colorActiveHoverFocus: colors.navbarLightColorActive,
        color: colors.navbarLightColor,
        colorHoverFocus: colors.navbarLightColorHoverFocus
      }
    },
    padding: {
      brandTop: "0",
      brandBottom: "0"
      // brandTop: "0.3125rem",
      // brandBottom: "0.3125rem"
    },
    fontSize: utils.fontSize
  }
};
