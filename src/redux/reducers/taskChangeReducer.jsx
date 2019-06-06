const preLoadedState = {
  id:'',
  username: "",
  email: "",
  text: "",
  status: null,
};

export default function taskChange(state = preLoadedState, action) {
  switch (action.type) {
    case "TASK_CHANGE":
      const text = action.payload;
      return {...state, text};

    case "STATUS_CHANGE":
      const status = Number(action.payload);
      return {...state, status};

    case "TASK_BEFORE_EDIT":
      return action.payload;

    case "TASK_CHANGE_CLEAR":
      return preLoadedState;

    default:
      return state;
  }
}
