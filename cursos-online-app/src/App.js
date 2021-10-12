import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Grid, Snackbar } from "@material-ui/core";
import Login from "./components/Security/Login";
import ProfileUser from "./components/Security/ProfileUser";
import Register from "./components/Security/Register";
import AppNavbar from "./components/Navigate/AppNavbar";
import { theme } from "./theme";
import { useStateValue } from "./context/store";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./actions/UserAction";

const App = () => {
  const [{ userSession, openSnackbar }, dispatch] = useStateValue();

  const [initApp, setInitApp] = useState(false);

  useEffect(() => {
    if (!initApp) {
      getCurrentUser(dispatch)
        .then((response) => {
          setInitApp(true);
        })
        .catch((error) => {
          setInitApp(true);
        });
    }
  }, [initApp]);

  return initApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.message : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMessage: {
              open: false,
              message: "",
            },
          })
        }
      ></Snackbar>
      <Router>
        <ThemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route exact path="/auth/login" component={Login}></Route>
              <Route exact path="/auth/register" component={Register}></Route>
              <Route exact path="/auth/profile" component={ProfileUser}></Route>
              <Route path="/" component={Login}></Route>
            </Switch>
          </Grid>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
