export const initialState = {
  user: {
    nombreCompleto: "",
    email: "",
    username: "",
    imagen: "",
  },
  auth: false,
};

const userSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        auth: action.auth,
      };
    case "LOGOUT":
      return {
        ...state,
        user: action.newUser,
        auth: action.auth,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.newUser,
        auth: action.auth,
      };
    default:
      return state;
  }
};

export default userSessionReducer;
