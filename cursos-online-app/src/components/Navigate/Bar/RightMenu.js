import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import UserImageTemp from "../../../logo.svg";

const RightMenu = ({ classes, logout, user }) => {
  return (
    <div className={classes.list}>
      <List>
        <ListItem component={Link} button>
          <Avatar src={user?.imagenPerfil || UserImageTemp} />
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={user?.nombreCompleto}
          />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Logout"
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default RightMenu;
