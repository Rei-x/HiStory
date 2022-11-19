import type { ComponentStyleConfig } from "@chakra-ui/react";

const Button: ComponentStyleConfig = {
  baseStyle: {},

  sizes: {
    sm: { width: "300px", height: "40px", fontSize: "18px" },
  },

  variants: {
    red: {
      background: "#b00909",
      color: "white",
      _hover: {
        opacity: 0.8,
      },
      _active: { background: "white" },
    },
    outline: {
      background: "white",
      color: "#b00909",
      border: "2px",
      borderColor: "#b00909",
      _hover: {
        opacity: 0.8,
      },
      _active: { background: "white" },
    },
  },

  defaultProps: { size: "sm", variant: "red" },
};

export { Button };
