import React from "react";
import {connect} from "react-redux";
import axios from "axios/index";

import Modal from "../Modal/Modal";

import { onLoginChange, loginChangeClear } from "../../redux/actions/loginChangeAction";
import { passChangeHandler } from "../../redux/actions/passChangeAction";
import { isLoggedIn } from "../../redux/actions/isLoggedInAction";
import { hideEnterModal } from "../../redux/actions/loginActions";
import { passChangeClear } from "../../redux/actions/passChangeAction";


const Login = props => {

  const modalCloseStateClear = () => {
    props.closeModalFunc();
    props.loginChangeClearFunc();
    props.passChangeClearFunc();
  };

  const onLoginChange = ({target}) => {
    props.onLoginChangeFunc(target.value);
  };

  const onPasswordChange = ({target}) => {
    props.passChangeHandlerFunc(target.value);
  };

  const post = (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append('username', props.loginChange);
    form.append('password', props.passChange);

    axios
      .post("https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=AlexanderTest", form)
      .then(result => result.status === 200 && result.data)
      .then(result => localStorage.setItem("token", result.message.token))
      .then(() => props.isLoggedInFunc())
      .then(()=>modalCloseStateClear())
      .catch(err => {
        console.log(err);
      });
  };

  const onKeyDown = event => {
    if (event.key === "Login") {
      event.preventDefault();
      event.stopPropagation();
      post();
    }
  };

 const  hideEnter =()=>{
    props.hideEnterModalFunc();
    modalCloseStateClear()
  };

  return (
    <Modal>
      <button onClick={hideEnter}>back</button>
      <h2 >Login</h2>
      <form >
        <div >
          <input
            type="login"
            onChange={onLoginChange}
            placeholder="Login"
          />
        </div>
        <div >
          <input
            type="password"
            onChange={onPasswordChange}
            placeholder="Password"
            onKeyDown={onKeyDown}
          />
        </div>
        <button onClick={post}>
          Enter
        </button>
      </form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    loginChange: state.loginChange,
    passChange: state.passChange,
    messageText: state.messageText,
    isLoggedIn: state.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginChangeFunc: (value)=> dispatch(onLoginChange(value)),
    passChangeHandlerFunc: (value)=> dispatch(passChangeHandler(value)),
    isLoggedInFunc: ()=> dispatch(isLoggedIn()),
    closeModalFunc: ()=> dispatch(hideEnterModal()),
    passChangeClearFunc: ()=> dispatch(passChangeClear()),
    hideEnterModalFunc: ()=> dispatch(hideEnterModal()),
    loginChangeClearFunc:()=> dispatch(loginChangeClear())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
