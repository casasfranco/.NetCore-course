import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import style from "../Tool/Style";
import { getCurrentUser, updateCurrentUser } from "../../actions/UserAction";
import { useStateValue } from "../../context/store";
import reactLogo from "../../logo.svg";
import { v4 as uuidv4 } from "uuid";
import ImageUploader from "react-images-upload";
import { getDataImage } from "../../actions/ImagenAction";

const ProfileUser = () => {
  const [{ userSession }, dispatch] = useStateValue();

  const [user, setUser] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    imagenPerfil: null,
    photoUrl: "",
  });

  useEffect(() => {
    setUser(userSession.user);
    setUser((prevUser) => ({
      ...prevUser,
      photoUrl: userSession.user.imagenPerfil,
    }));
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
    updateCurrentUser(user, dispatch).then((response) => {
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

  const photoKey = uuidv4();

  const uploadPhoto = (images) => {
    const photo = images[0];
    const photoUrl = URL.createObjectURL(photo);

    getDataImage(photo).then((res) => {
      setUser((previusUser) => ({
        ...previusUser,
        imagenPerfil: res, //json que proviene del action getImage {data: .., nombre: ...., extension: ...}
        photoUrl, //Archivo en formato URL
      }));
    });
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Avatar style={style.avatar} src={user.photoUrl || reactLogo} />
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>

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
            <Grid item xs={12} md={12}>
              <ImageUploader
                withIcon={false}
                key={photoKey}
                singleImage={true}
                buttonText="Choose your profile image"
                onChange={uploadPhoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
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
      </div>
    </Container>
  );
};

export default ProfileUser;
