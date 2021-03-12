/*
A module containing certain functions required by the interface
The return value of this function: promise
 */

import ajax from './ajax'

// Registration interface
export const reqRegister = (user) => ajax('/register', user, 'POST')
// Login interface
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')
// Update user interface
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// Get user interface
export const reqUser = () => ajax('/user')

//Get user list interface
export const reqUserList = (type) => ajax('/userlist', {type})

// Get the current user's chat message list
export const reqChatMsgList = () => ajax('/msglist')

// Modify the specified message as read
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')