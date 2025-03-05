import { keyframes, style } from "@vanilla-extract/css";

export const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const slideUp = keyframes({
  "0%": { transform: "translateY(20px)", opacity: 0 },
  "100%": { transform: "translateY(0)", opacity: 1 },
});

export const pulse = keyframes({
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.05)" },
  "100%": { transform: "scale(1)" },
});

export const fadeInAnimation = style({
  animation: `${fadeIn} 0.5s ease-in-out`,
});

export const slideUpAnimation = style({
  animation: `${slideUp} 0.5s ease-out`,
});

export const pulseAnimation = style({
  animation: `${pulse} 2s infinite ease-in-out`,
});

export const fadeInUp = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(20px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

// Fade in with scale
export const fadeInScale = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.95)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});

// Animation cho page transition
export const pageTransition = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateX(20px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateX(0)",
  },
});

// Stagger animation cho grid items
export const staggerFadeIn = (index: number) =>
  style({
    opacity: 0,
    animation: `${fadeInUp} 0.5s ease-out forwards`,
    animationDelay: `${index * 0.1}s`,
  });

// Smooth hover animation
export const smoothHover = style({
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
  },
});
