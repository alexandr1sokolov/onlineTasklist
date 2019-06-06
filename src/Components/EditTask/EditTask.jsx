import React from 'react';
import { connect } from "react-redux";

import axios from "axios";

import {editModeToggle} from "../../redux/actions/editModeToggleAction";
import {TaskBeforeEdit, taskChangeClear, taskChangeHandler, StatusChangeHandler} from "../../redux/actions/taskChangeAction";
import {currentTasks} from "../../redux/actions/tasksAction";

const EditTask =(props)=> {

  const editModeToggle =()=>{
        props.editModeToggleFunc();
  };

  const onTaskChange =(event)=>{
    event.preventDefault();

    if(event.target.name === 'text'){
      props.taskChangeHandlerFunc(event.target.value);
    }

    if(event.target.name === 'status') {

      if(props.taskChange.status === 0){
        props.StatusChangeHandlerFunc(10)
      }

      if(props.taskChange.status === 10){
        props.StatusChangeHandlerFunc(0)
      }

    }
  };

  const saveTask =()=>{
    const TOKEN = localStorage.getItem("token");

    const form = new FormData();
    form.append('text', props.taskChange.text);
    form.append('status', props.taskChange.status);
    form.append('token', TOKEN);


    axios({ method: 'post',
             url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${props.taskChange.id}?developer=AlexanderTest`,
             data: form},
      )
      .then(()=>
        axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2?developer=AlexanderTest&page=1`)
        .then(res=> props.saveCurrentTasksToStoreFunc(res.data.message.tasks))
        .catch(err=>console.log(err)))
      .then(()=>props.taskChangeClearFunc())
      .then(()=> props.editModeToggleFunc())
      .catch(err=>console.log(err))
  };

    return (
      <li id={props.taskChange.id}>
        <div>Username - {props.taskChange.username}</div>
        <div>Email - {props.taskChange.email}</div>
        <input onChange={onTaskChange} type="text" value={props.taskChange.text} name='text'/>
        <div>
          <div>Status - {props.taskChange.status ? "Done" : "In Progress"}</div>
          <button name='status' onClick={onTaskChange}>{props.taskChange.status ? "Set status to 'In Progress'" : "Set status to 'Done' "}</button>
        </div>
        <button onClick={saveTask}>save</button>
        <button onClick={editModeToggle}>cancel</button>
      </li>
    );

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
    taskChangeClearFunc:()=> dispatch(taskChangeClear()),
    StatusChangeHandlerFunc: (status)=> dispatch(StatusChangeHandler(status)),
    saveCurrentTasksToStoreFunc: (tasks) => dispatch(currentTasks(tasks)),

  };
}

export default connect (MapStateToProps, mapDispatchToProps) (EditTask);
