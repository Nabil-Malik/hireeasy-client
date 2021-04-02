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
import {getJobDetail,updateJob,deleteJob,getJobPoster} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
import ApplyJob from '../../components/apply-job/apply-job'
import ViewCandidates from '../../components/view-candidates/view-candidates'

let posterId

class JobDetail extends React.Component {  
      state = {
        jobTitle:'',
        jobType:'',
        content:'',
        company:'',
        position:'',    
        expire:''          
      }  
    componentDidMount () {
      const jobId= this.props.match.params.jobid;
      this.props.getJobDetail(jobId);               
    }
   
    getJobPoster=()=>{
      posterId=this.props.jobDetail.posterId;    
      console.log("posterId"+posterId); 
      this.props.getJobPoster(posterId);      
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
    posterId=''
    this.props.history.replace('/')
  }
  render() {
    const userType=this.props.user.type;
    const {jobTitle,jobType,content,company,position,expire}=this.props.jobDetail;                    
        return (
        <div>      
           <NavBar>Job Detail</NavBar>         
            <WingBlank>
            { userType==='jobPoster'? 
               <div>
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
                {/* <Button type="primary" inline size="small" style={{ margin: '0px 6px 0px 6px',backgroundColor:'#f0e68c',color:'black' }} onClick={this.createJob}>View Candidates</Button>             */}
                <ViewCandidates  jobId={this.props.match.params.jobid}/>
                <Button type="warning" inline size="small" style={{ margin: '0px 6px 0px 6px',color:'black' }} onClick={this.deleteJob}>Delete Job</Button>                      
                <WhiteSpace/>
             </div>
            :
            <div>
              <List>                                   
                <WhiteSpace style={{marginTop: 40+ 'px'}}/>
                <InputItem value={jobTitle} >Job Title:</InputItem>
                <WhiteSpace/>
                <InputItem value={jobType}>Job Type:</InputItem>
                <WhiteSpace/>
                <InputItem value={content}>Content:</InputItem>
                <WhiteSpace/>          
                <WhiteSpace/>
                <InputItem value={company}>Company:</InputItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem value={position}>Position:</InputItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem value={expire}>Expire:</InputItem>
                <WhiteSpace/>                                                                              
              </List>
              <WhiteSpace/>  
              <Button type='primary' onClick={this.getJobPoster}>See job poster</Button>             
              {posterId===''?'':<UserList userList={this.props.jobPoster}/> }               
              <ApplyJob jobId={this.props.match.params.jobid}/>
              <WhiteSpace/>
              </div>
            }
            <Button type='primary' onClick={this.toMain}>Back to Main</Button>
            </WingBlank>
        </div>
        )
    }
}


export default connect(
    state=>({jobDetail:state.jobDetail,user:state.user,jobPoster:state.jobPoster}),
    {getJobDetail,updateJob,deleteJob,getJobPoster}
) (JobDetail)