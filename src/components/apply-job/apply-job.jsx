import React, {Component} from 'react'
import {Button,Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import {updateUser} from '../../redux/actions'

  class ApplyJob extends Component {
    state={
        appliedJob:''
    }
    save = (user) => {
        this.props.updateUser(user)
      }
    handleOnclick=()=>{
        const jobId=this.props.jobId;
        const arr=this.props.user.appliedJob;
        if(typeof(arr)==='undefined'){
            this.props.user.appliedJob=new Array();
        }
        if(typeof(arr)!=='undefined'&&arr.indexOf(jobId)<=-1){
            console.log( arr.indexOf(jobId))
            console.log( arr.jobId);
            this.props.user.appliedJob.push(jobId);
            console.log( this.props.user.appliedJob)
            this.save(this.props.user)   
            Modal.alert('Apply job', 'Congratulation! You successfully applied this job.', [            
                {
                text: 'OK',
                }
            ])   
        }       
        else{
            console.log( arr.indexOf(jobId));
            console.log(arr[arr.indexOf(jobId)])
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
  export default connect(
    state=>({user:state.user}),
    {updateUser}
  )(ApplyJob)