/*
Job poster main interface routing container component
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class JobPoster extends Component {
  componentDidMount () {
    // get user List
    this.props.getUserList('jobSeeker')
  }
  render () {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(JobPoster)