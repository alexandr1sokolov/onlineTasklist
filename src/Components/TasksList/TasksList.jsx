import React from 'react';
import { connect } from 'react-redux';

import Task from "../Task/Task";

const TasksList =(props)=> {
  return(
      <ul>
        {props.currentTasks.map((el =>
          <Task text={el.text}
                username={el.username}
                id={el.id}
                key={el.id}
                status={el.status}
                email={el.email}
          />))}
      </ul>
    )
};

function mapStateToProps (state) {
  return {
    currentTasks: state.currentTasks
  }
}

export default connect(mapStateToProps,null) (TasksList);



