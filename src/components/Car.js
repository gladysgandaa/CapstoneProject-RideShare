import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  }
}));

const Car = props => {
  const { make, model, rentalCostPerHour, distance } = props;

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={model} src="" />
        </ListItemAvatar>
        <ListItemText
          primary={`${model} ${make}`}
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={useStyles.inline}
              color="textPrimary"
            >
              {model}, From : ${rentalCostPerHour} hourly
              <br></br>
              Miles from you: {distance}
            </Typography>
          }
        />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            href="/booking"
          >
            Book
          </Button>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};
export default Car;
