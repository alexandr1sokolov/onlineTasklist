export const onLoginChange = value => ({
  type: "LOGIN_CHANGE",
  data: value
});

export const loginChangeClear = () => ({
  type: "LOGIN_CLEAR",
  data: ""
});
