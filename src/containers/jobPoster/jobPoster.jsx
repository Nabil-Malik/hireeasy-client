/*
Job poster main interface routing container component
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Cookies from 'js-cookie' 
import {getJobList} from '../../redux/actions'
import JobList from '../../components/job-list/job-list'

class JobPoster extends Component {
  componentDidMount () {
    // get user List
    
    const userid = Cookies.get('userid')   
    this.props.getJobList()
  }
  render () {
    return (      
       <JobList jobList={this.props.jobList}/>
    )
  }
}

export default connect(
  state => ({jobList: state.jobList}),
  {getJobList}
)(JobPoster)