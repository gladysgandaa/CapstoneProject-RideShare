import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MapContainer from "./MapContainer";

class SideList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  render() {
    console.log("attempting to acces props: ", this.props.test);
    const useStyles = makeStyles(theme => ({
      root: {
        width: "100%",
        maxWidth: "30%",
        maxHeight: "100%",
        backgroundColor: theme.palette.background.paper
      },
      inline: {
        display: "inline"
      }
    }));

    return (
      <List className={useStyles.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Benz" src="" />
          </ListItemAvatar>
          <ListItemText
            primary="Mercedes-Benz CLA 200"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={useStyles.inline}
                  color="textPrimary"
                >
                  {this.props.test}, From : $25 / daily
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Hyundai" src="" />
          </ListItemAvatar>
          <ListItemText
            primary="Hyundai Accent or Similar"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={useStyles.inline}
                  color="textPrimary"
                >
                  From : $25.28 / daily
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Nissan" src="" />
          </ListItemAvatar>
          <ListItemText
            primary="Nissan Versa or Similar"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={useStyles.inline}
                  color="textPrimary"
                >
                  From : $26.10 / daily
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    );
  }
}

export default SideList;
