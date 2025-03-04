import { style, keyframes } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
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

export const advertisement = style([
  sprinkles({
    width: "100%",
  }),
  {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff8e1", // Màu nền nhẹ để phân biệt quảng cáo
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "4px",
    fontWeight: 500,
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
  borderRadius: "8px",
  animation: "shimmer 1.5s infinite linear",
  "@keyframes": {
    shimmer: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
  },
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
