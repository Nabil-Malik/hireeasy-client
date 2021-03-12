/*
Contains reducer functions: returns a new state based on the old state and the specified action
 */
import {combineReducers} from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  CREATE_JOB,
  RECEIVE_JOB_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from './action-types'

import {getRedirectTo} from '../utils'

const initUser = {
  username: '',
  type: '', 
  msg: '', 
  redirectTo: '' 
}
// The reducer that generates the user state
function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data is user
      const {type, avatar} = action.data
      return {...action.data, redirectTo: getRedirectTo(type, avatar)}
    case ERROR_MSG: // data is msg
      return {...state, msg: action.data}
    case RECEIVE_USER: // data is user
      return action.data
    case RESET_USER: //data is msg
      return {...initUser, msg: action.data}
    default:
      return state
  }
}


const initUserList = []
// The reducer that generates the userlist state
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:  // data is userList
      return action.data
    default:
      return state
  }
}

const initJob = {
    jobTitle:'',
    jobType:'',
    content:'',
    company:'',
    position:'',
    applicantId:[],
    posterId:'',
    postDate:Date.now(),
    expireAfter:'' ,
    msg: '', 
    redirectTo: ''   
}
// The reducer that generates the job state
function createJob(state=initJob, action) {
  switch (action.type) {
    case CREATE_JOB: // data is job      
      return {...action.data, redirectTo:'/jobPoster'}
    case ERROR_MSG: // data is msg
      return {...state, msg: action.data}    
    default:
      return state
  }
}

const initJobList = []
// The reducer that generates the userlist state
function jobList(state=initJobList, action) {
  switch (action.type) {
    case RECEIVE_JOB_LIST:  // data is userList
      return action.data
    default:
      return state
  }
}


const initChat = {
  users: {}, // Object of all user information Attribute name: userid, attribute value is: {username, avatar}
  chatMsgs: [], // Array of all related msgs of the current user
  unReadCount: 0 // Total unread count
}

// The reducer that generated the chat state
function chat(state=initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
      const {users, chatMsgs, userid} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0),0)
      }
    case RECEIVE_MSG: // data: chatMsg
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
      }
    case MSG_READ:
      const {from, to, count} = action.data
      state.chatMsgs.forEach(msg => {
        if(msg.from===from && msg.to===to && !msg.read) {
          msg.read = true
        }
      })
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from===from && msg.to===to && !msg.read) { 
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        unReadCount: state.unReadCount-count
      }
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  createJob,
  jobList,
  chat
})


