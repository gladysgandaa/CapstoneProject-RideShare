import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/MenuItem";
import classes from "@material-ui/core/MenuItem";

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Booking form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Mobile"
              fullWidth
              autoComplete="phone"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email ID"
              fullWidth
              autoComplete="email"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            label="Date of Pick Up"
            fullWidth
            type="date"
            defaultValue="2017-05-24"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="time"
            label="Pick Up Time"
            fullWidth
            type="time"
            defaultValue="07:30"
            inputProps={{
              step: 300 // 5 min
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            label="Date of Drop Off"
            fullWidth
            type="date"
            defaultValue="2017-05-24"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="time"
            label="Drop off Time"
            fullWidth
            type="time"
            defaultValue="07:30"
            inputProps={{
              step: 300 // 5 min
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="select" label="Select Car" fullWidth value="20" select>
            <MenuItem value="sedan">Sedan</MenuItem>
            <MenuItem value="suv">SUV</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullwidth
            endIcon={<Icon>send</Icon>}
          >
            Procced To Payment
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
