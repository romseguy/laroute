import React from "react";
import { Button as RebassButton } from "rebass";

const Button = ({ variant = "primary", ...rebassProps }) => {
  return <RebassButton variant={variant} {...rebassProps} />;
};

export default Button;
