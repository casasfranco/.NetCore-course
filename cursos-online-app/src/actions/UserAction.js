import HttpClient from "../services/HttpClient";

export const registerUser = (user) => {
  return new Promise((resolve, eject) => {
    HttpClient.post("/Usuario/registrar", user).then((response) => {
      resolve(response);
    });
  });
};

export const getCurrentUser = (dispatch) => {
  return new Promise((resolve, eject) => {
    HttpClient.get("/Usuario").then((response) => {
      if (response.data && response.data.imagenPerfil) {
        let profilePhoto = response.data.imagenPerfil;
        const image =
          "data:image/" +
          profilePhoto.extension +
          ";base64," +
          profilePhoto.data;

        response.data.imagenPerfil = image;
      }

      dispatch({
        type: "LOGIN",
        user: response.data,
        auth: true,
      });
      resolve(response);
    });
  });
};

export const updateCurrentUser = (user, dispatch) => {
  return new Promise((resolve, eject) => {
    HttpClient.put("/Usuario", user)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let profilePhoto = response.data.imagenPerfil;
          const image =
            "data:image/" +
            profilePhoto.extension +
            ";base64," +
            profilePhoto.data;

          response.data.imagenPerfil = image;
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
    HttpClient.post("/Usuario/login", user).then((response) => {
      dispatch({
        type: "LOGIN",
        user: response.data,
        auth: true,
      });
      resolve(response);
    });
  });
};
