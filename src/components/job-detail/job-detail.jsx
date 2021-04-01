/*
User personal center routing component
 */

import React from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Modal,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {getJobDetail,updateJob,deleteJob} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class JobDetail extends React.Component {  
      state = {
        jobTitle:'',
        jobType:'',
        content:'',
        company:'',
        position:'',    
        expire:''          
      }  
    componentWillMount () {
      const jobId= this.props.match.params.jobid;
      this.props.getJobDetail(jobId)
      
    }
    
    // Process input data changes: update the corresponding state
  handleChange = (name, val) => {
    const {jobTitle,jobType,content,company,position,expire}=this.props.jobDetail;
      this.setState({jobTitle:jobTitle,jobType:jobType,content:content,company:company,position:position,expire:expire},function(){
        console.log(this.state.jobType);
        this.setState({
          [name]: val  // The attribute name is not name, but the value of the name variable
        })
      })
    // update status
    
  }
  
  updateJob=()=>{
    console.log(this.state)
    this.props.updateJob(this.state);
    this.props.history.replace('/')
  }

  deleteJob=()=>{
    Modal.alert('Delete Job', 'Are you sure to this job?', [
      {text: 'Cancle'},
      {
        text: 'Yes',
        onPress: ()=> {
          this.props.deleteJob();
          this.props.history.replace('/')
        }
      }
    ])    
  }

  toMain = () => {
    this.props.history.replace('/')
  }

  render() {

    const {jobTitle,jobType,content,company,position,expire}=this.props.jobDetail;       
        return (
        <div>      
           <NavBar>Job Detail</NavBar>         
            <WingBlank>
            <List>                                   
                <WhiteSpace style={{marginTop: 40+ 'px'}}/>
                <InputItem placeholder={jobTitle} onChange={jobTitle=>this.handleChange('jobTitle',jobTitle)}>Job Title:</InputItem>
                <WhiteSpace/>
                <InputItem placeholder={jobType} onChange={val => {this.handleChange('jobType', val)}}>Job Type:</InputItem>
                <WhiteSpace/>
                <InputItem placeholder={content} onChange={val => {this.handleChange('content', val)}}>Content:</InputItem>
                <WhiteSpace/>          
                <WhiteSpace/>
                <InputItem placeholder={company} onChange={val => {this.handleChange('company', val)}}>Company:</InputItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem placeholder={position} onChange={val => {this.handleChange('position', val)}}>Position:</InputItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem placeholder={expire} onChange={val => {this.handleChange('expire', val)}}>Expire:</InputItem>
                <WhiteSpace/>                                                                              
            </List>
            <WhiteSpace/>   
            <Button type="primary" inline size="small" style={{ margin: '0px 6px 0px 6px',color:'black' }} onClick={this.updateJob}>Update Job</Button>  
            <Button type="primary" inline size="small" style={{ margin: '0px 6px 0px 6px',backgroundColor:'#f0e68c',color:'black' }} onClick={this.createJob}>View Candidates</Button>            
            <Button type="warning" inline size="small" style={{ margin: '0px 6px 0px 6px',color:'black' }} onClick={this.deleteJob}>Delete Job</Button> 
                     
            <WhiteSpace/> 
            <Button type='primary' onClick={this.toMain}>Back to Main</Button>
            </WingBlank>
        </div>
        )
    }
}


export default connect(
    state=>({jobDetail:state.jobDetail}),
    {getJobDetail,updateJob,deleteJob}
) (JobDetail)