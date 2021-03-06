import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAppContext } from "../../libs/contextLib";
import { useHistory, useLocation } from "react-router-dom";
import LoaderButton from "../LoaderButton";
import { onError } from "../../libs/errorLib";
import { useFormFields } from "../../libs/hooksLib";
import { withStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Ride Share
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const {
    userHasAuthenticated,
    setCurrentSession,
    setIsAdmin,
    setCurrentUser
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      let session = await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      console.log(session);
      setCurrentSession(session);
      setCurrentUser(session);
      setIsLoading(false);
      if (
        session.signInUserSession.idToken.payload.hasOwnProperty(
          "cognito:groups"
        ) &&
        session.signInUserSession.idToken.payload["cognito:groups"][0] ===
          "admin"
      ) {
        setIsAdmin(true);
      }
      console.log(`State => ${props.state}`);
      history.replace(from, { ...props.state, userId: session.username });
      if (props.handleClose) {
        props.handleClose();
      }
      history.go();
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={fields.email}
                onChange={handleFieldChange}
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={fields.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <LoaderButton
            type="submit"
            fullWidth
            className={classes.submit}
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
          <Grid container>
            <Grid item xs={12}>
              <Link
                variant="body2"
                component="button"
                onClick={props.handleClick}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
