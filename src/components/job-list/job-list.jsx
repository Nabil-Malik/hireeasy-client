/*
UI component that displays the list of jobs
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card,Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import {getJobDetail} from '../../redux/actions'

const Header = Card.Header
const Body = Card.Body

class JobList extends Component {
  static propTypes = {
    jobList: PropTypes.array.isRequired
  }  

  render () {
    const {jobList} = this.props

    return (
      <WingBlank style={{marginBottom:50, marginTop:50}}>
        <QueueAnim type='scale'>
          {
            jobList.map(job => (
              <div key={job._id}>
                <WhiteSpace/>
                <Card onClick={()=>{ this.props.history.push(`/jobDetail/${job._id}`)}}>  
                  <Header                   
                    extra={job.jobTitle}
                  />
                  <Body>
                  <div>position: {job.position}</div>
                  {job.company ? <div>company: {job.company}</div> : null}                  
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(JobList)

