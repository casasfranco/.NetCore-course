import React, { useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UserImageTemp from "../../../logo.svg";
import { useStateValue } from "../../../context/store";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { withRouter } from "react-router";

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
  list: {
    width: 250,
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    color: "#212121",
  },
}));

const BarSession = (props) => {
  const classes = useStyles();
  const [{ userSession }, dispatch] = useStateValue();
  const [openLeftMenu, setOpenLeftMenu] = useState(false);
  const [openRightMenu, setOpenRightMenu] = useState(false);

  const closeLeftMenu = () => {
    setOpenLeftMenu(false);
  };

  const handleOpenLeftMenu = () => {
    setOpenLeftMenu(true);
  };

  const closeRightMenu = () => {
    setOpenRightMenu(false);
  };

  const handleOpenRightMenu = () => {
    setOpenRightMenu(true);
  };

  const logoutApp = () => {
    window.localStorage.removeItem("token_security");
    dispatch({
      type: 'LOGOUT',
      newUser: null,
      auth: false
    })
    props.history.push("/auth/login");
  };

  return (
    <React.Fragment>
      <Drawer open={openLeftMenu} onClose={closeLeftMenu} anchor="left">
        <div
          className={classes.list}
          onKeyDown={closeLeftMenu}
          onClick={closeLeftMenu}
        >
          <LeftMenu classes={classes} />
        </div>
      </Drawer>
      <Drawer open={openRightMenu} onClose={closeRightMenu} anchor="right">
        <div role="button" onClick={closeRightMenu} onKeyDown={closeRightMenu}>
          <RightMenu
            classes={classes}
            logout={logoutApp}
            user={userSession?.user}
          />
        </div>
      </Drawer>
      <Toolbar>
        <IconButton color="inherit" onClick={handleOpenLeftMenu}>
          <i className="material-icons">menu</i>
        </IconButton>
        <Typography variant="h6">Cursos Online</Typography>
        <div className={classes.grow}></div>
        <div className={classes.sectionDesktop}>
          <Button color="inherit" onClick={logoutApp}>Exit</Button>
          <Button color="inherit">{userSession?.user?.nombreCompleto}</Button>
          <Avatar
            src={userSession?.user?.imagenPerfil || UserImageTemp}
          ></Avatar>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton color="inherit" onClick={handleOpenRightMenu}>
            <i className="material-icons">more_vert</i>
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
};

export default withRouter(BarSession);
