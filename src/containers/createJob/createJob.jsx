/*
Registered routing components
 */

import React, {Component} from 'react'
import {
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {createJob} from '../../redux/actions'



class CreateJob extends Component {
  state = {
    jobTitle:'',
    jobType:'',
    content:'',
    company:'',
    position:'',    
    expire:''          
  }  

  // Call when click to register
  createJob = () => {    
    this.props.createJob(this.state)
    //console.log(this.state);
    this.props.history.replace('/')   
  }

  // Process input data changes: update the corresponding state
  handleChange = (name, val) => {
    // update status
    this.setState({
      [name]: val  // The attribute name is not name, but the value of the name variable
    })
  }

  toMain = () => {
    this.props.history.replace('/login')
  }

  render() {
       // Read the userid in the cookie
    this.state.posterId=Cookies.get('userid')
   
    // If not, automatically redirect to the login interface
    if(! this.state.posterId) {
      return <Redirect to='/login'/>
    }   
   
    return (
      <div>               
        <WingBlank>
          <List>                                   
            <WhiteSpace style={{marginTop: 80+ 'px'}}/>
            <InputItem placeholder='Job Title' onChange={val => {this.handleChange('jobTitle', val)}}>Job Title:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Job Type' onChange={val => {this.handleChange('jobType', val)}}>Job Type:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Content' onChange={val => {this.handleChange('content', val)}}>Content:</InputItem>
            <WhiteSpace/>          
            <WhiteSpace/>
            <InputItem placeholder='Company' onChange={val => {this.handleChange('company', val)}}>Company:</InputItem>
            <WhiteSpace/>
            <WhiteSpace/>
            <InputItem placeholder='Position' onChange={val => {this.handleChange('position', val)}}>Position:</InputItem>
            <WhiteSpace/>
            <WhiteSpace/>
            <InputItem placeholder='Expire After' onChange={val => {this.handleChange('expire', val)}}>Expire:</InputItem>
            <WhiteSpace/>                        
            <WhiteSpace/>
            <Button type='primary' onClick={this.createJob}>Post Job</Button>
            <WhiteSpace/>           
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({job: state.job}),
  {createJob}
)(CreateJob)