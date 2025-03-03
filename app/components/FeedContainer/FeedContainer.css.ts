import { style, keyframes } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

export const container = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
  }),
  {
    gap: "16px",
    padding: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
]);

export const mainVideo = style([
  sprinkles({
    width: "100%",
  }),
  {
    marginBottom: "24px",
    borderRadius: "8px",
    overflow: "hidden",
  },
]);

export const masonryGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gridGap: "16px",
  "@media": {
    "(min-width: 640px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "(min-width: 768px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "(min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const masonryItem = style({
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "0",
  transition: "transform 0.3s ease",
  // ':hover': {
  //   transform: 'translateY(-4px)',
  // }
});

export const loading = style([
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
  },
]);

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loadingSpinner = style({
  width: "40px",
  height: "40px",
  border: "4px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "50%",
  borderTopColor: "#e60023",
  animation: `${spin} 1s linear infinite`,
  marginBottom: "16px",
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
