export default function loginChange(state = "", action) {
  switch (action.type) {
    case "LOGIN_CHANGE":
      return action.data;

    case "LOGIN_CLEAR":
      return action.data;

    default:
      return state;
  }
}
