import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../styles/vars.css";

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.8)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});

export const tagIndicator = style({
  position: "absolute",
  width: "24px",
  height: "24px",
  borderRadius: vars.radii.round,
  backgroundColor: vars.colors.white,
  border: `2px solid ${vars.colors.primary}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 2,
  transition: `transform ${vars.transitions.fast}`,
  ":hover": {
    transform: "scale(1.3)",
  },
  "::after": {
    content: '""',
    position: "absolute",
    width: "8px",
    height: "8px",
    borderRadius: vars.radii.round,
    backgroundColor: vars.colors.primary,
  },
  "@media": {
    "(max-width: 639px)": {
      width: "20px",
      height: "20px",
      ":hover": {
        transform: "scale(1.2)",
      },
      "::after": {
        width: "6px",
        height: "6px",
      },
    },
  },
});

export const tagInfo = style({
  position: "absolute",
  backgroundColor: vars.colors.white,
  borderRadius: vars.radii.md,
  padding: vars.space.md,
  boxShadow: vars.shadows.lg,
  zIndex: 3,
  minWidth: "150px",
  animation: `${fadeIn} ${vars.transitions.normal}`,
  "@media": {
    "(max-width: 639px)": {
      minWidth: "120px",
      padding: vars.space.sm,
    },
  },
});

export const tagName = style({
  fontSize: vars.fontSizes.md,
  fontWeight: "bold",
  marginBottom: vars.space.xs,
});

export const tagPrice = style({
  fontSize: vars.fontSizes.lg,
  color: vars.colors.primary,
  fontWeight: "bold",
});

export const tooltipContainer = style({
  padding: vars.space.sm,
  backgroundColor: vars.colors.white,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: vars.radii.md,
});
