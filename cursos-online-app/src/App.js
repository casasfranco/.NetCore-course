import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Login from "./components/security/Login";
import ProfileUser from "./components/security/ProfileUser";
import Register from "./components/security/Register";
import AppNavbar from "./components/Navigate/AppNavbar";
import { theme } from "./theme";
import { useStateValue } from "./context/store";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./actions/UserAction";

const App = () => {
  const [{ userSession }, dispatch] = useStateValue();
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
  }, []);

  return (
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
  );
};

export default App;
