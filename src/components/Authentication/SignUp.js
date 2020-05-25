import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LoaderButton from "../LoaderButton";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

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
    margin: theme.spacing(3, 0, 2)
  }
}));

const passwordValidator = require("password-validator");

// create a password schema
const schema = new passwordValidator();

schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();

export default function SignUp() {
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  function validateForm() {
    return (
      fields.firstName.length > 0 &&
      fields.lastName.length > 0 &&
      fields.email.length > 0 &&
      validPassword === true &&
      isPasswordConfirmed === true
    );
  }

  function confirmPassword() {
    if (fields.confirmPassword && fields.confirmPassword !== fields.password) {
      return setPasswordConfirmError("Passwords do not match.");
    } else if (
      fields.password.length === 0 ||
      fields.confirmPassword.length === 0
    ) {
      return setPasswordConfirmError("Please enter a password.");
    } else {
      setPasswordConfirmError("");
      return setIsPasswordConfirmed(true);
    }
  }

  function validatePassword() {
    const validationRulesErrors = schema.validate(fields.password, {
      list: true
    });

    if (validationRulesErrors.length > 0) {
      return setPasswordError(
        formatPasswordValidateError(validationRulesErrors)
      );
    } else {
      setPasswordError("");
      return setValidPassword(true);
    }
  }

  function formatPasswordValidateError(errors) {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] === "min") {
        return "Invalid password. Password needs to contain at least 8 characters.";
      } else if (errors[i] === "lowercase") {
        return "Invalid password. Password needs to contain at least 1 lowercase letter.";
      } else if (errors[i] === "uppercase") {
        return "Invalid password. Password needs to contain at least 1 uppercase letter.";
      } else if (errors[i] === "digits") {
        return "Invalid password. Password needs to contain at least 1 number.";
      } else if (errors[i] === "symbols") {
        return "Invalid password. Password needs to contain at least 1 symbol.";
      }
    }
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Validation
          </Typography>
          <br></br>
          <form onSubmit={handleConfirmationSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="confirmationCode"
                  name="confirmationCode"
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.confirmationCode}
                  onChange={handleFieldChange}
                  id="confirmationCode"
                  label="Confirmation Code"
                  autoFocus
                />
                <Typography>
                  Please check your email for validation code
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                isLoading={isLoading}
                disabled={!validateConfirmationForm()}
              >
                Verify
              </LoaderButton>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  function renderForm() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.firstName}
                  onChange={handleFieldChange}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.lastName}
                  onChange={handleFieldChange}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.email}
                  onChange={handleFieldChange}
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordError !== ""}
                  helperText={passwordError}
                  onChange={handleFieldChange}
                  onBlur={validatePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={fields.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  error={passwordConfirmError !== ""}
                  helperText={passwordConfirmError}
                  onBlur={confirmPassword}
                  onChange={handleFieldChange}
                />
              </Grid>
            </Grid>
            <LoaderButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              isLoading={isLoading}
              disabled={!validateForm()}
              // href="/signin"
            >
              Sign Up
            </LoaderButton>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

  return (
    <div>{newUser === null ? renderForm() : renderConfirmationForm()}</div>
  );
}
