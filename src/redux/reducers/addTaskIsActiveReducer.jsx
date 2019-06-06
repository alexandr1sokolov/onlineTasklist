export default function addTaskIsActive(state = false, action) {
  switch (action.type) {
    case "ADD_TASK_IS_ACTIVE":
      return state = !state;

    default:
      return state;
  }
}
