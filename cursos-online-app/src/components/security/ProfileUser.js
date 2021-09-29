import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import style from "../Tool/Style";
import { getCurrentUser, updateCurrentUser } from "../../actions/UserAction";
import { useStateValue } from "../../context/store";

const ProfileUser = () => {
  const [{ userSession }, dispatch] = useStateValue();

  const [user, setUser] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  useEffect(() => {
    getCurrentUser(dispatch).then((response) => {
      setUser(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((oldUser) => ({
      ...oldUser,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateCurrentUser(user).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMessage: {
            open: true,
            message: "Se guardaron exitosamente los cambios en Perfil Usuario",
          },
        });
        window.localStorage.setItem("token_security", response.data.token);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMessage: {
            open: true,
            message:
              "Errores al intentar guardar en: " +
              Object.keys(response.data.errors),
          },
        });
      }
    });
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="nombreCompleto"
              variant="outlined"
              fullWidth
              label="Enter your full name"
              value={user.nombreCompleto}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="username"
              variant="outlined"
              fullWidth
              label="Enter your username"
              value={user.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              variant="outlined"
              fullWidth
              label="Enter your email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              label="Enter your password"
              value={user.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              label="Confirm your password"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={style.submit}
              onClick={handleOnSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProfileUser;
