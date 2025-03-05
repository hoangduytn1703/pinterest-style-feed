import { keyframes, style } from "@vanilla-extract/css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

export const spinner = style({
  width: "40px",
  height: "40px",
  border: "4px solid rgba(0, 0, 0, 0.1)",
  borderTopColor: "#3498db",
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
});

export const loadingContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  animation: `${pulse} 1.5s ease-in-out infinite`,
});
