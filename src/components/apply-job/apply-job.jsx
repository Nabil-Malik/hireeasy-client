import React, {Component} from 'react'
import {Button,Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import {updateUser,updateJob} from '../../redux/actions'
import { withRouter } from 'react-router'

  class ApplyJob extends Component {
    
    save = (user,job) => {
        this.props.updateUser(user)
        this.props.updateJob(job)
      }
    
    
    handleOnclick=()=>{
        const jobId=this.props.jobId;
        const userId=this.props.user._id;
        console.log(userId)

        const arr=this.props.user.appliedJob;
        const arr2=this.props.jobDetail.applicant;

        if(typeof(arr)==='undefined'){
          this.props.user.appliedJob=new Array();
        }
        if(typeof(arr2)==='undefined'){
          this.props.jobDetail.applicant=new Array();
        }
        
        if(typeof(arr)!=='undefined'&&arr.indexOf(jobId)<=-1){

            this.props.user.appliedJob.push(jobId);
            this.props.jobDetail.applicant.push(userId);
            console.log( this.props.user.appliedJob)
            //console.log(this.props.job)  
            Modal.alert('Apply job', 'Congratulation! You successfully applied this job.', [            
                {
                text: 'OK',
                onPress: ()=> {
                  this.save(this.props.user,this.props.jobDetail) 
                  this.props.history.replace('/')
                }
                }
            ])   
        }       
        else{
            Modal.alert('Apply job', 'You have already applied this job.', [            
                {
                  text: 'OK',
                }
              ])     
        }        
                   
    }
    render(){
        return(
        <Button style={{backgroundColor:'#1E90FF',color:'black' }}  onClick={this.handleOnclick}>Apply</Button>
        )
    }    
  }
  export default withRouter( connect(
    state=>({user:state.user,jobDetail:state.jobDetail}),
    {updateUser,updateJob}
  )(ApplyJob))