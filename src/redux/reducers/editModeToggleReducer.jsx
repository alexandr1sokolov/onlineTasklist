export default function editModeToggle(state = false, action) {
  switch (action.type) {
    case "EDIT_MODE_TOGGLE":
      return state = !state;

    default:
      return state;
  }
}