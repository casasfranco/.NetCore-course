import HttpClient from "../services/HttpClient";
import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

const createImage = (data) => {
  let profilePhoto = data.imagenPerfil;
  const image =
    "data:image/" + profilePhoto.extension + ";base64," + profilePhoto.data;

  return image;
};

export const registerUser = (user) => {
  return new Promise((resolve, eject) => {
    axiosInstance.post("/Usuario/registrar", user).then((response) => {
      resolve(response);
    });
  });
};

export const getCurrentUser = (dispatch) => {
  return new Promise((resolve, eject) => {
    HttpClient.get("/Usuario")
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          response.data.imagenPerfil = createImage(response.data);
        }

        dispatch({
          type: "LOGIN",
          user: response.data,
          auth: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error);
      });
  });
};

export const updateCurrentUser = (user, dispatch) => {
  return new Promise((resolve, eject) => {
    HttpClient.put("/Usuario", user)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          response.data.imagenPerfil = createImage(response.data);
        }

        dispatch({
          type: "LOGIN",
          user: response.data,
          auth: true,
        });

        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const loginUser = (user, dispatch) => {
  return new Promise((resolve, eject) => {
    axiosInstance
      .post("/Usuario/login", user)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          response.data.imagenPerfil = createImage(response.data);
        }

        dispatch({
          type: "LOGIN",
          user: response.data,
          auth: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
