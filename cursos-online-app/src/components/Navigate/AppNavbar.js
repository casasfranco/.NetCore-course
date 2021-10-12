import { AppBar } from "@material-ui/core";
import React from "react";
import { useStateValue } from "../../context/store";
import BarSession from "./Bar/BarSession";

const AppNavbar = () => {
  const [{ userSession }, dispatch] = useStateValue();

  return userSession ? (
    userSession.auth === true ? (
      <AppBar position="static">
        <BarSession />
      </AppBar>
    ) : null
  ) : null;
};

export default AppNavbar;
