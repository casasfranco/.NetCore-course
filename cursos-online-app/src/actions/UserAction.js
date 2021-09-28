import HttpClient from "../services/HttpClient";

export const registerUser = (user) => {
  return new Promise((resolve, eject) => {
    HttpClient.post("/Usuario/registrar", user).then((response) => {
      resolve(response);
    });
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, eject) => {
    HttpClient.get("/Usuario").then((response) => {
      resolve(response);
    });
  });
};

export const updateCurrentUser = (user) => {
  return new Promise((resolve, eject) => {
    HttpClient.put("/Usuario", user).then((response) => {
      resolve(response);
    });
  });
};

export const loginUser = (user) => {
  return new Promise((resolve, eject) => {
    HttpClient.post("/Usuario/login", user).then((response) => {
      resolve(response);
    });
  });
};
