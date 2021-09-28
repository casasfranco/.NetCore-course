import React from "react";
import {
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UserImage from "../../../logo.svg";
import { useStateValue } from "../../../context/store";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
}));

const BarSession = () => {
  const classes = useStyles();
  const [{ userSession }, dispatch] = useStateValue();

  return (
    <Toolbar>
      <IconButton color="inherit">
        <i className="material-icons">menu</i>
      </IconButton>
      <Typography variant="h6">Cursos Online</Typography>
      <div className={classes.grow}></div>
      <div className={classes.sectionDesktop}>
        <Button color="inherit">Exit</Button>
        <Button color="inherit">
          {userSession?.user?.nombreCompleto}
        </Button>
        <Avatar src={UserImage}></Avatar>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton color="inherit">
          <i className="material-icons">more_vert</i>
        </IconButton>
      </div>
    </Toolbar>
  );
};

export default BarSession;
