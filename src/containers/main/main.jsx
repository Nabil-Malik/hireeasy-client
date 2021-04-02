/*
Routing component of the main interface
 */

import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  // Objects that can manipulate front-end cookies set()/get()/remove()
import {NavBar} from 'antd-mobile'

import JobPosterInfo from '../jobPoster-info/jobPoster-info'
import JobSeekerInfo from '../jobSeeker-info/jobSeeker-info'
import JobSeeker from '../jobSeeker/jobSeeker'
import JobPoster from '../jobPoster/jobPoster'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import CreateJob from '../createJob/createJob'
import JobDetail from '../../components/job-detail/job-detail'
import CandidateList from '../../components/user-list/candidate-list'
import Chat from '../chat/chat'


import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {

  // Add properties to component objects
  navList = [ // Contains relevant information data of all navigation components
    {
      path: '/jobPoster', //Routing path
      component: JobPoster,
      title: 'Job list',
      icon: 'jobseeker',
      text: 'Job list'
    },
    {
      path: '/jobSeeker', // Routing path
      component: JobSeeker,
      title: 'Job list',
      icon: 'jobposter',
      text: 'Job list'
    },
    {
      path: '/createJob', // Routing path
      component: CreateJob,
      title: 'Create Job',
      icon: 'jobposter',
      text: 'Create Job'
    },
    {
      path: '/message', // Routing path
      component: Message,
      title: 'Message list',
      icon: 'message',
      text: 'Message'
    },
    {
      path: '/personal', // Routing path
      component: Personal,
      title: 'Personal',
      icon: 'personal',
      text: 'Personal'
    }
  ]

  // Realize automatic login:
  componentDidMount () {
    //Login (userid in the cookie), but no login (no _id in the user managed by redux) Send a request to get the corresponding user
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id) {
      // Send asynchronous request, get user     
      this.props.getUser()
    }
  }

  render() {

    // Read the userid in the cookie
    const userid = Cookies.get('userid')
    // If not, automatically redirect to the login interface
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // If have userid, read the user status in redux
    const {user, unReadCount} = this.props
    // If the user does has _id, return null (do not display anything)
    // debugger
    if(!user._id) {
      return null
    } else {
      // If there is _id, display the corresponding interface
      // If the root path is requested, a redirected routing path is calculated according to the user's type and avatar, and automatically redirected
      let path = this.props.location.pathname
      if(path==='/') {
        // Get a redirected routing path
        path = getRedirectTo(user.type, user.avatar)
        return <Redirect to= {path}/>
      }
    }

    const {navList} = this
    const path = this.props.location.pathname // Requested path
    const currentNav = navList.find(nav=> nav.path===path) // Get the current nav, maybe not

    if(currentNav) {
      //Decide which route needs to be hidden
      if(user.type==='jobPoster') {
        // Hide the second of the array
        navList[1].hide = true
      } else {
        // Hide the first of the array
        navList[0].hide = true
        navList[2].hide = true
      }
    }

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
          }
          <Route path='/jobPosterInfo' component={JobPosterInfo}/>
          <Route path='/jobSeekerInfo' component={JobSeekerInfo}/>
          <Route path='/jobDetail/:jobid' component={JobDetail}/>
          <Route path='/viewCandidates' render={()=><CandidateList candidateList={this.props.candidates} />}/>
          <Route path='/chat/:userid' component={Chat}/>

          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount,candidates:state.candidates}),
  {getUser}
)(Main)
