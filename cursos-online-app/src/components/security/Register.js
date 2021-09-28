import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import style from "../Tool/Style";
import { registerUser } from "../../actions/UserAction";

const Register = () => {
  const [user, setUser] = useState({
    NombreCompleto: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((oldUser) => ({
      ...oldUser,
      [name]: value,
    }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    registerUser(user).then((response) => {
      window.localStorage.setItem("token_security", response.data.token);
    });
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Sing Up
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="NombreCompleto"
                variant="outlined"
                fullWidth
                label="Enter your full name"
                value={user.NombreCompleto}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Username"
                variant="outlined"
                fullWidth
                label="Enter your username"
                value={user.Username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Email"
                variant="outlined"
                fullWidth
                label="Enter your email"
                value={user.Email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Password"
                type="password"
                variant="outlined"
                fullWidth
                label="Enter your password"
                value={user.Password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="ConfirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                label="Confirm your password"
                value={user.ConfirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justifycontent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={style.submit}
                onClick={handleRegisterUser}
              >
                Send
              </Button>
            </Grid>
          </Grid>
          <Grid container justifycontent="center"></Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
