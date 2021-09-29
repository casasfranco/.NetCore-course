import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const LeftMenu = ({ classes }) => {
  return (
    <div className={classes.list}>
      <List>
        <ListItem component={Link} button to="/auth/profile">
          <i className="material-icons">account_box</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Perfil"
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={Link} button to="/course/new">
          <i className="material-icons">add_box</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="New Course"
          />
        </ListItem>
        <ListItem component={Link} button to="/course/list">
          <i className="material-icons">menu_book</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Course List"
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={Link} button to="/instructor/new">
          <i className="material-icons">person_add</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="New Instructor"
          />
        </ListItem>
        <ListItem component={Link} button to="/instructor/list">
          <i className="material-icons">people</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Instructor List"
          />
        </ListItem>
      </List>
    </div>
  );
};

export default LeftMenu;
