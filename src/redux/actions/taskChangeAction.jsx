export const taskChangeHandler = text => ({
  type: "TASK_CHANGE",
  payload: text
});

export const StatusChangeHandler = status => ({
  type: "STATUS_CHANGE",
  payload: status
});


export const TaskBeforeEdit = (task) => (
  {
    type: "TASK_BEFORE_EDIT",
    payload: task,
  });

export const taskChangeClear = () => ({
  type: "TASK_CHANGE_CLEAR",
});
