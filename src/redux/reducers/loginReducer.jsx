export default function enterModal(state = false, action) {
  switch (action.type) {
    case "SHOW_MODAL":
      return true;
    case "HIDE-MODAL":
      return false;
    default:
      return state;
  }
}
