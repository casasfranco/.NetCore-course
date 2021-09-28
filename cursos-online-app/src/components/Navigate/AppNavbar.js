import { AppBar } from "@material-ui/core";
import React from "react";
import BarSession from "./Bar/BarSession";

const AppNavbar = () => {
  return (
    <AppBar position="static">
      <BarSession />
    </AppBar>
  );
};

export default AppNavbar;
