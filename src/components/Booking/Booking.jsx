import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/MenuItem";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carid: "",
      date: "",
      duration: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { carid, date, duration } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <Typography variant="h4" gutterBottom>
            Book a Car.
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
            </Grid>
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
            <Grid item xs={12} sm={6}>
              <TextField
                id="select"
                name="carid"
                label="Select Car"
                fullWidth
                value={carid}
                onChange={this.changeHandler}
                select
              >
                <MenuItem value="sedan">Sedan</MenuItem>
                <MenuItem value="suv">SUV</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="datetime-local"
                name="date"
                fullWidth
                type="datetime-local"
                value={date}
                onChange={this.changeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="select"
                name="duration"
                label="Duration (hrs)"
                fullWidth
                value={duration}
                onChange={this.changeHandler}
                select
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button type="submit" onClick={this.submitHandler}>
                Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
