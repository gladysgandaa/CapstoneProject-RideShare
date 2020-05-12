import React from "react";
import Button from "@material-ui/core/Button";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading}
      {props.children}
    </Button>
  );
}
