import React, { Component } from "react";
import {connect} from "react-redux";
import axios from "axios";

import TasksList from "./Components/TasksList/TasksList";
import AddTask from "./Components/AddTask/AddTask";
import Enter from "./Components/Login/Login";
import EditTask from './Components/EditTask/EditTask'

import {currentTasks} from "./redux/actions/tasksAction";
import {addTaskIsActive} from "./redux/actions/addTaskIsActiveToggleAction";
import {showEnterModal, hideEnterModal} from './redux/actions/loginActions';
import {isLoggedIn, isLoggedOut} from './redux/actions/isLoggedInAction'

class App extends Component {

  state ={
    currentPage: 1,
    totalTaskCount: null,
    sort_field: 'username',
  };

  prevPage=()=>{

    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1
    }));

    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2?developer=AlexanderTest&page=${this.state.currentPage -1}&sort_field=${this.state.sort_field}`)
      .then(res=> this.props.saveCurrentTasksToStoreFunc(res.data.message.tasks))
      .catch(err=>console.log(err));

  };

  nextPage=()=>{

    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }));

    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2?developer=AlexanderTest&page=${this.state.currentPage +1}&sort_field=${this.state.sort_field}`)
      .then(res=> this.props.saveCurrentTasksToStoreFunc(res.data.message.tasks))
      .catch(err=>console.log(err));

  };

  componentDidMount() {

    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2?developer=AlexanderTest&&page=${this.state.currentPage}`)
         .then(res=> {
           this.props.saveCurrentTasksToStoreFunc(res.data.message.tasks);
           this.setState({totalTaskCount: res.data.message.total_task_count
           })
         })
         .catch(err=>console.log(err));

    localStorage.getItem('token') && this.props.isLoggedInFunc();

  }

  addTaskIsActiveToggle = ()=>{
    this.props.addTaskIsActiveFunc();
  };

  showEnter =()=>{
    this.props.showEnterModalFunc();
  };

  sort =(event)=>{
    let sortParams = "";

    if(event.target.innerText === "sort by name"){
      sortParams = "username";

      this.setState({
        sort_field: "username"
      });

    }
    if(event.target.innerText === "sort by email"){
      sortParams = "email";

      this.setState({
        sort_field: "email"
      });
    }
    if(event.target.innerText === "sort by status"){
      sortParams = "status";

      this.setState({
        sort_field: "status"
      });
    }

    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2?developer=AlexanderTest&page=${this.state.currentPage}&sort_direction=asc&sort_field=${sortParams}`)
      .then(res=> this.props.saveCurrentTasksToStoreFunc(res.data.message.tasks))
      .catch(err=>console.log(err))

  };

  logOut= ()=>{
    this.props.isLoggedOutFunc();
    localStorage.removeItem("token")
  };

  render() {
    return (
      <div>
       <h2>Tasks</h2>
        {!this.props.enterModal && !this.props.isLoggedIn && <button onClick={this.showEnter}>Log In</button>}
        {this.props.isLoggedIn && <button onClick={this.logOut}>Log Out</button>}
        {this.props.enterModal && <Enter/>}
        {!this.props.enterModal && <button onClick={this.addTaskIsActiveToggle}>{this.props.addTaskIsActive?"Cancel":"Add Task"}</button>}
        {this.props.addTaskIsActive && <AddTask/>}
        {!this.props.addTaskIsActive && !this.props.enterModal&&
        <div>
          <button onClick={this.sort}>sort by name</button>
          <button onClick={this.sort}>sort by email</button>
          <button onClick={this.sort}>sort by status</button>
          {!this.props.editMode && <TasksList/>}
          {this.props.editMode && <EditTask/>}
          {!this.props.editMode &&
          <div>
            <button disabled={this.state.currentPage < 2} onClick={this.prevPage}>Prev Page</button>
            <div>Page - {this.state.currentPage}</div>
            <button disabled={this.state.currentPage === Math.ceil(this.state.totalTaskCount/3)} onClick={this.nextPage}>Next Page</button>
          </div>
          }
        </div>}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    currentTasks: state.currentTasks,
    addTaskIsActive: state.addTaskIsActive,
    enterModal: state.enterModal,
    isLoggedIn: state.isLoggedIn,
    editMode: state.editMode,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    saveCurrentTasksToStoreFunc: (tasks) => dispatch(currentTasks(tasks)),
    addTaskIsActiveFunc: ()=> dispatch(addTaskIsActive()),
    showEnterModalFunc: ()=> dispatch(showEnterModal()),
    hideEnterModalFunc: ()=> dispatch(hideEnterModal()),
    isLoggedOutFunc: ()=>dispatch(isLoggedOut()),
    isLoggedInFunc: () => dispatch(isLoggedIn()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (App);
