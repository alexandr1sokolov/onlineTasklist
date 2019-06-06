import React from 'react';
import { connect } from "react-redux";

import {editModeToggle} from '../../redux/actions/editModeToggleAction';
import {taskChangeHandler, TaskBeforeEdit} from '../../redux/actions/taskChangeAction';

const Task = (props) => {

  const editModeToggle =(event)=>{

    event.preventDefault();

    const task = {
        id: props.id,
        username: props.username,
        email: props.email,
        text: props.text,
        status: props.status,
    };

    props.TaskBeforeEditFunc(task);

    props.editModeToggleFunc();
  };

    return (
      !props.editMode &&
          <li id={props.id}>
            <div>Username - {props.username}</div>
            <div>Email - {props.email}</div>
            <div>Task - {props.text}</div>
            <div>Status - {props.status ? "Done": "In Progress"}</div>
            {props.isLoggedIn && <button onClick={editModeToggle}>Edit</button>}
          </li>
    )
};



function MapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    editMode: state.editMode,
    taskChange: state.taskChange,
    taskComplete: state.taskComplete,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    editModeToggleFunc: ()=> dispatch(editModeToggle()),
    taskChangeHandlerFunc: (task)=> dispatch(taskChangeHandler(task)),
    TaskBeforeEditFunc: (task)=> dispatch(TaskBeforeEdit(task)),
  };
}

export default connect (MapStateToProps, mapDispatchToProps)(Task);


