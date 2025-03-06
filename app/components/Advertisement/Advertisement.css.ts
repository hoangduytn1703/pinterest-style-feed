import { style, keyframes } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

export const container = style([
  sprinkles({
    width: "100%",
  }),
  {
    position: "relative",
    borderRadius: "0",
    overflow: "hidden",
  },
]);
export const imageContainer = style({
  position: "relative",
  overflow: "hidden",
  borderRadius: "0",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  ":hover": {
    transform: "scale(1.3)",
  },
});
export const advertisement = style([
  sprinkles({
    width: "100%",
  }),
  {
    cursor: "pointer",
    position: "relative",
    borderRadius: "0",
    overflow: "hidden",
    backgroundColor: "#fff8e1",
    boxShadow: "none",
    "@media": {
      "(max-width: 639px)": {
        borderRadius: "0",
      },
    },
  },
]);

export const adImage = style([
  sprinkles({
    width: "100%",
    height: "auto",
    display: "block",
  }),
  {
    animation: `${fadeIn} 0.5s ease-in-out`,
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "scale(1.3)",
    },
  },
]);

export const adLabel = style([
  sprinkles({
    color: "white",
    fontSize: "xs",
  }),
  {
    top: "8px",
    right: "8px",
    position: "absolute",
    padding: "4px 8px",
    backgroundColor: "rgba(233, 26, 26, 0.8)",
    borderRadius: "4px",
    fontWeight: 500,
    "@media": {
      "(max-width: 639px)": {
        fontSize: "10px",
        padding: "3px 6px",
        top: "4px",
        right: "4px",
      },
    },
  },
]);

export const skeleton = style({
  width: "100%",
  height: "100%",
  minHeight: "200px",
  backgroundColor: "#f0f0f0",
  backgroundImage:
    "linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px)",
  backgroundSize: "200% 100%",
  backgroundPosition: "0 0",
  borderRadius: "0",
  animation: `${shimmer} 1.5s infinite linear`,
});

export const errorContainer = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  {
    padding: "16px",
    backgroundColor: "#f8f8f8",
    color: "#666",
    minHeight: "200px",
    textAlign: "center",
  },
]);
