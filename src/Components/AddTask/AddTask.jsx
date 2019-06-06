import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import {addTaskIsActive} from "../../redux/actions/addTaskIsActiveToggleAction";


class AddTask extends Component {

  state={
    username:'',
    email:'',
    text:'',
  };

  onSubmit = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append('text', this.state.text);
    form.append('email', this.state.email);
    form.append('username', this.state.username);

    console.log("form", form);


    axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=AlexanderTest`, form)
      .then(status=> console.log(status))
      .catch(err=>console.log(err));

    this.props.addTaskIsActiveFunc();
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <input type="text"
               name="username"
               required
               placeholder="Enter Username"
               onChange={this.onInputChange}
               value={this.state.username}/>
        <input type="email"
               pattern="[\w-]+@([\w-]+\.)+[a-z]{2,6}$"
               title='Email address must contain "@" and "." and from 2 to 6 symbols after dot'
               name="email"
               required
               placeholder="Enter e-mail"
               onChange={this.onInputChange}
               value={this.state.email}/>
        <input type="text"
               name="text"
               required
               placeholder="Enter task"
               onChange={this.onInputChange}
               value={this.state.text}/>
        <button type='submit'>Submit</button>
        </form>
      </div>
    )}
}

function mapStateToProps (state) {
  return {
    editField: state.editField,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addTaskIsActiveFunc: ()=> dispatch(addTaskIsActive())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);


