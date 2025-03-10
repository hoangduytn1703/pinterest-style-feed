import { style, keyframes } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { smoothHover } from "../../styles/animations.css";

// Add fade-in effect
const fadeIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(10px) scale(0.98)",
    filter: "blur(2px)",
  },
  "50%": {
    opacity: 0.5,
    transform: "translateY(5px) scale(0.99)",
    filter: "blur(1px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0) scale(1)",
    filter: "blur(0)",
  },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

const dropIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(-20px)",
  },
  "60%": {
    transform: "translateY(10px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const container = style([
  sprinkles({
    width: "100%",
  }),
  {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
  },
]);

export const imageCard = style([
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

export const image = style({
  width: "100%",
  height: "auto",
  display: "block",
  objectFit: "cover",
});

// Add skeleton loading
export const skeleton = style({
  width: "100%",
  height: "100%",
  minHeight: "200px",
  backgroundColor: "#f0f0f0",
  backgroundImage:
    "linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px)",
  backgroundSize: "200% 100%",
  backgroundPosition: "0 0",
  borderRadius: "8px",
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

export const productTagsContainer = style([
  sprinkles({}),
  {
    cursor: "pointer",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
    position: "absolute",
  },
]);

export const card = style([
  smoothHover,
  {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
]);
