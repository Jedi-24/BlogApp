export const LoginStart = (userCreds) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const updStart = (userCreds) => ({
  type: "UPD_START",
});

export const updSuccess = (user) => ({
  type: "UPD_SUCCESS",
  payload: user,
});

export const updFailure = () => ({
  type: "UPD_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});
