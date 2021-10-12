import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStateValue } from "../../context/store";
function SecureRoute({ component: Component, ...rest }) {
  const [{ userSession }, dispatch] = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) =>
        userSession ? (
          userSession.auth === true ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to="/auth/login" />
          )
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default SecureRoute;
