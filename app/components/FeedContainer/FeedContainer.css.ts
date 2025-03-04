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
    "@media": {
      "(max-width: 767px)": {
        padding: "0px",
      },
    },
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
    "@media": {
      "(max-width: 767px)": {
        marginBottom: "0px",
      },
    },
  },
]);

export const masonryGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gridGap: "16px",
  gridAutoRows: "5px",
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
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "0",
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

export const videoItemMobile = style({
  "@media": {
    "(max-width: 639px)": {
      gridColumn: "1 / -1",
    },
  },
});

export const navigationButton = style({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: 'none',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  zIndex: 10,

  ':hover': {
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    transform: 'translateY(-50%) scale(1.1)',
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'translateY(-50%) scale(1)',
  },

  '@media': {
    '(max-width: 768px)': {
      position: 'fixed',
      top: 'auto',
      bottom: '20px',
      width: '40px',
      height: '40px',
      transform: 'none',

      ':hover': {
        transform: 'none',
      }
    }
  }
});

export const prevButton = style([
  navigationButton,
  {
    left: '20px',

    '@media': {
      '(max-width: 768px)': {
        left: '20px',
        bottom: '20px',
      }
    }
  }
]);

export const nextButton = style([
  navigationButton,
  {
    right: '20px',

    '@media': {
      '(max-width: 768px)': {
        right: '20px',
        bottom: '20px',
      }
    }
  }
]);

export const buttonIcon = style({
  width: '24px',
  height: '24px',
  fill: '#333',

  '@media': {
    '(max-width: 768px)': {
      width: '20px',
      height: '20px',
    }
  }
});
