import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import EditCar from "../Admin/EditCar";

class AdminCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      removed: false
    };
  }

  editForm = carId => {
    console.log("carId from function", carId);
    console.log("props", this.props);
    if (this.state.editing === false) {
      this.setState({ editing: true });
    } else {
      this.setState({ editing: false });
    }
  };

  //delete k_s5tkTP091bmLqVY81Ppw
  removeVehicle = carId => {
    axios
      .delete(
        "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=" +
          carId
      )
      .then(res => {
        this.setState({ removed: true });
        window.location.reload();
      });
  };

  render() {
    const { carId, make, model, rentalCostPerHour } = this.props;
    const useStyles = makeStyles(theme => ({
      inline: {
        display: "inline"
      }
    }));
    return (
      <div>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={model} src="" />
          </ListItemAvatar>
          <ListItemText
            primary={`${make} ${model}`}
            secondary={
              <Typography
                component="span"
                variant="body2"
                className={useStyles.inline}
                color="textPrimary"
              >
                ${rentalCostPerHour} hourly <br></br> Available:
                <br></br>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.removeVehicle(carId)}
                  >
                    Remove
                  </Button>
                  &nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.editForm(carId)}
                  >
                    Edit
                  </Button>
                </div>
                {this.state.removed && (
                  <div style={{ color: "red" }}>REMOVED</div>
                )}
              </Typography>
            }
          />
          <div>
            {this.state.editing && (
              <EditCar
                carId={this.props.carId}
                car={this.props}
                action="EDITING"
              ></EditCar>
            )}
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    );
  }
}
export default AdminCar;
