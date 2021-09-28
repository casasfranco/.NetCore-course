import userSessionReducer from "./userSessionReducer";
import openSnackbarReducer from "./openSnackbarReducer";

export const mainReducer = ({ userSession, openSnackbar }, action) => {
  return {
    userSession: userSessionReducer(userSession, action),
    openSnackbar: openSnackbarReducer(openSnackbar, action),
  };
};
