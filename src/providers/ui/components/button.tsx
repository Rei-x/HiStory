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
        color: "#b00909",
        background: "white",
        border: "2px",
        borderColor: "#b00909",
      },
      _active: { background: "white", fontSize: "17px" },
    },
  },

  defaultProps: { size: "sm", variant: "red" },
};

export { Button };
