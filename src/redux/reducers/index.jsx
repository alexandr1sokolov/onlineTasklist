import {combineReducers} from 'redux';
import currentTasks from './tasksReducer';
import addTaskIsActive from './addTaskIsActiveReducer';
import loginChange from './loginChangeReducer';
import enterModal from './loginReducer';
import isLoggedIn from './isLoggedInReducer';
import passChange from './passChangeReducer';
import editMode from './editModeToggleReducer';
import taskChange from './taskChangeReducer';

const rootReducer = combineReducers({currentTasks, addTaskIsActive,loginChange, enterModal, isLoggedIn, passChange, editMode, taskChange});
export default rootReducer;
