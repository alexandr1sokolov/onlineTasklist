export default function currentTasks (state = [], action) {
  switch (action.type) {
    case "CURRENT_TASKS":
      return action.payload;

    case "aa_TASKS":
      return action.payload;

    default:
      return state
  }
}
