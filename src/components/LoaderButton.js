import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  const classes = useStyles();

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      className={`LoaderButton ${className} ${classes.root}`}
      startIcon={isLoading && <CircularProgress size={8} />}
      disabled={disabled || isLoading}
      {...props}
    >
      {props.children}
    </Button>
  );
}
