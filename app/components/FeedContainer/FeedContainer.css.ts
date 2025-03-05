import { style, keyframes } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { fadeInScale, pageTransition } from "../../styles/animations.css";

export const container = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
  }),
  {
    gap: "8px",
    padding: "0",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media": {
      "(max-width: 767px)": {
        padding: "0",
      },
    },
    animation: `${pageTransition} 0.5s ease-out`,
  },
]);

export const mainVideo = style([
  sprinkles({
    width: "100%",
  }),
  {
    marginBottom: "8px",
    borderRadius: "0",
    overflow: "hidden",
    "@media": {
      "(max-width: 767px)": {
        marginBottom: "0px",
      },
    },
  },
]);

export const masonryGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "8px",
  gridAutoRows: "5px",
  animation: `${fadeInScale} 0.5s ease-out`,
  "@media": {
    "(max-width: 639px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: "8px",
    },
    "(min-width: 640px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "(min-width: 640px) and (max-width: 767px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "(min-width: 768px) and (max-width: 1023px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "(min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const mobileFullWidthItem = style({
  "@media": {
    "(max-width: 767px)": {
      gridColumn: "1 / -1",
    },
  },
});

export const masonryItem = style({
  position: "relative",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  ":hover": {
    transform: "translateY(-4px)",
  },
  borderRadius: "0",
  overflow: "hidden",
  marginBottom: "0",
});

export const loading = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.9)",
  zIndex: 1000,
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loadingSpinner = style({
  width: "60px",
  height: "60px",
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
});

export const error = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "md",
  }),
  {
    minHeight: "200px",
    textAlign: "center",
    color: "#e60023",
  },
]);

export const errorIcon = style({
  fontSize: "32px",
  marginBottom: "16px",
});

export const retryButton = style([
  sprinkles({
    padding: "sm",
    backgroundColor: "primary",
    color: "white",
    borderRadius: "md",
  }),
  {
    border: "none",
    cursor: "pointer",
    marginTop: "16px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: "#d50c22",
    },
  },
]);

export const pagination = style([
  sprinkles({
    display: "flex",
    justifyContent: "center",
  }),
  {
    gap: "16px",
    marginTop: "32px",
    marginBottom: "16px",
  },
]);

export const paginationButton = style([
  sprinkles({
    color: "white",
  }),
  {
    padding: "8px",
    backgroundColor: "blue",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#0056b3",
    },
    ":disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
]);

export const videoItemMobile = style({
  "@media": {
    "(max-width: 639px)": {
      gridColumn: "1 / -1",
    },
  },
});
export const pullToRefreshIndicator = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
  pointerEvents: "none",
  zIndex: 100,
});

export const pullSpinner = style({
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  color: "#3498db",
  transition: "transform 0.2s ease",
});

export const prevButton = style({
  position: "fixed",
  left: "20px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 10,
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "@media": {
    "(max-width: 767px)": {
      width: "40px",
      height: "40px",
      left: "10px",
      bottom: "20px",
      top: "auto",
      transform: "none",
    },
  },
});

export const nextButton = style({
  position: "fixed",
  right: "20px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 10,
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "@media": {
    "(max-width: 767px)": {
      width: "40px",
      height: "40px",
      right: "10px",
      bottom: "20px",
      top: "auto",
      transform: "none",
    },
  },
});

export const buttonIcon = style({
  width: "24px",
  height: "24px",
  fill: "#333",
  "@media": {
    "(max-width: 767px)": {
      width: "20px",
      height: "20px",
    },
  },
});
