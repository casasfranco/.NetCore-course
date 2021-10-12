import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import style from "../Tool/Style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUser } from "../../actions/UserAction";
import { useStateValue } from "../../context/store";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [{ userSession }, dispatch] = useStateValue();
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((oldUser) => ({
      ...oldUser,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    loginUser(user, dispatch).then((response) => {
      console.log(response);
      if (response.status === 200) {
        window.localStorage.setItem("token_security", response.data.token);
        props.history.push("/");
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMessage: {
            open: true,
            message: "User credentials are incorrect",
          },
        });
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockOutlinedIcon style={style.icon} />
        </Avatar>
        <Typography component="h1" variant="h5">
          User login
        </Typography>
        <form style={style.form}>
          <TextField
            name="Email"
            variant="outlined"
            fullWidth
            label="Enter your email"
            value={user.Email}
            onChange={handleChange}
          />
          <TextField
            name="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            label="Enter your password"
            value={user.Password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            margin="normal"
            variant="contained"
            color="primary"
            size="large"
            style={style.submit}
            onClick={handleOnSubmit}
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Login);
