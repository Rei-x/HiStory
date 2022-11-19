import type { ComponentStyleConfig } from "@chakra-ui/react";

const inputFontSize = "18px";

const Input: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {
    sm: { width: "300px" },
  },
  variants: {
    red: {
      field: {
        border: "2px",
        focusBorderColor: "#b00909",
        color: "#b00909",
        fontWeight: "800",
      },
    },
  },
  defaultProps: { size: "sm", variant: "red" },
};

export { Input };
